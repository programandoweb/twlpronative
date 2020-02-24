import React, { Component } from 'react';
import { View , TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import FilePickerManager from 'react-native-file-picker';

FilePickerManager.showFilePicker(null, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled file picker');
  }
  else if (response.error) {
    console.log('FilePickerManager Error: ', response.error);
  }
  else {
    this.setState({
      file: response
    });
  }
});


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
