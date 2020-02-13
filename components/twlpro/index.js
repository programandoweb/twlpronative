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
  title:"TWLPRO",
  Credit:"Desarrollo TWLPro 2020",
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
      ajax:false,
      screen:"ListaChats",
      messages:[],
      styles:styles,
      data_peticiones:[],
      socket:[],
      loading:false,
    }
  }

  componentDidMount() {
    const socket = socketIO('https://colombia.programandoweb.net:5000', {
      transports: ['websocket'],
      jsonp: false,
      rejectUnauthorized: false,
    });
    socket.connect();
      socket.on('connect', () => {
        console.log('connected to socket server');
        this.sobre_escribir_el_estado({socket:socket});
      });
    }

  sobre_escribir_el_estado  = (data)  =>  {
    this.setState(data);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Headers methods={this} state={this.state} params={params} />
        <Body methods={this} state={this.state} params={params} />
      </ThemeProvider>
    );
  }
}

export default App;
