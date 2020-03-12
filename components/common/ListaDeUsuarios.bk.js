import React, { Component } from 'react';
import { View,  Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { Card,ListItem } from 'react-native-elements';
import Topbar from './Topbar';
import Config from '../../helpers/Config';
import SearchFilter from './SearchFilter';

class ListaDeUsuarios extends Component {
  render() {
    console.log(this.props.state.list);
    return (  <KeyboardAvoidingView style={ this.props.styles.keyboard} behavior="padding" enabled>
                <ScrollView style={ this.props.styles.container}>
                  <Topbar name="Lista de Alumnos" back="Home" methods={this.props.methods} props={this.props}/>
                  <SearchFilter name="Lista de Alumnos" back="Home" methods={this.props.methods} props={this.props}/>
                  {
                    (this.props.state.list!=undefined && Object.keys(this.props.state.list).length)?Object.entries(this.props.state.list).map((v,k) => {
                      let nombre_materia  = ""
                      if (v[1][0]!=undefined) {
                        nombre_materia  = v[1][0].grado_escolar+ " ("+ v[1][0].seccion+") ";
                      }
                      return (
                        <Card key={k} containerStyle={{ borderBottomColor:this.props.params.style.borderBottomColor,borderBottomWidth:3}}>
                          <View><Text style={this.props.styles.title}>{nombre_materia}</Text></View>
                          <View>
                            {
                              (v[1]!=undefined)?v[1].map((v2,k2) => {
                                return (<TouchableOpacity
                                            key={k2}
                                            onPress={()=>this.props.handleChageScreenNoAjax(v2,"ver_Alumno","ListaDeUsuarios")}>
                                  <ListItem
                                    roundAvatar
                                    leftAvatar={{ source: { uri: Config.dominio+v2.avatar } }}
                                    chevron
                                    title={<View>
                                                  <Text style={this.props.styles.title}>{v2.alumno}</Text>
                                                  <Text style={this.props.styles.email}>{v2.telefono} {v2.email}</Text>
                                          </View>}
                                    bottomDivider
                                /></TouchableOpacity>)
                              }):console.log("undefined")
                            }
                          </View>
                        </Card>
                      )
                    }):<View></View>
                  }
                </ScrollView>
              </KeyboardAvoidingView>
    );
  }
}
export default ListaDeUsuarios;
