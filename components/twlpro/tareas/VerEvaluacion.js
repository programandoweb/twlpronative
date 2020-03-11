import React, { Component } from 'react';
import { View,  Text, KeyboardAvoidingView, TouchableOpacity, ScrollView,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card,Button } from 'react-native-elements';
import Topbar from '../../common/Topbar';
import AddTareas from '../tareas/AddTareas';

class App extends Component {
  render() {
    return (  <KeyboardAvoidingView style={this.props.styles.keyboard} behavior="padding" enabled>
                <ScrollView style={this.props.styles.container}>
                  <Topbar name="Evaluación" back="ListaDeEvaluaciones" methods={this.props.methods} props={this.props}/>
                  <Card containerStyle={{ borderBottomColor:this.props.params.style.borderBottomColor,
                                          borderBottomWidth:3
                                        }}>
                    <View>
                      <Text style={this.props.styles.title}>
                        {this.props.state.add_Evaluaciones.evaluacion}
                      </Text>
                      <Text style={this.props.styles.date}>
                        Fecha: {this.props.state.add_Evaluaciones.fecha}
                      </Text>
                      <Text style={this.props.styles.title}>
                        Descripción:
                      </Text>
                      <Text style={this.props.styles.date}>
                        {this.props.state.add_Evaluaciones.descripcion}
                      </Text>
                      {(this.props.state.add_Evaluaciones.biblioteca!=undefined)?
                        <Button icon={<Icon style={this.props.styles.mr} name="cloud-download"  size={20} color="#fff"/>}
                            title="Material de Apoyo"
                            onPress={()=>{Linking.openURL(this.props.state.add_Evaluaciones.biblioteca)}}
                        />:<Text></Text>}
                    </View>
                  </Card>
                </ScrollView>
              </KeyboardAvoidingView>
    );
  }
}
export default App;
