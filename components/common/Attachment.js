import React, { Component } from 'react';
import { View , TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
//import { DocumentPicker } from 'expo';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js'
import { Button } from 'react-native-elements';

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
      <TouchableOpacity >
        <View>
          <Button onPress={this.pickDocument}
                  icon={
                        <Icon
                          name="cloud-upload"
                          size={15}
                          color="white"
                          style={{marginRight:10}}
                        />
                  }
                  title="Subir Archivo Material de apoyo"
          />
        </View>
      </TouchableOpacity>
    )
  }

}
export default Attachment;
