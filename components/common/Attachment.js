import React, { Component } from 'react';
import { View , TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import FilePickerManager from 'react-native-file-picker';

class Attachment extends Component {

  render() {
    console.log(FilePickerManager);
    let props  = this.props.props;
    return (
      <TouchableOpacity onPress={this.handlerMicrophone}>
        <Icon name="upload" size={20} color="#BBBBBB" style={this.props.styles.inputIcons}  />
      </TouchableOpacity>
    )
  }

}
export default Attachment;
