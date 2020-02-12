import React, { Component } from 'react';
import { ScrollView,Text } from 'react-native';
import Cards from './body/Cards';
import ListaChats from './body/ListaChats';
import {Config} from './../../helpers/Config';
import Login from '../common/Login';

class Body extends Component {

  constructor (args) {
    super(args)
    if (this.props.state.user.usuario_id>0) {

    }
  }

  handleOpenChat   = (me) =>{

  }

  getListaUsuarios = ()=>{
    var headers    = new Headers();
    var data       = new FormData();
    let cabecera   = { headers:headers,
                        method: "POST",
                        body: data
                      }
    fetch(Config.ApiRest + "post?modulo=Chat&m=listaUsuarios&formato=json",cabecera)
      .then(response => response.json())
      .then(data =>
        this.setlistaUsuarios(data.response.data)
    );
  }



  render() {
    if (this.props.state.user.usuario_id>0) {
      const listaUsuario = this.props.state.listaUsuario;
      return(
        <ScrollView>
          {
            listaUsuario.map((v,k) => {
              return (
                <Cards method={this.handleOpenChat} key={k} values={v}/>
              );
            })
          }
        </ScrollView>
      )
    }else {
      return(<Login methods={this.props.methods} props={this.props}/>)
    }
  }
}
export default Body;
