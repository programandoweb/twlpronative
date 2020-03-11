import React, { Component } from 'react';
import { View,  Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { Card,ListItem } from 'react-native-elements';
import Topbar from '../../common/Topbar';
import AddTareas from '../tareas/AddTareas';

class App extends Component {
  render() {
    return (  <KeyboardAvoidingView style={this.props.styles.keyboard} behavior="padding" enabled>
                <ScrollView style={this.props.styles.container}>
                  <Topbar name="Evaluación" back="ListaDeEvaluaciones" methods={this.props.methods} props={this.props}/>
                  <AddTareas style={this.props.styles} params={this.props.params} state={this.props.state} methods={this.props.methods}/>
                </ScrollView>
              </KeyboardAvoidingView>
    );
  }
}
export default App;
