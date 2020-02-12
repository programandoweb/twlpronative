import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-elements';
import Headers from './Headers';
import Body from './Body';
import Footer from './Footer';

const params  = {
  title:"InSchool 1.0 Beta",
  Credit:"Desarrollado por ProgramandoWeb",
  menu:{
    items:[
      {
        label:"Plan de estudios",
        subtitle:"Creación de tareas y evaluaciones",
        image:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        color:'#fff',
        backgroundColor:'#f2f2f2',
        ico:"book",
        icoColor:'#2089DC',
      },{
        label:"Alumnos",
        subtitle:"Lista de todos los estudiantes",
        image:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        color:'#fff',
        backgroundColor:'#f2f2f2',
        ico:"face",
        icoColor:'#2089DC',
      },{
        label:"Asistencia",
        subtitle:"Lista de alumnos por clases",
        image:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        color:'#fff',
        backgroundColor:'#f2f2f2',
        ico:"list",
        icoColor:'#2089DC',
      },
    ]
  },
  theme:{
    Button: {
      raised: true,
    },
  },
}

const theme = params.theme;

class App extends Component {

  constructor (args) {
    super(args)
    this.state = {
      loading: false,
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Headers params={params} />
        <Body params={params} />
        <Footer params={params} />
      </ThemeProvider>
    );
  }
}

export default App;
