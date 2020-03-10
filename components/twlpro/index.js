import React, { Component } from 'react';
import { StyleSheet, YellowBox } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import {storage,UserDefault} from './../../helpers/Storage';
import Headers from './Headers';
import Body from './Body';
import socketIO from 'socket.io-client';


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
])

const params  = {
  title:"InSchool",
  Credit:"Desarrollo ProgramandoWeb 2020",
  periodos:[1,2,3,4],
  style:{
    borderBottomColor:'#2089DC',
  },
  menu2:{
    items:[
      {
        label:"Tareas",
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
        label:"Lista Asistencia",
        subtitle:"Lista de alumnos por clases",
        image:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        color:'#fff',
        backgroundColor:'#f2f2f2',
        ico:"list",
        icoColor:'#2089DC',
      },
    ]
  },
  menu4:{
    items:[
      {
        label:"Tareas",
        subtitle:"Creación de tareas y evaluaciones",
        image:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        color:'#fff',
        backgroundColor:'#f2f2f2',
        ico:"book",
        icoColor:'#2089DC',
        open:'ListaDeEvaluaciones',
      },{
        label:"Alumnos",
        subtitle:"Lista de todos los estudiantes",
        image:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        color:'#fff',
        backgroundColor:'#f2f2f2',
        ico:"face",
        icoColor:'#2089DC',
        open:'profesores_alumnos',
      },{
        label:"Lista Asistencia",
        subtitle:"Lista de alumnos por clases",
        image:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        color:'#fff',
        backgroundColor:'#f2f2f2',
        ico:"list",
        icoColor:'#2089DC',
        open:'profesores_lista_asistenncia',
      },
    ]
  },
  menu5:{
    items:[
      {
        label:"Tareas",
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
        label:"Lista Asistencia",
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});

/*
  JSON.stringify()
  JSON.parse()
*/

const theme =   params.theme;
let   user  =   UserDefault;

class App extends Component {

  constructor (args) {
    super(args)
    this.state = {
      loading: false,
      user: user,
      listaUsuario:[],
      listaMateriasProfesores:{},
      ajax:false,
      screen:"Home",
      messages:[],
      styles:styles,
      data_peticiones:[],
      socket:[],
      loading:false,
      tareas:{},
      add_Evaluaciones:{},
    }
  }

  componentDidMount() {
    const socket = socketIO('https://colombia.programandoweb.net:5010/', {
      transports: ['websocket'],
      jsonp: false,
      rejectUnauthorized: false,
    });
    socket.connect();
    socket.on('connect', () => {
      this.sobre_escribir_el_estado({socket:socket});
      console.log('Conectado a ProgramandoWeb Colombia');
    });
    socket.on('recargar_tareas', this.recargar_tareas);
    socket.on('actualizar_tareas', this.actualizar_tareas);
    socket.on('estatus', this.estatus);
  }

  componentWillUnmount(){
    this.state.socket.removeListener('recargar_tareas');
    this.state.socket.removeListener('actualizar_tareas');
    this.state.socket.removeListener('estatus');
  }

  sobre_escribir_el_estado  = (data)  =>  {
    this.setState(data);
  }

  recargar_tareas = (response)=>{
    console.log(response);
    this.refs.childMethod.handleChageScreen("ListaDeEvaluaciones",true)
    //this.sobre_escribir_el_estado({tareas:response.data});
  }

  actualizar_tareas = (response)=>{
    //console.log(response);
    this.sobre_escribir_el_estado({tareas:response.data});
  }

  estatus = (response)  =>{
    console.log(response);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Headers methods={this} state={this.state} params={params} />
        <Body ref="childMethod" methods={this} state={this.state} params={params} />
      </ThemeProvider>
    );
  }
}

export default App;
