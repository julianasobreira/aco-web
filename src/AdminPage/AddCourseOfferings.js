import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HotTable from 'react-handsontable'
import XLSX from 'xlsx'

class AddCourseOfferings extends Component {
  state = {
    xlsx: [[]],
    isValid: false,
    showError: false
  }

  componentDidUpdate() {
    this.validateCells()
  }

  validateCells = () => {
    this.table.hotInstance.validateCells()
  }

  handleSubmit = () => {
    const filtered = this.state.xlsx
      .filter((row, index) => !this.table.hotInstance.isEmptyRow(index))
    this.table.hotInstance.validateCells(isValid => {
      this.setState({ showError: !isValid })
    })
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
        showError: false,
        xlsx
      }, this.validateCells)
    }
    fileReader.readAsArrayBuffer(file)
  }

  render() {
    return (
      <div>
        <div className='admin-page-header'>
          <div className='header-title'>
            <Link to='/admin/ofertas'>
              <i className='fa fa-arrow-left'></i>
            </Link>
            <h2>Adicionar Oferta</h2>
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
            className='admin-page-link'>Upload Oferta</label>
        </div>
        <HotTable 
          root='hot'
          ref={(table) => { this.table = table }}
          data={this.state.xlsx} 
          colHeaders={['Código de Oferta', 'Nome da Disciplina', 'Dia', 'Horário']}
          rowHeaders={true}
          minCols='4' 
          width='700'
          stretchH='all'
          columns={[
            {
              type: 'text'
            },
            {
              validator: (value, callback) => callback(!!value)
            },
            {
              type: 'dropdown',
              source: ['seg', 'ter', 'qua', 'qui', 'sex']
            },
            {
              type: 'dropdown',
              source: ['8', '10', '12', '14', '16']
            }
          ]}
          beforeValidate={ (val, row, prop) => {
            if (this.table.hotInstance.isEmptyRow(row)) {
              return 0
            }
          }} />
          { this.state.showError && 
            <div className='admin-page-error'>Alguns campos da planilha possuem erros.</div> }
          <button
            className='admin-page-button'
            onClick={this.handleSubmit}>Salvar</button>
      </div>
    )
  }
}

export default AddCourseOfferings
