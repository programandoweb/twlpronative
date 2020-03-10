import React, { Component } from 'react';
import { Text,View } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const getToken = async () => {
  const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  if (status!=="granted") {
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  return token;
}

class App extends React.Component {
  componentDidMount(){
    getToken();
  }
  render() {
    return(<View><Text></Text></View>)
  }
}

export default App;
