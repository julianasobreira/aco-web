import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import XLSX from 'xlsx'

import CourseOfferingItem from './CourseOfferingItem'
import EditMenu from '../EditMenu/EditMenu'

class CourseOfferings extends Component {
  state = {
    uploadedCourseOfferings: null,
    courseOfferings: [
      {
    semester: '2017.2',
    created_at: '10/04/2018',
    ofertas: [
        {
            "codDisciplina": "MATM0042",
            "codOferta": "OFER0001",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0042",
            "codOferta": "OFER0001",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "LING0002",
            "codOferta": "OFER0002",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0047",
            "codOferta": "OFER0003",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0047",
            "codOferta": "OFER0003",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0040",
            "codOferta": "OFER0004",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0040",
            "codOferta": "OFER0004",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0027",
            "codOferta": "OFER0005",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0027",
            "codOferta": "OFER0005",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0041",
            "codOferta": "OFER0006",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0041",
            "codOferta": "OFER0006",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0041",
            "codOferta": "OFER0007",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0041",
            "codOferta": "OFER0007",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0039",
            "codOferta": "OFER0008",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0039",
            "codOferta": "OFER0008",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0076",
            "codOferta": "OFER0009",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0011",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0011",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0011",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0023",
            "codOferta": "OFER0012",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0023",
            "codOferta": "OFER0012",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0041",
            "codOferta": "OFER0013",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 4,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0038",
            "codOferta": "OFER0014",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0038",
            "codOferta": "OFER0014",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MECN0017",
            "codOferta": "OFER0015",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MECN0017",
            "codOferta": "OFER0015",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0025",
            "codOferta": "OFER0016",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0025",
            "codOferta": "OFER0016",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0003",
            "codOferta": "OFER0017",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0003",
            "codOferta": "OFER0018",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0036",
            "codOferta": "OFER0019",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0036",
            "codOferta": "OFER0019",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0004",
            "codOferta": "OFER0020",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0004",
            "codOferta": "OFER0020",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0030",
            "codOferta": "OFER0021",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0030",
            "codOferta": "OFER0021",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0045",
            "codOferta": "OFER0022",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0045",
            "codOferta": "OFER0022",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MECN0023",
            "codOferta": "OFER0023",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MECN0023",
            "codOferta": "OFER0023",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0031",
            "codOferta": "OFER0024",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0031",
            "codOferta": "OFER0025",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0038",
            "codOferta": "OFER0026",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0038",
            "codOferta": "OFER0026",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0030",
            "codOferta": "OFER0027",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0030",
            "codOferta": "OFER0027",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0051",
            "codOferta": "OFER0028",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0051",
            "codOferta": "OFER0028",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ECON0008",
            "codOferta": "OFER0029",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0048",
            "codOferta": "OFER0031",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0048",
            "codOferta": "OFER0031",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0052",
            "codOferta": "OFER0032",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0052",
            "codOferta": "OFER0032",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0049",
            "codOferta": "OFER0033",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0049",
            "codOferta": "OFER0033",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0050",
            "codOferta": "OFER0034",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0050",
            "codOferta": "OFER0034",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0077",
            "codOferta": "OFER0035",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0077",
            "codOferta": "OFER0035",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PROD0065",
            "codOferta": "OFER0036",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0078",
            "codOferta": "OFER0037",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 4,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0061",
            "codOferta": "OFER0038",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0061",
            "codOferta": "OFER0038",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0068",
            "codOferta": "OFER0039",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0068",
            "codOferta": "OFER0039",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0071",
            "codOferta": "OFER0040",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 4,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0045",
            "codOferta": "OFER0041",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0045",
            "codOferta": "OFER0041",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0058",
            "codOferta": "OFER0043",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0019",
            "codOferta": "OFER0044",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 12,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0019",
            "codOferta": "OFER0044",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 12,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0083",
            "codOferta": "OFER0045",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 12,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0082",
            "codOferta": "OFER0046",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0082",
            "codOferta": "OFER0046",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0048",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0048",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0048",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0049",
            "codOferta": "OFER0049",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0049",
            "codOferta": "OFER0049",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0055",
            "codOferta": "OFER0050",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0055",
            "codOferta": "OFER0050",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0026",
            "codOferta": "OFER0051",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0026",
            "codOferta": "OFER0051",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0046",
            "codOferta": "OFER0052",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0046",
            "codOferta": "OFER0052",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0005",
            "codOferta": "OFER0053",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0036",
            "codOferta": "OFER0054",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0036",
            "codOferta": "OFER0054",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0042",
            "codOferta": "OFER0055",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0042",
            "codOferta": "OFER0055",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0043",
            "codOferta": "OFER0056",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0043",
            "codOferta": "OFER0056",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0044",
            "codOferta": "OFER0057",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0044",
            "codOferta": "OFER0057",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        }
    ]
}, {
    semester: '2017.1',
    created_at: '10/04/2018',
    ofertas: [
        {
            "codDisciplina": "MATM0042",
            "codOferta": "OFER0001",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0042",
            "codOferta": "OFER0001",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "LING0002",
            "codOferta": "OFER0002",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0047",
            "codOferta": "OFER0003",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0047",
            "codOferta": "OFER0003",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0040",
            "codOferta": "OFER0004",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0040",
            "codOferta": "OFER0004",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0027",
            "codOferta": "OFER0005",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0027",
            "codOferta": "OFER0005",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0041",
            "codOferta": "OFER0006",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0041",
            "codOferta": "OFER0006",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0041",
            "codOferta": "OFER0007",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0041",
            "codOferta": "OFER0007",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0039",
            "codOferta": "OFER0008",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0039",
            "codOferta": "OFER0008",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0076",
            "codOferta": "OFER0009",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0011",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0011",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0011",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0023",
            "codOferta": "OFER0012",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0023",
            "codOferta": "OFER0012",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0041",
            "codOferta": "OFER0013",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 4,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0038",
            "codOferta": "OFER0014",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0038",
            "codOferta": "OFER0014",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MECN0017",
            "codOferta": "OFER0015",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MECN0017",
            "codOferta": "OFER0015",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0025",
            "codOferta": "OFER0016",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0025",
            "codOferta": "OFER0016",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0003",
            "codOferta": "OFER0017",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0003",
            "codOferta": "OFER0018",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0036",
            "codOferta": "OFER0019",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0036",
            "codOferta": "OFER0019",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0004",
            "codOferta": "OFER0020",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0004",
            "codOferta": "OFER0020",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0030",
            "codOferta": "OFER0021",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0030",
            "codOferta": "OFER0021",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0045",
            "codOferta": "OFER0022",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0045",
            "codOferta": "OFER0022",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MECN0023",
            "codOferta": "OFER0023",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MECN0023",
            "codOferta": "OFER0023",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0031",
            "codOferta": "OFER0024",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0031",
            "codOferta": "OFER0025",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0038",
            "codOferta": "OFER0026",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0038",
            "codOferta": "OFER0026",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0030",
            "codOferta": "OFER0027",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0030",
            "codOferta": "OFER0027",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0051",
            "codOferta": "OFER0028",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0051",
            "codOferta": "OFER0028",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ECON0008",
            "codOferta": "OFER0029",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0048",
            "codOferta": "OFER0031",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0048",
            "codOferta": "OFER0031",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0052",
            "codOferta": "OFER0032",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0052",
            "codOferta": "OFER0032",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0049",
            "codOferta": "OFER0033",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0049",
            "codOferta": "OFER0033",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0050",
            "codOferta": "OFER0034",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0050",
            "codOferta": "OFER0034",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0077",
            "codOferta": "OFER0035",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0077",
            "codOferta": "OFER0035",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PROD0065",
            "codOferta": "OFER0036",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0078",
            "codOferta": "OFER0037",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 4,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0061",
            "codOferta": "OFER0038",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0061",
            "codOferta": "OFER0038",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0068",
            "codOferta": "OFER0039",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0068",
            "codOferta": "OFER0039",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0071",
            "codOferta": "OFER0040",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 4,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0045",
            "codOferta": "OFER0041",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0045",
            "codOferta": "OFER0041",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0058",
            "codOferta": "OFER0043",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0019",
            "codOferta": "OFER0044",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 12,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0019",
            "codOferta": "OFER0044",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 12,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0083",
            "codOferta": "OFER0045",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 12,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0082",
            "codOferta": "OFER0046",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0082",
            "codOferta": "OFER0046",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0048",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0048",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "PRBE0014",
            "codOferta": "OFER0048",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0049",
            "codOferta": "OFER0049",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0049",
            "codOferta": "OFER0049",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "sex",
            "duracaoHoras": 2,
            "horarioInicial": 8,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0055",
            "codOferta": "OFER0050",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CCMP0055",
            "codOferta": "OFER0050",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0026",
            "codOferta": "OFER0051",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "ELET0026",
            "codOferta": "OFER0051",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0046",
            "codOferta": "OFER0052",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0046",
            "codOferta": "OFER0052",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "CIEN0005",
            "codOferta": "OFER0053",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 16,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0036",
            "codOferta": "OFER0054",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "seg",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "FISC0036",
            "codOferta": "OFER0054",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qua",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0042",
            "codOferta": "OFER0055",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0042",
            "codOferta": "OFER0055",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 14,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0043",
            "codOferta": "OFER0056",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0043",
            "codOferta": "OFER0056",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0044",
            "codOferta": "OFER0057",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "ter",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        },
        {
            "codDisciplina": "MATM0044",
            "codOferta": "OFER0057",
            "createdTime": "2018-02-28T14:00:36",
            "dia": "qui",
            "duracaoHoras": 2,
            "horarioInicial": 10,
            "nomeCurso": "Engenharia da Computação",
            "semestre": "2017.1"
        }
    ]
}
    ]
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleCancel = () => {
    this.setState({ uploadedCourseOfferings: null })
    this.inputFile.value = ''
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
        { uploadedCourseOfferings
          ? <Fragment>
              <EditMenu
                onSave={this.handleSubmit}
                onCancel={this.handleCancel} />
              <CourseOfferingItem
                editMode={true}
                courseOffering={{ofertas: uploadedCourseOfferings}}/>
            </Fragment>
          : courseOfferings.length === 0
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
