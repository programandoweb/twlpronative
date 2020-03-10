import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
class Tareas extends Component {
  render() {
    return (
      <Card containerStyle={{ backgroundColor:this.props.values.backgroundColor,
                              borderBottomColor:this.props.params.style.borderBottomColor,
                              borderBottomWidth:3
                            }}>
        <ListItem
          chevron
          title={<View><Text style={{ marginLeft: 5, }}>{this.props.values.evaluacion}</Text></View>}
          subtitle={<View><Text style={{ marginLeft: 5, }}>{this.props.values.fecha}</Text></View>}
        />
      </Card>
    );
  }

}
export default Tareas;
