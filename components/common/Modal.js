import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Overlay, Image  } from 'react-native-elements';

  class Modal extends Component {
    render(){
      return(
        <Overlay
            isVisible={this.props.state.modal.isVisible}
            borderRadius={8}
            containerStyle={{justifyContent: 'center',alignItems: 'center'}}
            height={this.props.state.modal.height}
            onBackdropPress={()=>{this.props.methods.sobre_escribir_el_estado({modal:{isVisible:false}})}}
        >
          <View>
            <View style={{ alignContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/logo_icon.png')}
                style={{ width: 100, height: 100,}}
              />
            </View>
            <View>
              <Text style={{  fontSize: 20,
                              textAlign: 'center',
                              color: "#000000",
                              fontWeight: 'bold',
                              padding: 2,
                            }}>{this.props.state.modal.title}</Text>
              <Text style={{marginTop: 5, fontSize: 16, textAlign: 'center', paddingBottom: 15,}}>
                {this.props.state.modal.messages}
              </Text>
            </View>
          </View>
        </Overlay>
      )
    }
  }

export default Modal;
