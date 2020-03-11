import React, { Component } from 'react';
import {  TextInput, View, StyleSheet  } from 'react-native';

export class Textarea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filler: false,
      activo_teclado:"",
      mensaje:"",
    };
  }

  render() {
    return (

        <TextInput ref="textarea"
          multiline
          numberOfLines={6}
          style={styles.inputs}
          onChangeText={(text)=>{this.props.Object.setState({descripcion:text});}}
          placeholder="Descripción, temas y aspectos de la evaluación"
          underlineColorAndroid='transparent'
          value={this.props.Object.state.mensaje}
        />

    );
  }

}export default Textarea;

const styles = StyleSheet.create({
  inputs:{
    height:90,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
  },
})
