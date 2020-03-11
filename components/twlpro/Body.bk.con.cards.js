import React, { Component } from 'react';
import { Text,View,ScrollView,FlatList,StyleSheet,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import { Card,ListItem } from 'react-native-elements';
import Cards from './body/Cards';
import AddTareas from './body/AddTareas';
import VerEvaluacion from './body/VerEvaluacion';
import {Storage} from './../../helpers/Storage';
import {Config} from './../../helpers/Config';
import Login from '../common/Login';
import Loading from '../common/Loading';
import Topbar from '../common/Topbar';

class Body extends Component {

  constructor (args) {
    super(args)
    if (this.props.state.user.usuario_id==0) {
      let method  = this.props.methods;
      Storage.get('user').then(function(data){
        let set = JSON.parse(data);
        method.sobre_escribir_el_estado(set);
      })
    }
  }

  handleChageScreen=(metodo,skip)=>{
    if (skip==undefined) {
      this.props.methods.sobre_escribir_el_estado({loading:true});
    }
    var me      =   this.props.state.user;
    var headers =   new Headers();
    var data    =   new FormData();
        data.append ("u", me.token);
        data.append ("name", me.nombre);
        data.append ("token", me.token);
        data.append ("ventana", me.ventana);
        data.append ("event", "armar_ventana_chat");
    let cabecera  =   { headers:headers,
                        method: "POST",
                        body: data
                      }
    fetch(Config.ApiRest + "get?modulo=Profesores&m="+metodo+"&formato=json&u="+me.token,cabecera)
      .then(response => response.json())
      .then(data =>this.ActualizaState(data,"tareas")
    );
    this.props.methods.sobre_escribir_el_estado({screen:metodo,chat:me});
  }

  ActualizaState  = (response,view)=>{
    //this.props.methods.sobre_escribir_el_estado({loading:false,tareas:response.data});
    this.props.methods.sobre_escribir_el_estado({loading:false});
    if (response.data_peticiones!=undefined) {
      this.props.methods.sobre_escribir_el_estado({data_peticiones:response.data_peticiones});
    }
    /*ESTO MANDA LA INFO EN EL SOCKET*/
    this.props.methods.actualizar_tareas(response,view);
  }

  ListaDeEvaluaciones=()=>{
    return  <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
              <ScrollView style={styles.container}>
                <Topbar name="Evaluaciones" back="Home" add="add_Evaluaciones" methods={this.props.methods}/>
                {
                    (this.props.state.tareas!=undefined && Object.keys(this.props.state.tareas).length)?Object.entries(this.props.state.tareas).map((v,k) => {
                      let nombre_materia  = ""
                      if (v[1][0]!=undefined) {
                        nombre_materia  = v[1][0].materia + " "+ v[1][0].grado_escolar+ " ("+ v[1][0].seccion+") ";
                      }
                      return (
                        <Card key={k} containerStyle={{ borderBottomColor:this.props.params.style.borderBottomColor,borderBottomWidth:3}}>
                          <View >
                            <Text style={styles.title}>{nombre_materia}</Text>
                              {
                                (v[1]!=undefined)?v[1].map((v2,k2) => {
                                  return (<TouchableOpacity
                                              key={k2}
                                              onPress={()=>this.props.methods.sobre_escribir_el_estado({screen:"ver_Evaluacion",add_Evaluaciones:v2})}>
                                    <ListItem
                                      containerStyle={{paddingLeft:0, paddingBottom: 0}}
                                      roundAvatar
                                      chevron
                                      title={<View><Text style={styles.title}>{v2.evaluacion}</Text><Text style={styles.date}>{v2.fecha}</Text></View>}
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
  }

  add_Evaluaciones=()=>{
    return <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
              <ScrollView style={styles.container}>
                <Topbar name="Evaluación" back="ListaDeEvaluaciones" methods={this.props.methods}/>
                <AddTareas style={styles} params={this.props.params} state={this.props.state} methods={this.props.methods}/>
              </ScrollView>
            </KeyboardAvoidingView>
  }

  ver_Evaluacion=()=>{
    return  <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
              <ScrollView style={styles.container}>
                <Topbar name="Evaluación" back="ListaDeEvaluaciones" methods={this.props.methods}/>
                <VerEvaluacion style={styles} params={this.props.params} state={this.props.state}/>
              </ScrollView>
            </KeyboardAvoidingView>
  }

  ListaDeMisAlumnos=()=>{
    return  <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
              <ScrollView style={styles.container}>

              </ScrollView>
            </KeyboardAvoidingView>
  }

  home_swicth_usuarios=()=>{
    let menu = "";
    switch (this.props.state.user.tipo_usuario_id) {
      case "4":
        menu = this.props.params.menu4.items;
        return <ScrollView
                  style={styles.container}
                >{
                  <View>
                      {
                        menu.map((v,k) => {
                          return (
                            <Cards key={k} values={v} handleChageScreen={this.handleChageScreen}/>
                          );
                        })
                      }
                  </View>
                }</ScrollView>
      break;
      case "5":
        menu = this.props.params.menu5.items;
        return <View>{
            menu.map((v,k) => {
              return (
                <Cards key={k} values={v}/>
              );
            })
          }</View>
      break;
      case "2":
        menu = this.props.params.menu2.items;
        return <View>{
            menu.map((v,k) => {
              return (
                <Cards key={k} values={v}/>
              );
            })
          }</View>
      break;
      default:
      return <View><Text>USUARIO SIN PRIVILEGIOS</Text></View>
    }

  }

  render() {
    //console.log(this.props.methods);
    if (this.props.state.user.usuario_id>0) {
      if (!this.props.state.loading) {
        switch (this.props.state.screen) {
          case "ListaDeEvaluaciones":
            return(this.ListaDeEvaluaciones())
          break;
          case "add_Evaluaciones":
            return(this.add_Evaluaciones())
          break;
          case "ver_Evaluacion":
            return(this.ver_Evaluacion())
          break;
          case "ListaDeMisAlumnos":
            return(this.ListaDeMisAlumnos())
          break;
          case "profesores_lista_asistenncia":
            return(this.add_Evaluaciones())
          break;
          case "Home":
          default:
            return(<KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>{this.home_swicth_usuarios()}</KeyboardAvoidingView>)
          break;
        }
      }else {
        return(
          <Loading/>
        )
      }

    }else {
      return(<Login methods={this.props.methods} props={this.props}/>)
    }
  }
}
export default Body;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  filler:{
    height: 'Keyboard Height'
  },
  container:{
    flex:1
  },
  date:{
    fontSize:14,
    marginBottom: 20,
  },
  mr:{
    marginRight: 10
  },
  title:{
    fontSize:14,
    fontWeight: 'bold',
  },
  list:{
    paddingHorizontal: 17,
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#ddd",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:5,
    marginRight:5,
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputContainerNoColors: {
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
  },
  inputIcons: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    width:40,
    marginRight:5,
    marginLeft: 5,
    alignItems:'center',
    padding: 10,
    textAlign: 'center',
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:300,
    padding:5,
  },
  select:{

  },
  textarea:{
    borderWidth: 1,
    borderColor: "#d2d2d2",
    padding: 5,
  }
});
