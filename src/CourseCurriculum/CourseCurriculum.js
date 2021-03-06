import React, { Component } from 'react'
import XLSX from 'xlsx'
import axios from 'axios'
import { getInfo, ACCESS_AUTH_INFO } from '../utils/localStorage'

import './CourseCurriculum.css'

import Button from '../Button/Button'
import EditMenu from '../EditMenu/EditMenu'
import CourseCurriculumItem from './CourseCurriculumItem'
import Alert from '../Alert/Alert'
import Loading from '../Loading/Loading'
import MessageError from '../MessageError/MessageError'

class CourseCurriculum extends Component {
  state = {
    xlsx: [],
    isValid: false,
    showError: false,
    curriculum: [],
    isFetching: false,
    isError: false,
    editMode: false,
    showAlert: false
  }
  userInfo = null

  componentDidMount () {
    this.userInfo = getInfo(ACCESS_AUTH_INFO)
    this.fetchCurriculum()
  }

  fetchCurriculum = () => {
    this.setState({isFetching: true})
    axios.get(`${process.env.API_URL}/grade?curso=${this.userInfo.codCurso}`)
    .then(response => {
      this.setState({
        curriculum: response.data,
        isFetching: false,
        isError: false
      })
    })
    .catch(() => {
      this.setState({
        isFetching: false,
        isError: true
      })
    })
  }

  closeAlert = () => {
    this.setState({ showAlert: false })
  }

  showAlert = () => {
    const { curriculum, isFetching, isError } = this.state
    if (curriculum.length > 0 && !isError && !isFetching) {
      this.setState({ showAlert: true })
    }
  }

  handleDelete = e => {
    e.preventDefault()
    axios.delete(`${process.env.API_URL}/grade?curso=${this.userInfo.codCurso}`)
    .then(() => {
      this.closeAlert()
      this.fetchCurriculum()
    })
    .catch(() => {
      this.closeAlert()
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { xlsx } = this.state

    this.setState({ isFetching: true })
    axios.post(`${process.env.API_URL}/grade?curso=${this.userInfo.codCurso}`, xlsx)
    .then(() => {
      this.closeEditMode()
      this.fetchCurriculum()
    })
    .catch(error => {
      console.log('Erro: ', error)
      this.setState({
        isFetching: false,
        isError: true
      })
      //this.closeEditMode()
    })
  }

  closeEditMode = () => {
    this.setState({
      editMode: false,
      xlsx: [],
      isError: false
    })

    this.inputFile.value = ''
  }

  convertStringToList = item => {
    return item.replace(/[\n\r\s]+/g, '')
               .split(',')
  }

  convertArrayToObject = array => {
    return array.map(row => ({
      codDisciplina: row[0] || '',
      nome: row[1] || '',
      cargaHoraria: row[2] || '',
      preRequisitos: row[3] ? this.convertStringToList(row[3]) : [],
      coRequisitos: row[4] ? this.convertStringToList(row[4]) : [],
      periodo: row[5] || '',
      equivalencias: row[6] ? this.convertStringToList(row[6]) : [],
      ciclo: row[7] || ''
    }))
  }

  handleFileUpload = e => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    const fileReader = new FileReader()
    fileReader.onload = e => {
      // pre-process data
      let binary = ''
      const bytes = new Uint8Array(e.target.result)
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }

      const workbook = XLSX.read(binary, {type: 'binary'})
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const range = XLSX.utils.decode_range(sheet['!ref']);
      range.s.r = 1; // <-- zero-indexed, so setting to 1 will skip row 0
      sheet['!ref'] = XLSX.utils.encode_range(range);
      const xlsx = XLSX.utils.sheet_to_json(sheet, {header: 1, blankrows: false})
      this.setState({
        editMode: true,
        xlsx: this.convertArrayToObject(xlsx)
      })
    }
    fileReader.readAsArrayBuffer(file)
  }

  render() {
    const { 
      editMode,
      curriculum,
      xlsx,
      showAlert,
      isFetching,
      isError } =  this.state
    const courseCurriculum = editMode ? xlsx : curriculum

    return (
      <div>
        <div className='course-curriculum-header'>
          <div className='header-title'>
            <h2>Grade Curricular</h2>
          </div>
          <div className='course-curriculum-options'>
            <input
              type='file'
              ref={node => {this.inputFile = node}}
              id='upload-planilha'
              name='upload-planilha'
              className='upload-input'
              accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
              onChange={this.handleFileUpload} />
            <label
              htmlFor='upload-planilha'
              className='course-curriculum-label'>
              <i className='fa fa-upload'></i> Upload Nova Grade Curricular
            </label>
            <Button text='Deletar Grade' action={this.showAlert} />
          </div>
        </div>
        { editMode &&
          <EditMenu
            onSave={this.handleSubmit}
            onCancel={this.closeEditMode} />
        }
        { isError && <MessageError errors={['Ocorreu um erro durante a operação.']} /> }
        <CourseCurriculumItem
          editMode={editMode}
          courseCurriculum={courseCurriculum}/>
        {
          showAlert &&
          <Alert
            cancel={this.closeAlert}
            confirm={this.handleDelete}
            text='Ao deletar a grade horária irá deletar todas as ofertas relacionadas. Deseja continuar?'/>
        }
        { isFetching && <Loading /> }
      </div>
    )
  }
}

export default CourseCurriculum
