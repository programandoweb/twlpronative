import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';

class Headers extends Component {
  render() {
    return (
        <Header
          placement="left"
          centerComponent={{ text: this.props.params.title, style: { color: '#fff' } }}
          leftComponent={{ type: 'font-awesome', icon: 'home', color: '#fff' }}
          rightComponent={{ type: 'font-awesome', icon: 'sign-in', color: '#fff' }}
        />
    );
  }
}
export default Headers;
