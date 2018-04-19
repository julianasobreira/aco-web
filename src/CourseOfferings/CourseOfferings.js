import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import XLSX from 'xlsx'

import CourseOfferingItem from './CourseOfferingItem'
import EditCourseOffering from './EditCourseOffering'

class CourseOfferings extends Component {
  state = {
    uploadedCourseOfferings: null,
    courseOfferings: [
      {
        semester: '2017.2',
        created_at: '10/10/2018',
        ofertas: [
          {
            dia: 'dia',
            horario: 'horario',
            disciplina: 'disciplina'
          },
          {
            dia: 'dia',
            horario: 'horario',
            disciplina: 'disciplina'
          }
        ]
      },
      {
        semester: '2017.1',
        created_at: '10/10/2018',
        ofertas: [
          {
            dia: 'dia',
            horario: 'horario',
            disciplina: 'disciplina'
          },
          {
            dia: 'dia',
            horario: 'horario',
            disciplina: 'disciplina'
          }
        ]
      }
    ]
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleCancel = () => {
    this.setState({
      uploadedCourseOfferings: null
    })
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

  render() {
    const { uploadedCourseOfferings, courseOfferings } =  this.state

    return (
      <div className='course-offerings'>
        <div className='course-offerings-header'>
          <div className='header-title'>
            <h2>Ofertas</h2>
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
            className='admin-page-link'>Upload nova oferta</label>
        </div>
        { uploadedCourseOfferings &&
          <EditCourseOffering
            onSave={this.handleSubmit}
            onCancel={this.handleCancel}
            courseOffering={{ ofertas: uploadedCourseOfferings}} />
        }
        { courseOfferings.length === 0
          ? <div>Não ofertas adicionadas.</div>
          : courseOfferings.map((item, index) =>
              <CourseOfferingItem key={index} courseOffering={item}/>
            )
        }
      </div>
    )
  }
}

export default CourseOfferings
