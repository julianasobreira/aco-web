import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { getInfo, ACCESS_AUTH_INFO } from '../utils/localStorage'

import './CourseOfferings.css'

import CourseOfferingItem from './CourseOfferingItem'
import EditMenu from '../EditMenu/EditMenu'
import Loading from '../Loading/Loading'
import MessageError from '../MessageError/MessageError'

class CourseOfferingsEdit extends Component {
  currentYear = new Date().getFullYear()
  yearList = []
  state = {
    year: this.currentYear,
    semester: 1,
    isFetching: false,
    isError: false
  }
  userInfo = null

  componentDidMount () {
    this.userInfo = getInfo(ACCESS_AUTH_INFO)
  }

  componentWillMount () {
    for (let i = this.currentYear - 3; i <= this.currentYear + 5; i++) {
      this.yearList.push({ value: i, label: i })
    }
  }

  saveCourseOffering = e => {
    e.preventDefault()
    const { year, semester } = this.state
    const { uploadedCourseOfferings, closeEditMode } = this.props
    this.setState({ isFetching: true })
    axios.post(`${process.env.API_URL}/oferta?curso=${this.userInfo.codCurso}&semestre=${year}.${semester}`, uploadedCourseOfferings)
    .then(() => {
      this.setState({
        isFetching: false,
        isError: false
      })
      closeEditMode()
    })
    .catch(error => {
      console.log('Erro: ', error)
      this.setState({
        isFetching: false,
        isError: true
      })
    })
  }

  handleCancel = () => {
    this.props.closeEditMode()
  }

  handleSelectYear = item => {
    this.setState({ year: item.value})
  }

  handleSelectSemester = e => {
    this.setState({ semester: Number(e.target.value)})
  }

  render() {
    const { semester, year, isFetching, isError } =  this.state
    const { uploadedCourseOfferings } = this.props

    return (
      <div className='course-offerings-edit'>
        <Select
          name='semestre'
          placeholder='Selecione o ano da oferta'
          className='course-offerings-semester'
          value={year}
          onChange={this.handleSelectYear}
          clearable={false}
          options={this.yearList} />
        <label className='course-offerings-label'>
          <input
            type='radio'
            value='1'
            className='course-offerings-checkbox-control'
            onChange={this.handleSelectSemester}
            checked={semester === 1} />
          Semestre 1
        </label>
        <label className='course-offerings-label'>
          <input
            type='radio'
            value='2'
            className='course-offerings-checkbox-control'
            onChange={this.handleSelectSemester}
            checked={semester === 2} />
          Semestre 2
        </label>
        <EditMenu
          onSave={this.saveCourseOffering}
          onCancel={this.handleCancel} />
        { isError && <MessageError errors={['Ocorreu um erro durante a operação.']} /> }
        <CourseOfferingItem
          editMode={true}
          courseOffering={{ofertas: uploadedCourseOfferings}}/>
        { isFetching && <Loading /> }
      </div>
    )
  }
}

CourseOfferingsEdit.propTypes = {
  uploadedCourseOfferings: PropTypes.array,
  closeEditMode: PropTypes.func
}

export default CourseOfferingsEdit
