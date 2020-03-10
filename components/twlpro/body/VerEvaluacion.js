import React, { Component } from 'react';
import { View, Text, Image,Linking } from 'react-native';
import { Card, ListItem, Avatar,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
class VerEvaluacion extends Component {
  render() {
    return (
      <Card containerStyle={{ borderBottomColor:this.props.params.style.borderBottomColor,
                              borderBottomWidth:3
                            }}>
        <View>
          <Text style={this.props.style.title}>
            {this.props.state.add_Evaluaciones.evaluacion}
          </Text>
          <Text style={this.props.style.date}>
            Fecha: {this.props.state.add_Evaluaciones.fecha}
          </Text>
          <Text style={this.props.style.title}>
            Descripción:
          </Text>
          <Text style={this.props.style.date}>
            {this.props.state.add_Evaluaciones.descripcion}
          </Text>
          {(this.props.state.add_Evaluaciones.biblioteca!=undefined)?<Button icon={
                                                                                    <Icon style={this.props.style.mr} name="cloud-download"  size={20} color="#fff"/>
                                                                                  }
                                                                              title="Material de Apoyo"
                                                                              onPress={()=>{Linking.openURL(this.props.state.add_Evaluaciones.biblioteca)}}
                                                                      />:<Text></Text>}
        </View>
      </Card>
    );
  }

}
export default VerEvaluacion;
