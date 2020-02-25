import React, { Component } from 'react';
import { Text } from 'react-native';
import ListaChats from './body/ListaChats';
import OpenChat from './body/OpenChat';
import {Storage} from './../../helpers/Storage';
import {Config} from './../../helpers/Config';
import Login from '../common/Login';

class Body extends Component {

  constructor (args) {
    super(args)
    if (this.props.state.user.usuario_id==0) {
      let method  = this.props.methods;
      Storage.get('user').then(function(data){
        let set = JSON.parse(data);
        method.sobre_escribir_el_estado(set);
      })
    }
  }

  ActualizaState  = (data)=>{

    if (data.messages) {
      //console.log(data.messages);
      this.props.methods.sobre_escribir_el_estado(data);
    }else {
      this.props.methods.sobre_escribir_el_estado({"messages":[]});
    }

    this.props.methods.sobre_escribir_el_estado({loading:false});
  }

  handleOpenChat   = (me) =>{
    var headers =   new Headers();
    var data    =   new FormData();
        data.append ("u", me.token);
        data.append ("name", me.nombre);
        data.append ("token", me.token);
        data.append ("ventana", me.ventana);
        data.append ("event", "armar_ventana_chat");
    let cabecera  =   { headers:headers,
                        method: "POST",
                        body: data
                      }
    fetch(Config.ApiRest + "get?modulo=Chat&m=Chats&formato=json&u="+me.token,cabecera)
      .then(response => response.json())
      .then(data =>this.ActualizaState(data.response)
    );
    this.props.methods.sobre_escribir_el_estado({screen:"OpenChat",chat:me,loading:true});
  }

  render() {
    if (this.props.state.user.usuario_id>0) {
      switch (this.props.state.screen) {
        case "OpenChat":
          return(
            <OpenChat methods={this.props.methods} state={this.props.state}/>
          )
        break;
        case "Home":
        default:
          return(
            <ListaChats method={this.handleOpenChat} listaUsuario={this.props.state.listaUsuario}/>
          )
        break;
      }
    }else {
      return(<Login methods={this.props.methods} props={this.props}/>)
    }
  }
}
export default Body;
