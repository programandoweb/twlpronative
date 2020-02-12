import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
class Cards extends Component {
  render() {
    return (
        <ListItem onPress={()=>this.props.method(this.props.values)}
          bottomDivider
          chevron
          leftAvatar={{ source: { uri: this.props.values.avatar } }}
          title={<View><Text style={{ marginLeft: 10, }}>{this.props.values.nombre_usuario}</Text></View>}
          subtitle={<View><Text style={{ marginLeft: 10, fontSize:10 }}>{this.props.values.email}</Text></View>}
        />
    );
  }

}
export default Cards;
