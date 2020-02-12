import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';

class Headers extends Component {
  render() {
    return (
        <Header
          placement="left"
          centerComponent={{ text: this.props.params.title, style: { color: '#fff' } }}
          leftComponent={{ icon: 'home', color: '#fff' }}
        />
    );
  }
}
export default Headers;
