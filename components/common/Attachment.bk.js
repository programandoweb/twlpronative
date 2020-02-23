import React, { Component } from 'react';
import { View , TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <TouchableOpacity onPress={this.selectOneFile.bind(this)}>
        <Icon name="upload" size={20} color="#BBBBBB" style={this.props.styles.inputIcons}  />
      </TouchableOpacity>
    )
  }

}
export default Attachment;
