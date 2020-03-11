import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
class Cards extends Component {
  render() {
    return (
      <Card containerStyle={{ backgroundColor:this.props.values.backgroundColor,
                              borderBottomColor:this.props.values.icoColor,
                              borderBottomWidth:3
                            }}>
        <ListItem
          onPress={() => { this.props.handleChageScreen(this.props.values.open)  }}
          chevron
          leftIcon={{ name: this.props.values.ico ,size:50,iconStyle:{color: this.props.values.icoColor} }}
          title={<View><Text style={{ marginLeft: 5, }}>{this.props.values.label}</Text></View>}
          subtitle={<View><Text style={{ marginLeft: 5, }}>{this.props.values.subtitle}</Text></View>}
        />
      </Card>
    );
  }

}
export default Cards;
