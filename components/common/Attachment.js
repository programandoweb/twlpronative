import React, { Component } from 'react';
import { View , TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
//import { DocumentPicker } from 'expo';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js'

class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleFile: '',
      multipleFile: [],
    };
  }


  pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type!=="cancel") {
      const base64: string = await FileSystem.readAsStringAsync(
      result.uri,{
          encoding: FileSystem.EncodingType.Base64,
      });
      this.props.methods(result,base64);
    }else{
      console.log(result.type);
    }
  }

  render() {
    let props  = this.props.props;

    return (
      <TouchableOpacity onPress={this.pickDocument}>
        <Icon name="upload" size={20} color="#BBBBBB" style={this.props.styles.inputIcons}  />
      </TouchableOpacity>
    )
  }

}
export default Attachment;
