import React, { Component } from 'react'
import XLSX from 'xlsx'

import './AdminPage.css'
import CourseOfferings from './CourseOfferings'

class Admin extends Component {
  state = {
    xlsx: [[]]
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
      this.setState({ xlsx })
    }
    fileReader.readAsArrayBuffer(file)
  }

  render() {
    return (
      <div className='admin-page'>
        <h2>Adicionar Oferta</h2>
        <input 
          type='file'
          accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
          onChange={this.handleFileUpload} />
        <CourseOfferings xlsx={this.state.xlsx}/>
      </div>
    )
  }
}

export default Admin
