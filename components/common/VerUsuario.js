import React, { Component } from 'react';
import { View,  Text, KeyboardAvoidingView, TouchableOpacity, ScrollView,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card,Button,Avatar } from 'react-native-elements';
import Topbar from './Topbar';
import {Config} from '../../helpers/Config';

class App extends Component {
  render() {
    return (  <KeyboardAvoidingView style={this.props.styles.keyboard} behavior="padding" enabled>
                <ScrollView style={this.props.styles.container}>
                  <Topbar name="Usuario" back="ListaDeMisAlumnos" methods={this.props.methods} props={this.props}/>
                  <Card containerStyle={{ borderBottomColor:this.props.params.style.borderBottomColor,
                                          borderBottomWidth:3
                                        }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex:0.2}}>
                        <Avatar
                          xlarge
                          rounded
                          source={{uri: Config.images+this.props.state.common.avatar}}
                          activeOpacity={0.7}
                        />
                      </View>
                      <View style={{flex:0.8}}>
                        <Text style={this.props.styles.title}>
                          {this.props.state.common.alumno}
                        </Text>
                        <Text style={this.props.styles.title}>
                          {this.props.state.common.grado} ({this.props.state.common.seccion})
                        </Text>
                        <Text style={this.props.styles.fecha}>
                          Teléfono: {this.props.state.common.telefono}
                        </Text>
                        <Text style={this.props.styles.title}>
                          Acudiente {this.props.state.common.acudiente}
                        </Text>
                        <Text style={this.props.styles.fecha}>
                          Tel Acudiente {this.props.state.common.acudiente_telefono}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </ScrollView>
              </KeyboardAvoidingView>
    );
  }
}
export default App;
