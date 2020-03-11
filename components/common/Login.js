import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Input , Button } from 'react-native-elements';
import {Storage} from './../../helpers/Storage';
import Loading from './Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Config} from './../../helpers/Config';

class Cards extends Component {

  constructor (args) {
    super(args)
    this.state = {
      login: "erick",
      password: "123456",
    }
  }

  setUsuario    = (data)=>{
    this.props.methods.sobre_escribir_el_estado({loading:false});
    Storage.set("user",data.store,this.props.methods);
  }

  handlerButton =   (event)=>{
    this.props.methods.sobre_escribir_el_estado({loading:true});
    var headers =   new Headers();
    var data    =   new FormData();
        data.append ("login", this.state.login);
        data.append ("password", this.state.password);
    let cabecera  =   { headers:headers,
                        method: "POST",
                        body: data
                      }
    fetch(Config.ApiRest + "post?modulo=Usuarios&m=login&formato=json",cabecera)
      .then(response => response.json())
      .then(data =>
        this.setUsuario(data.response)
      );
  }

  Login = () =>{
    return <Card title="Sistema de Identificación">
      <View>
        <Input
          onChangeText={(text)=>{this.setState({login:text});}}
          placeholder='Nombre de Usuario'
          rightIcon={{ type: 'font-awesome', name: 'chevron-right' }}
          errorStyle={{ color: 'red' }}
          value={this.state.login}
        />
        <Input
          secureTextEntry={true}
          onChangeText={(text)=>{this.setState({password:text});}}
          placeholder="Password"
          rightIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
          errorStyle={{ color: 'red' }}
          value={this.state.password}
        />
        <View style={{marginTop:30}}>
          <TouchableOpacity>
            <Button title="Ingresar al Sistema"  onPress={this.handlerButton}/>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  }

  render() {
    let props  = this.props.props;
    if (!props.state.loading) {
      return (
        this.Login()
      )
    }else {
      return(
        <Loading/>
      )
    }
  }

}
export default Cards;
