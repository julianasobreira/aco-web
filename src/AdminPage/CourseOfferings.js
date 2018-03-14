import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import HotTable from 'react-handsontable'

class CourseOfferings extends Component {
  validateCells = () => {
    this.table.hotInstance.validateCells()
  }

  componentDidUpdate () {
    this.validateCells()
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
          data={this.props.xlsx} 
          colHeaders={['Código de Oferta', 'Nome da Disciplina', 'Dia', 'Horário']}
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
              source: ['seg', 'ter', 'qua', 'qui', 'sex']
            },
            {
              type: 'dropdown',
              source: [
                '8',
                '10',
                '12',
                '14',
                '16'
              ]
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

CourseOfferings.propTypes = {
  xlsx: PropTypes.array
}

export default CourseOfferings
