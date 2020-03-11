import React, { Component } from 'react';
import { Text,View,ScrollView,FlatList,StyleSheet,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import { Card,ListItem } from 'react-native-elements';
import Cards from './body/Cards';
import ListaDeEvaluaciones from './tareas/ListaDeEvaluaciones';
import AddEvaluaciones from './tareas/AddEvaluaciones';
import VerEvaluacion from './tareas/VerEvaluacion';
import VerUsuario from '../common/VerUsuario';
import {Storage} from './../../helpers/Storage';
import {Array_search} from './../../helpers/Functions';
import {Config} from './../../helpers/Config';
import Login from '../common/Login';
import ListaDeUsuarios from '../common/ListaDeUsuarios';
import Loading from '../common/Loading';
import Topbar from '../common/Topbar';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  handleChageScreen=(metodo,skip,navigation)=>{
    if (skip==undefined || skip===false) {
      this.props.methods.sobre_escribir_el_estado({loading:true});
    }

    Array_search(this.props.state.navigation,navigation,this.props);

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
      .then(data =>this.ActualizaState(data)
    );
    this.props.methods.sobre_escribir_el_estado({screen:metodo,chat:me});
  }

  ActualizaState  = (response,view)=>{
    this.props.methods.sobre_escribir_el_estado({loading:false});
    if (response.data_peticiones!=undefined) {
      this.props.methods.sobre_escribir_el_estado({data_peticiones:response.data_peticiones});
    }
    /*ESTO MANDA LA INFO EN EL SOCKET*/
    this.props.methods.actualizar_tareas(response,view);
  }

  handleChageScreenNoAjax=(v,view,back)=>{
    if (view==undefined) {
      let view  = "ver_Evaluacion";
    }
    if (back==undefined) {
      let back  = "ListaDeEvaluaciones";
    }
    Array_search(this.props.state.navigation,view,this.props);
    this.props.methods.sobre_escribir_el_estado({screen:view,add_Evaluaciones:v,common:v,})
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
                  <View style={{flex: 1,flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10,}}>
                      {
                        menu.map((v,k) => {
                          return (
                            <TouchableOpacity
                              onPress={() => { this.handleChageScreen(v.open,false,"Home")  }}
                              key={k} style={{  margin:10,
                                                height:100,
                                                flex: 0.33,
                                                padding: 15,
                                                backgroundColor: "#F2f2f2",
                                                alignSelf: 'center',
                                                alignContent: 'center'
                                              }}>
                              <Icon style={{alignSelf: 'center', marginBottom: 10,}} name={v.ico} size={35} color="#333333" />
                              <Text style={{textAlign: 'center'}}>
                                {v.label}
                              </Text>
                            </TouchableOpacity>
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
    //console.log(this.props.state.navigation);
    if (this.props.state.user.usuario_id>0) {
      if (!this.props.state.loading) {
        switch (this.props.state.screen) {
          case "ListaDeEvaluaciones":
            return(<ListaDeEvaluaciones handleChageScreenNoAjax={this.handleChageScreenNoAjax} state={this.props.state} params={this.props.params} styles={styles}  methods={this.props.methods} props={this.props}/>)
          break;
          case "add_Evaluaciones":
            return(<AddEvaluaciones styles={styles} state={this.props.state} params={this.props.params}  methods={this.props.methods} props={this.props}/>)
          break;
          case "ver_Evaluacion":
            return(<VerEvaluacion styles={styles} state={this.props.state} params={this.props.params}  methods={this.props.methods} props={this.props}/>)
          break;
          case "ListaDeMisAlumnos":
            return(<ListaDeUsuarios handleChageScreenNoAjax={this.handleChageScreenNoAjax} styles={styles} state={this.props.state} params={this.props.params}  methods={this.props.methods} props={this.props}/>)
          break;
          case "ver_Alumno":
            return(<VerUsuario styles={styles} state={this.props.state} params={this.props.params}  methods={this.props.methods} props={this.props}/>)
          break;
          case "profesores_lista_asistenncia":
            return(this.add_Evaluaciones())
          break;
          case "Home":
          default:
            return(this.home_swicth_usuarios())
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
  email:{
    fontSize:10,
  },
  mr:{
    marginRight: 10
  },
  title:{
    fontSize:11,
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
