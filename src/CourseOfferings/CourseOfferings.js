import React, { Component } from 'react'
import XLSX from 'xlsx'

import './CourseOfferings.css'

import CourseOfferingsList from './CourseOfferingsList'
import CourseOfferingsEdit from './CourseOfferingsEdit'

class CourseOfferings extends Component {
  state = {
    uploadedCourseOfferings: null,
    editMode: false,
    isFetching: false,
    isError: false
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
      const uploadedCourseOfferings = XLSX.utils.sheet_to_json(sheet, {header: 1, blankrows: false})
      this.setState({
        uploadedCourseOfferings: this.convertArrayToObject(uploadedCourseOfferings),
        editMode: true
      })
    }
    fileReader.readAsArrayBuffer(file)
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

  closeEditMode = () => {
    this.setState({
      uploadedCourseOfferings: null,
      editMode: false
    })
    this.inputFile.value = ''
  }

  render() {
    const { uploadedCourseOfferings, editMode } =  this.state

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
        { editMode
          ? <CourseOfferingsEdit
              closeEditMode={this.closeEditMode}
              uploadedCourseOfferings={uploadedCourseOfferings} />
          : <CourseOfferingsList />
        }
      </div>
    )
  }
}

export default CourseOfferings
