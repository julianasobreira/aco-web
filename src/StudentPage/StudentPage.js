import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import StudentForm from './StudentForm'
import Loading from '../Loading/Loading'
import ClassSchedule from './ClassSchedule'

class StudentPage extends Component {
  state = {
    classes: [],
    classesGrid: [{"codDisciplina":"MATM0042","codOferta":"OFER0001","createdTime":"2018-07-02T21:24:35","dia":"seg","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"MATM0042","equivalencias":[],"nome":"CALCULO 1","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":16,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"MATM0042","codOferta":"OFER0001","createdTime":"2018-07-02T21:24:35","dia":"qua","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"MATM0042","equivalencias":[],"nome":"CALCULO 1","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":16,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"MATM0042","codOferta":"OFER0055","createdTime":"2018-07-02T21:24:35","dia":"ter","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"MATM0042","equivalencias":[],"nome":"CALCULO 1","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":14,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"MATM0042","codOferta":"OFER0055","createdTime":"2018-07-02T21:24:35","dia":"qui","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"MATM0042","equivalencias":[],"nome":"CALCULO 1","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":14,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"ECON0008","codOferta":"OFER0029","createdTime":"2018-07-02T21:24:35","dia":"sex","disciplinaOfertada":{"cargaHoraria":30,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"ECON0008","equivalencias":[],"nome":"INTRODUCAO A ENGENHARIA ECONOMICA","nomeCurso":"Engenharia da Computação","periodo":7,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":10,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0076","codOferta":"OFER0009","createdTime":"2018-07-02T21:24:35","dia":"qui","disciplinaOfertada":{"cargaHoraria":30,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"CCMP0076","equivalencias":[],"nome":"COMPUTADOR E SOCIEDADE","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":8,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"FISC0036","codOferta":"OFER0054","createdTime":"2018-07-02T21:24:35","dia":"seg","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"FISC0036","equivalencias":[],"nome":"FISICA TEORICA 1","nomeCurso":"Engenharia da Computação","periodo":2,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":10,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"FISC0036","codOferta":"OFER0054","createdTime":"2018-07-02T21:24:35","dia":"qua","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"FISC0036","equivalencias":[],"nome":"FISICA TEORICA 1","nomeCurso":"Engenharia da Computação","periodo":2,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":10,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0058","codOferta":"OFER0043","createdTime":"2018-07-02T21:24:35","dia":"sex","disciplinaOfertada":{"cargaHoraria":30,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"CCMP0058","equivalencias":[],"nome":"ASPECTOS LEGAIS PARA COMPUTACAO","nomeCurso":"Engenharia da Computação","periodo":8,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":16,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"LING0002","codOferta":"OFER0002","createdTime":"2018-07-02T21:24:35","dia":"ter","disciplinaOfertada":{"cargaHoraria":30,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"LING0002","equivalencias":[],"nome":"COMUNICACAO E EXPRESSAO","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":8,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0036","codOferta":"OFER0019","createdTime":"2018-07-02T21:24:35","dia":"seg","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO PROFISSIONAL OU TRONCO COMUM","coRequisitos":[],"codDisciplina":"CCMP0036","equivalencias":[],"nome":"BANCO DE DADOS 1","nomeCurso":"Engenharia da Computação","periodo":5,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":8,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0036","codOferta":"OFER0019","createdTime":"2018-07-02T21:24:35","dia":"qua","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO PROFISSIONAL OU TRONCO COMUM","coRequisitos":[],"codDisciplina":"CCMP0036","equivalencias":[],"nome":"BANCO DE DADOS 1","nomeCurso":"Engenharia da Computação","periodo":5,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":8,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0041","codOferta":"OFER0006","createdTime":"2018-07-02T21:24:35","dia":"ter","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO PROFISSIONAL OU TRONCO COMUM","coRequisitos":[],"codDisciplina":"CCMP0041","equivalencias":[],"nome":"INTRODUCAO A PROGRAMACAO","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":14,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0041","codOferta":"OFER0006","createdTime":"2018-07-02T21:24:35","dia":"qui","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO PROFISSIONAL OU TRONCO COMUM","coRequisitos":[],"codDisciplina":"CCMP0041","equivalencias":[],"nome":"INTRODUCAO A PROGRAMACAO","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":14,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0041","codOferta":"OFER0007","createdTime":"2018-07-02T21:24:35","dia":"ter","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO PROFISSIONAL OU TRONCO COMUM","coRequisitos":[],"codDisciplina":"CCMP0041","equivalencias":[],"nome":"INTRODUCAO A PROGRAMACAO","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":16,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0041","codOferta":"OFER0007","createdTime":"2018-07-02T21:24:35","dia":"qui","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO PROFISSIONAL OU TRONCO COMUM","coRequisitos":[],"codDisciplina":"CCMP0041","equivalencias":[],"nome":"INTRODUCAO A PROGRAMACAO","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":16,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0039","codOferta":"OFER0008","createdTime":"2018-07-02T21:24:35","dia":"ter","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"CCMP0039","equivalencias":[],"nome":"MATEMATICA DISCRETA","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":10,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0039","codOferta":"OFER0008","createdTime":"2018-07-02T21:24:35","dia":"qui","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO GERAL OU CICLO BÁSICO","coRequisitos":[],"codDisciplina":"CCMP0039","equivalencias":[],"nome":"MATEMATICA DISCRETA","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":10,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0040","codOferta":"OFER0004","createdTime":"2018-07-02T21:24:35","dia":"seg","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO PROFISSIONAL OU TRONCO COMUM","coRequisitos":[],"codDisciplina":"CCMP0040","equivalencias":[],"nome":"INTRODUCAO A ALGORITMOS","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":14,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"},{"codDisciplina":"CCMP0040","codOferta":"OFER0004","createdTime":"2018-07-02T21:24:35","dia":"qua","disciplinaOfertada":{"cargaHoraria":60,"ciclo":"CICLO PROFISSIONAL OU TRONCO COMUM","coRequisitos":[],"codDisciplina":"CCMP0040","equivalencias":[],"nome":"INTRODUCAO A ALGORITMOS","nomeCurso":"Engenharia da Computação","periodo":1,"preRequisitos":[],"proRequisitos":[]},"duracaoHoras":2,"horarioInicial":14,"nomeCurso":"Engenharia da Computação","semestre":"2018.1"}],
    isGridVisible: true
  }

  fetchSolutions = classesGrid => {
    this.setState({ 
      isGridVisible: true,
      classesGrid
    })
  }

  showClassesGrid = () => {
    this.setState({ isGridVisible: false })
  }

  render() {
    const{ isGridVisible, classesGrid } = this.state
    return (
      <section className='app-body'>
        <div className='app-body-container'>
          { isGridVisible
            ? <ClassSchedule
                classesGrid={classesGrid}
                showClassesGrid={this.showClassesGrid} />
            : <StudentForm 
                handleSolution={this.fetchSolutions}
                isFetching={this.props.isFetching} />
          }
        </div>
      </section>
    )
  }
}

StudentForm.propTypes = {
  isFetching: PropTypes.func
}

export default StudentPage
