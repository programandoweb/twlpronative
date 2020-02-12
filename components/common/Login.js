import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Input , Button,FormInput  } from 'react-native-elements';
import {storage} from './../../helpers/Storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Config} from './../../helpers/Config';
class Cards extends Component {

  constructor (args) {
    super(args)
    this.state = {
      login: "lic.jorgemendez",
      password: "123456",
    }
  }

  setUsuario    = (data)=>{
    this.props.methods.sobre_escribir_el_estado(data);
  }

  handlerButton =   (event)=>{
    var headers =   new Headers();
    var data    =   new FormData();
        data.append ("login", this.state.login);
        data.append ("password", this.state.password);
    let cabecera  =   { headers:headers,
                        method: "POST",
                        body: data
                      }
    fetch(Config.ApiRest + "post?modulo=Chat&m=Login&formato=json",cabecera)
      .then(response => response.json())
      .then(data =>
        this.setUsuario(data.response)
      );
  }

  render() {
    return (
      <Card title="Sistema de Identificación">
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
          <Text
            style={{marginTop:20,textAlign:"center"}}
            onPress={this.handlerButton}
          >Ingresar al Sistema</Text>
        </View>
      </Card>
    );
  }

}
export default Cards;
