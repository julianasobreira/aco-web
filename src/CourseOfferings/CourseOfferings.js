import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import XLSX from 'xlsx'
import axios from 'axios'
import Select from 'react-select'

import './CourseOfferings.css'

import CourseOfferingItem from './CourseOfferingItem'
import EditMenu from '../EditMenu/EditMenu'

class CourseOfferings extends Component {
  currentYear = new Date().getFullYear()
  yearList = []
  state = {
    uploadedCourseOfferings: null,
    courseOfferings: [],
    year: this.currentYear,
    semester: 1,
  }

  componentDidMount () {
    for (let i = this.currentYear - 3; i <= this.currentYear + 5; i++) {
        this.yearList.push({ value: i, label: i })
    }

    axios.get(`${process.env.API_URL}/oferta?curso=Engenharia da Computação`)
    .then(({data}) => {
        const horarios = {}

        // agrupar por semestre
        const has = Object.prototype.hasOwnProperty;
        data.forEach(horario => {
            if (has.call(horarios, horario.semestre)) {
                horarios[horario.semestre] = {
                    ...horarios[horario.semestre],
                    ofertas: [ ...horarios[horario.semestre].ofertas, horario]
                }
            } else {
                horarios[horario.semestre] = {
                    semester: horario.semestre,
                    created_at: horario.createdTime,
                    ofertas: [horario]
                }
            }
        })

        this.setState({
            courseOfferings: Object.values(horarios)
        })
    })
  }

  saveCourseOffering = e => {
    e.preventDefault()
    const { year, semester, uploadedCourseOfferings } = this.state
    axios.post(`${process.env.API_URL}/oferta?curso=Engenharia da Computação&semestre=${year}.${semester}`, uploadedCourseOfferings)
    .then(() => {
        console.log('Criado!')
    })
    .catch(error => {
        console.log('Erro: ', error)
    })
  }

  deleteCourseOffering = semestre => {
    axios.delete(`${process.env.API_URL}/oferta?curso=Engenharia da Computação&semestre=${semestre}`)
    .then(() => {
        console.log('Deletado!')
    })
    .catch(error => {
        console.log('Erro: ', error)
    })
  }

  handleCancel = () => {
    this.setState({ uploadedCourseOfferings: null })
    this.inputFile.value = ''
  }

  convertArrayToObject = array => {
    return array.map(row => ({
      codOferta: row[0] || '',
      codDisciplina: row[1] || '',
      dia: row[2] || '',
      horarioInicial: row[3] || '',
      duracaoHoras: row[4] || ''
    }))
  }

  handleFileUpload = e => {
    const files = e.target.files
    if (!files || files.length == 0) return
    const file = files[0]
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const filename = file.name
      // pre-process data
      let binary = ''
      const bytes = new Uint8Array(e.target.result)
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }

      const workbook = XLSX.read(binary, {type: 'binary'})
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const uploadedCourseOfferings = XLSX.utils.sheet_to_json(sheet, {header: 1, blankrows: false})
      this.setState({
        uploadedCourseOfferings: this.convertArrayToObject(uploadedCourseOfferings)
      })
    }
    fileReader.readAsArrayBuffer(file)
  }

  handleSelectYear = item => {
    this.setState({ year: item.value})
  }

  handleSelectSemester = e => {
    console.log(e.target.value)
    this.setState({ semester: Number(e.target.value)})
  }

  render() {
    const { 
        uploadedCourseOfferings, 
        courseOfferings,
        semester,
        year } =  this.state

    return (
      <div className='course-offerings'>
        <div className='course-offerings-header'>
          <div className='header-title'>
            <h2>Ofertas</h2>
          </div>
          <input
            type='file'
            ref={node => {this.inputFile = node}}
            name='upload-planilha'
            id='upload-planilha'
            className='upload-input'
            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
            onChange={this.handleFileUpload} />
          <label
            htmlFor='upload-planilha'
            className='admin-page-link'>Upload nova oferta</label>
        </div>
        { uploadedCourseOfferings
          ? <Fragment>
                <form>
                    <Select
                        name='semestre'
                        placeholder='Selecione o ano da oferta'
                        className='course-offerings-semester'
                        value={year}
                        onChange={this.handleSelectYear}
                        options={this.yearList} />
                    <label className='course-offerings-label'>
                        <input
                            type='radio'
                            value='1'
                            className='course-offerings-checkbox-control'
                            onChange={this.handleSelectSemester}
                            checked={semester === 1} />
                        Semestre 1
                    </label>
                    <label className='course-offerings-label'>
                        <input
                            type='radio'
                            value='2'
                            className='course-offerings-checkbox-control'
                            onChange={this.handleSelectSemester}
                            checked={semester === 2} />
                        Semestre 2
                    <EditMenu
                        onSave={this.saveCourseOffering}
                        onCancel={this.handleCancel} />
                    </label>
                </form>
                <CourseOfferingItem
                    editMode={true}
                    courseOffering={{ofertas: uploadedCourseOfferings}}/>
            </Fragment>
          : courseOfferings.length === 0
            ? <div>Não há ofertas adicionadas.</div>
            : courseOfferings.map((item, index) =>
                <CourseOfferingItem 
                    key={index}
                    courseOffering={item}
                    deleteCourseOffering={this.deleteCourseOffering} />
              )
        }
      </div>
    )
  }
}

export default CourseOfferings
