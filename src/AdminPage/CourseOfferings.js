import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import HotTable from 'react-handsontable'

class CourseOfferings extends Component {
  handsontableData = [[]];
  hotTable = null
  cleanedTable = []
  state = {
    handsontableData: [[]]
  }

  componentDidMount () {
    this.setState({
      handsontableData: [['oi', '', '', 'segu']]
    }, this.validateCells)
  }

  validateCells = () => {
    this.table.hotInstance.validateCells()
  }

  handleSubmit = () => {
    this.setState(prevState => ({
      handsontableData: [
        ...prevState.handsontableData
          .filter((row, index) => !this.table.hotInstance.isEmptyRow(index))
      ]
    }), this.validateCells)
  }

  render() {
    return (
      <div>
        <HotTable 
          root='hot'
          ref={(table) => { this.table = table; }}
          data={this.state.handsontableData} 
          colHeaders={['Código de Oferta', 'Nome da Disciplina', 'Horário', 'Dia']}
          rowHeaders={true}
          minCols='4' 
          width='800'
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
              source: [
                '08:00 - 10:00',
                '10:00 - 12:00',
                '14:00 - 16:00',
                '16:00 - 18:00'
              ]
            },
            {
              type: 'dropdown',
              source: ['seg', 'ter', 'qua', 'qui', 'sex']
            }
          ]}
          beforeValidate={ (val, row, prop) => {
            if (this.table.hotInstance.isEmptyRow(row)) {
              return 0
            }
          }} />
          <button onClick={this.handleSubmit}>submit</button>
      </div>
    )
  }
}

export default CourseOfferings
