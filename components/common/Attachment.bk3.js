import React, { Component } from 'react';
import { View , TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleFile: '',
      multipleFile: [],
    };
  }
  render() {
    let props  = this.props.props;
    return (
      <TouchableOpacity>
        <Icon name="upload" size={20} color="#BBBBBB" style={this.props.styles.inputIcons}  />
      </TouchableOpacity>
    )
  }

}
export default Attachment;
