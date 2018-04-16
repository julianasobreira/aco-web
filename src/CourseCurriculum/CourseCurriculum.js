import React, { Component, Fragment } from 'react'
import './CourseCurriculum.css'
import XLSX from 'xlsx'
import FormInput from '../FormInput/FormInput'
import FormList from '../FormList/FormList'
import FormDropdown from '../FormDropdown/FormDropdown'
import CourseCurriculumMenu from './CourseCurriculumMenu'
import axios from 'axios'

class CourseCurriculum extends Component {
  state = {
    xlsx: [],
    isValid: false,
    showError: false,
    curriculum: [],
    uploaded: false,
    periods: [
      {value: 0, label: 0},
      {value: 1, label: 1},
      {value: 2, label: 2},
      {value: 3, label: 3},
      {value: 4, label: 4},
      {value: 5, label: 5},
      {value: 6, label: 6},
      {value: 7, label: 7},
      {value: 8, label: 8},
      {value: 9, label: 9},
      {value: 10, label: 10}
    ]
  }

  componentDidMount () {
    axios.get(`${process.env.API_URL}/grade?curso=Engenharia da Computação`)
    .then(response => {
      this.setState({curriculum: response.data})
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const filtered = this.state.xlsx
      .filter((row, index) => !this.table.hotInstance.isEmptyRow(index))
    console.log(this.table.hotInstance.getData())
    this.table.hotInstance.validateCells(isValid => {
      if (isValid) {
        console.log()
      }
      this.setState({ showError: !isValid })
    })
  }

  convertStringToList = item => {
    return item.replace(/[\n\r\s]+/g, '')
               .split(',')
  }

  convertArrayToObject = array => {
    return array.map(row => ({
      nome: row[0] || '',
      codDisciplina: row[1] || '',
      cargaHoraria: row[2] || '',
      periodo: row[3] || '',
      ciclo: row[4] || '',
      preRequisitos: row[5] ? this.convertStringToList(row[5]) : [],
      coRequisitos: row[6] ? this.convertStringToList(row[6]) : [],
      proRequisitos: row[7] ? this.convertStringToList(row[7]) : [],
      equivalencias: row[8] ? this.convertStringToList(row[8]) : [],
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
      const xlsx = XLSX.utils.sheet_to_json(sheet, {header: 1, blankrows: false})
      this.setState({
        uploaded: true,
        xlsx: this.convertArrayToObject(xlsx)
      })
    }
    fileReader.readAsArrayBuffer(file)
  }

  handleCancel = () => {
    this.setState({
      uploaded: false,
      xlsx: []
    })
  }

  render() {
    const { uploaded, curriculum, periods, xlsx } =  this.state
    const list = uploaded ? xlsx : curriculum
    const itemClass = uploaded ? '--edit' : ''

    return (
      <div>
        <div className='admin-page-header'>
          <div className='header-title'>
            <h2>Grade Curricular</h2>
          </div>
          <input
            type='file'
            id='upload-planilha'
            name='upload-planilha'
            className='upload-input'
            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
            onChange={this.handleFileUpload} />
          <label
            htmlFor='upload-planilha'
            className='admin-page-link'>Upload Nova Grade Curricular</label>
        </div>
        { uploaded &&
          <CourseCurriculumMenu
            onSave={this.handleSubmit}
            onCancel={this.handleCancel} />
        }
        {
          list.length === 0
          ? <div>Não há grade horária adicionada.</div>
          : <Fragment>
              {
                list.map((item, index) => (
                  <div key={index} className={`course-curriculum-item${itemClass}`}>
                    <FormInput
                      label='Nome'
                      type='text'
                      value={item.nome}
                      disabled={true}
                    />
                    <FormInput
                      label='Código da disciplina'
                      type='text'
                      value={item.codDisciplina}
                      disabled={true}
                    />
                    <FormInput
                      label='Carga Horária'
                      type='number'
                      value={item.cargaHoraria}
                      disabled={true}
                    />
                    <FormDropdown
                      label='Período'
                      value={item.periodo}
                      options={periods}
                      disabled={true}
                    />
                    <FormList
                      label='Co-Requisitos'
                      type='text'
                      list={item.coRequisitos}
                      disabled={true}
                    />
                    <FormList
                      label='Pró-Requisitos'
                      type='text'
                      list={item.proRequisitos}
                      disabled={true}
                    />
                    <FormList
                      label='Pré-Requisitos'
                      type='text'
                      list={item.preRequisitos}
                      disabled={true}
                    />
                    <FormList
                      label='Equivalências'
                      type='text'
                      list={item.equivalencias}
                      disabled={true}
                    />
                  </div>
                ))
              }
            </Fragment>
        }
      </div>
    )
  }
}

export default CourseCurriculum
