import React, { Component } from 'react';
import { View,Text } from 'react-native';
class Body extends Component {
  render() {
    return (
        <View>
          <Text style={{textAlign:"center",padding:30,}}>{this.props.params.Credit}</Text>
        </View>
    );
  }
}
export default Body;
