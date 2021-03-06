import React, { Component } from 'react';
import { Text, View , TouchableOpacity } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Storage} from './../../helpers/Storage';

class Headers extends Component {

  handlerLogOut = ()  =>{
    Storage.clear(this.props.methods)
  }

  handlerHome = ()  =>{
    this.props.methods.sobre_escribir_el_estado({screen:"Home"});
  }

  render() {
    return (
        <Header
          placement="left"
          centerComponent={
            <TouchableOpacity onPress={this.handlerHome}>
              <View><Text style={{marginLeft: 6,color: '#FFFFFF',fontWeight: 'bold', fontSize: 20,}}>{this.props.params.title}</Text></View>
            </TouchableOpacity>
          }
          rightComponent={
            (this.props.state.user.usuario_id>0)?
            <TouchableOpacity onPress={this.handlerLogOut}>
              <View style={{marginRight: 20}}>
                <Icon name="sign-in" size={25} color="#FFFFFF" />
              </View>
            </TouchableOpacity>:<View></View>
          }
        />
    );
  }
}
export default Headers;
