import React, { Component } from 'react';
import { View,  Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { Card,ListItem } from 'react-native-elements';
import Topbar from '../../common/Topbar';

class App extends Component {
  render() {
    console.log(this.props.state)
    return (  <KeyboardAvoidingView style={ this.props.styles.keyboard} behavior="padding" enabled>
                <ScrollView style={ this.props.styles.container}>
                  <Topbar name="Evaluaciones" back="Home" add="add_Evaluaciones" methods={this.props.methods} props={this.props}/>
                  {
                      (this.props.state.list!=undefined && Object.keys(this.props.state.list).length)?Object.entries(this.props.state.list).map((v,k) => {
                        let nombre_materia  = ""
                        if (v[1][0]!=undefined) {
                          nombre_materia  = v[1][0].materia + " "+ v[1][0].grado_escolar+ " ("+ v[1][0].seccion+") ";
                        }
                        return (
                          <Card key={k} containerStyle={{ borderBottomColor:this.props.params.style.borderBottomColor,borderBottomWidth:3}}>
                            <View>
                              <Text style={this.props.styles.title}>{nombre_materia}</Text>
                                {
                                  (v[1]!=undefined)?v[1].map((v2,k2) => {
                                    return (<TouchableOpacity
                                                key={k2}
                                                onPress={()=>this.props.handleChageScreenNoAjax(v2)}>
                                      <ListItem
                                        containerStyle={{paddingLeft:0, paddingBottom: 0}}
                                        roundAvatar
                                        chevron
                                        title={<View><Text style={this.props.styles.title}>{v2.evaluacion}</Text><Text style={this.props.styles.date}>{v2.fecha}</Text></View>}
                                        bottomDivider
                                    /></TouchableOpacity>)
                                  }):console.log("undefined")
                                }
                            </View>
                          </Card>
                        );
                      }):<View><Text></Text></View>
                  }
                </ScrollView>
              </KeyboardAvoidingView>
    );
  }
}
export default App;
