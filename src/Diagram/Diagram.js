import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'
import axios from 'axios'

class Diagram extends Component {
  width = 80
  height = 30
  margin = 10
  state = {
    data: []
  }

  componentDidMount () {
    axios.get(`${process.env.API_URL}/grade?curso=Engenharia da Computação`)
    .then(({data}) => {
      const grade = {}
      const has = Object.prototype.hasOwnProperty;
      data.forEach(item => {
          if (has.call(grade, item.periodo)) {
              grade[item.periodo] = [
                  ...grade[item.periodo],
                  item
              ]
          } else {
              grade[item.periodo] = [item]
          }
      })
      console.log(Object.values(grade))
      this.setState({ data: [...Object.values(grade)] }, this.renderDiagram)
    })
  }

  renderDiagram = () => {
    const svg = d3.select('#diagram')
    const c10 = d3.scaleOrdinal(d3.schemeCategory10);
    console.log(this.state.data)
    const nodes = svg.selectAll('node')
      .data(this.state.data)
      .enter()
      .append('g')
        .selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('class', 'node')
        .attr('x', (d, i) => (this.width + this.margin) * d.periodo)
        .attr('y', (d, i) => i * (this.height + this.margin))
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('fill', (d, i) => c10(i))
  }

  render () {
    return (
      <Fragment> 
        <div>Diagram</div>
        <svg id='diagram' width='1600' height='2000'></svg>
      </Fragment>
    )
  }
}

export default Diagram