import React, { Component } from 'react';
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class NoteVoice extends Component {

  render() {
    let props  = this.props.props;
    return (
      <Icon name="microphone" size={20} color="#BBBBBB" style={this.props.styles.inputIcons}  />
    )
  }

}
export default NoteVoice;
