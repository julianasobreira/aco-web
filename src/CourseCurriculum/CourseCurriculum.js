import React, { Component, Fragment } from 'react'
import XLSX from 'xlsx'
import axios from 'axios'

import './CourseCurriculum.css'

import FormField from '../FormField/FormField'
import FormList from '../FormList/FormList'
import FormDropdown from '../FormDropdown/FormDropdown'
import EditMenu from '../EditMenu/EditMenu'

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
  }

  handleCancel = () => {
    this.setState({
      uploaded: false,
      xlsx: []
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
          <EditMenu
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
                    <FormField
                      label='Nome'
                      value={item.nome}
                    />
                    <FormField
                      label='Código da disciplina'
                      value={item.codDisciplina}
                    />
                    <FormField
                      label='Carga Horária'
                      type='number'
                      value={item.cargaHoraria}
                    />
                    <FormDropdown
                      label='Período'
                      value={item.periodo}
                      options={periods}
                    />
                    <FormList
                      label='Co-Requisitos'
                      list={item.coRequisitos}
                    />
                    <FormList
                      label='Pró-Requisitos'
                      list={item.proRequisitos}
                    />
                    <FormList
                      label='Pré-Requisitos'
                      list={item.preRequisitos}
                    />
                    <FormList
                      label='Equivalências'
                      list={item.equivalencias}
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
