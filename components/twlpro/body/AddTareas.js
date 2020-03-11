import React, { Component } from 'react';
import { View, Text, Image, Picker,ScrollView, KeyboardAvoidingView,StyleSheet } from 'react-native';
import { Card, ListItem, Avatar, Input , Button , FormInput } from 'react-native-elements';
import Calendar from '../../common/Calendar';
import Attachment from '../../common/Attachment';
import Textarea from '../../common/Textarea';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Add_Evaluaciones, FechaHoy }  from '../../../helpers/Functions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Tareas extends Component {

  constructor (args) {
    super(args)
    this.state = {
      evaluacion: "",
      fecha:FechaHoy(),
      materia:"",
      descripcion:"",
      date:new Date(),
      periodo:1,
      singleFile:"",
      result_singleFile:{},
      user:this.props.state.user.token,
      methods:this.props.methods,
    }
    if (Object.keys(this.props.state.listaMateriasProfesores).length==0) {
      this.props.methods.sobre_escribir_el_estado({listaMateriasProfesores:this.props.state.data_peticiones.materias})
    }
  }

  form=()=>{
    return <KeyboardAvoidingView behavior="padding" enabled>
              <ScrollView>
                <Card containerStyle={{ borderBottomColor:this.props.params.style.borderBottomColor,
                                        borderBottomWidth:3
                                      }}>
                  <View>
                    <Input
                      onChangeText={(text)=>{this.setState({evaluacion:text});}}
                      placeholder='Evaluación'
                      rightIcon={{ type: 'font-awesome', name: 'chevron-right' }}
                      errorStyle={{ color: 'red' }}
                      value={this.state.evaluacion}
                    />
                    <Picker
                      selectedValue={this.state.materia}
                      style={{height: 50, marginTop: 10 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({materia: itemValue})
                      }>
                      {Object.entries(this.props.state.data_peticiones.materias).map((v,k) => {
                        return <Picker.Item label={v[1]} value={v[0]} key={k} />
                      })}
                    </Picker>
                    <Picker
                      selectedValue={this.state.periodo}
                      style={{height: 50, marginTop: 10, marginBottom: 10 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({periodo: itemValue})
                      }>
                      {
                        this.props.params.periodos.map((v,k) => {
                          return <Picker.Item label={"Período "+v} value={v} key={k} />
                        })
                      }
                    </Picker>
                    <View style={this.props.style.textarea}>
                      <Textarea Object={this} />
                    </View>
                    <Calendar Object={this}/>
                    <Attachment Object={this}  styles={this.props.styles}/>
                    <View style={{marginTop: 10}}>
                      <Button onPress={()=>{Add_Evaluaciones(this)}}
                              icon={
                                    <Icon
                                      name="save"
                                      size={15}
                                      color="white"
                                      style={{marginRight:10}}
                                    />
                              }
                              title="Crear o Guardar Tarea"
                      />
                    </View>
                  </View>
                </Card>
              </ScrollView>
            </KeyboardAvoidingView>
  }

  render() {
    return (
      this.form()
    );
  }

}
export default Tareas;
