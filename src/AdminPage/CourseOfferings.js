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
    })
  }

  validateCells = () => {
    this.table.hotInstance.validateCells(function(valid) {
      console.log('first validation', valid)
    })
    const cleanedTable = this.state.handsontableData
      .filter((row, index) => !this.table.hotInstance.isEmptyRow(index))
    this.setState({
      handsontableData: [...cleanedTable]
    })
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
          minSpareRows='1'
          columns={[
            {
              validator: (value, callback) => {
                console.log(value)
                callback(!!value);
              }
            },
            {
              validator: (value, callback) => {
                console.log(value)
                callback(!!value);
              }
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
          ]} />
          <button onClick={this.validateCells}>submit</button>
      </div>
    )
  }
}

export default CourseOfferings
