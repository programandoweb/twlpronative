import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Linking,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import { Header } from 'react-native-elements';
import Loading from '../../common/Loading';
import NoteVoice from '../../common/NoteVoice';
import Attachment from '../../common/Attachment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Config} from './../../../helpers/Config';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js'

export default class Chat extends Component {

  currHeight = 0;
  prevHeight = 0;
  scrollHeight = 0;

  scrollToBottom = () => {
    this.refs.scrollView.getScrollResponder().scrollResponderScrollTo({
      x: 0,
      y: (this.scrollHeight * 5),
      animated: true
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filler: false,
      activo_teclado:"",
      mensaje:"",
    };
  }

  componentDidMount() {
    this.props.state.socket.on('actualizar_mensajes', this.actualizar_mensajes);
    this.props.state.socket.on('actualizar_mensajes_app', this.actualizar_mensajes_app);
  }

  componentWillUnmount(){
    this.props.state.socket.removeListener('actualizar_mensajes');
    this.props.state.socket.removeListener('actualizar_mensajes_app');
  }

  //this.props.methods.sobre_escribir_el_estado({loading:false});

  actualizar_mensajes=(data)=>{
    if (data.data[1].mensaje_app!=undefined) {
      data.data[1].mensaje=data.data[1].mensaje_app;
      data.data[1].type=(data.data[1].type)?data.data[1].type:"text";
    }
    let methods   = this.props.methods;
    let messages  =  this.props.state.messages;
    messages.push(data.data[1]);
    methods.sobre_escribir_el_estado({messages: messages});
    setTimeout(() => this.refs.scrollView.scrollToEnd({animated: true}), 400)
  }

  // actualizar_mensajes_app=(data)=>{
  //
  //   let methods   = this.props.methods;
  //   let messages  =  this.props.state.messages
  //   messages.push(data.data[1]);
  //   //console.log(messages);
  //   // methods.sobre_escribir_el_estado({messages: messages});
  //   // setTimeout(() => this.refs.scrollView.scrollToEnd({animated: true}), 400)
  // }

  response  = (data)  =>  {
    this.props.state.socket.emit('enviar_mensaje',data);
    this.props.state.socket.emit('enviar_mensaje_app',data);

  }

  handlerSend = (event) =>{
    let yo       = this.props.state.user
    if(this.state.mensaje!==''){
      /*preparo el mensaje*/
      let obj	=	{
                  "url":Config.ApiRest + "post?modulo=Chat&m=message&formato=json&u="+yo.token,
                  "name":yo.nombre_usuario,
                  "mensaje":this.state.mensaje,
                  "token":this.props.state.token,
                  "ventana":this.props.state.ventana,
                  "reply":"",
                  "event":"agregarItem",
                }
      let temporal_mensaje  = this.state.mensaje;
      this.setState({mensaje:""})

      /*envío elmensaje al servidor, no espero respuesta*/
      var headers =   new Headers();
      var data    =   new FormData();
      let arrays  =   Object.entries(obj);
      arrays.map(([key,value])=>{
        data.append (key, value);
        return value;
      });
      let cabecera  =   { headers:headers,
                          method: "POST",
                          body: data,
                        }
      fetch(Config.ApiRest + "post?modulo=Chat&m=message&formato=json&u="+yo.token,cabecera)
        .then(response => response.json())
        .then(data =>
          this.response(data)
        )
    }
  }

  _keyboardDidShow() {
    this.setState({filler: true,activo_teclado:"Activo"})
    setTimeout(() => this.refs.scrollView.scrollToEnd({animated: true}), 200);
  }

  _keyboardDidHide() {
    this.setState({filler: false,activo_teclado:"Inactivo"})
  }

  handlerCloseChat = (event) =>{
    this.props.methods.sobre_escribir_el_estado({screen:"ListaChats"})
  }

  setResult    = (data)=>{
    let yo       = this.props.state.user
    let obj	=	{}
    /*
      file_ext
      imagen_nueva
      is_image
    */
    if (data.upload_data.is_image) {
      obj.mensaje			=	'<a target="_blank" href="'+data.upload_data.imagen_nueva+'"><img class="img-thumbnail item" src="'+data.upload_data.imagen_nueva+'"/></a>';
    }else{
      var icon	=	'';
      switch(data.upload_data.file_ext){
        case ".pdf":
          icon	=	'<i class="far fa-file-pdf fa-2x"></i>';
        break;
        case ".doc":
        case ".docx":
          icon	=	'<i class="far fa-file-doc fa-2x"></i>';
        break;
        default:
          icon	=	'<i class="fas fa-file fa-2x"></i>';
        break;
      }
      obj.mensaje			=	'<a target="_blank" href="'+data.response.data.upload_data.imagen_nueva+'">'+icon+'</a>';
    }
    obj.mensaje_app		=	data.upload_data.imagen_nueva;
    //this.setState({mensaje:data.upload_data.imagen_nueva})


    obj	=	{
                "url":Config.ApiRest + "post?modulo=Chat&m=message&formato=json&u="+yo.token,
                "name":yo.nombre_usuario,
                "mensaje":obj.mensaje,
                "mensaje_app":data.upload_data.imagen_nueva,
                "token":this.props.state.token,
                "ventana":this.props.state.ventana,
                "reply":"",
                "event":"agregarItem",
              }

    var headers =   new Headers();
    var data    =   new FormData();
    let arrays  =   Object.entries(obj);
    arrays.map(([key,value])=>{
      data.append (key, value);
      return value;
    });
    let cabecera  =   { headers:headers,
                        method: "POST",
                        body: data,
                      }
    fetch(Config.ApiRest + "post?modulo=Chat&m=message&formato=json&u="+yo.token,cabecera)
      .then(response => response.json())
      .then(data =>
        this.response(data)
      )

  }

  stringToUint8Array  = (str) => {
    const length = str.length
    const array = new Uint8Array(new ArrayBuffer(length))
    for (let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
    return array
  }

  handlerAddfile = (result,base64_) =>{
    let   uri     =   result.uri
    let   uriParts = uri.split('.');
    let   fileType = uriParts[uriParts.length - 1];

    var   headers =   new Headers();
    var   data    =   new FormData();
          data.append('archivo_base64', base64_ );
          data.append('archivo_datos', JSON.stringify(result) );
          data.append('archivo_ext', fileType );
    let cabecera  =   { headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'multipart/form-data; charset=UTF-8',
                        },
                        method: "POST",
                        body: data
                      }
    fetch(Config.ApiRest + "post?modulo=Chat&m=UploadViaApp&formato=json",cabecera)
    .then(response => response.json())
    .then(data =>
      this.setResult(data)
    )
  }

  handlerAddfile__ = (result) =>{
    let   uri     =   result.uri
    var   headers =   new Headers();
    var   data    =   new FormData();
          data.append('file', uri );
    let cabecera  =   { headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'multipart/form-data; charset=UTF-8',
                        },
                        method: "POST",
                        body: data
                      }
    fetch(Config.ApiRest + "post?modulo=Chat&m=UploadViaApp&formato=json",cabecera)
      .then(response => response.json())
      .then(data =>
        this.setResult(data)
      )
  }

  microphone = () => {
    return <TouchableOpacity onPress={this.handlerMicrophone}><NoteVoice styles={styles}  methods={this.props.methods}/></TouchableOpacity>
  }

  microphone_ = () => {
    return <TouchableOpacity onPress={this.handlerMicrophone}>
      <View style={styles.btnSend}>
        <Voice/>
      </View>
    </TouchableOpacity>
  }

  addfile = () => {
    return <Attachment styles={styles} methods={this.handlerAddfile}/>
  }

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

  render() {
    let yo      =   this.props.state.user
    let user_id =   parseInt(yo.user_id);
    if (!this.props.state.loading) {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Header
          statusBarProps={{ barStyle: 'light-content' }}
          barStyle="light-content" // or directly
          placement="left"
          centerComponent={{ text: this.props.state.chat.nombre_usuario, style: { color: '#111',fontSize:30 } }}
          leftComponent={
            <TouchableOpacity onPress={this.handlerCloseChat}>
              <View style={{marginLeft: 12}} >
                <Icon name="chevron-left"  size={20} color="#BBBBBB"/>
              </View>
            </TouchableOpacity>
          }
          rightComponent={
            <View style={styles.inputContainerNoColors}>
              {
                this.addfile()
              }
              {
                this.microphone()
              }
            </View>
          }
          containerStyle={{
            backgroundColor: '#f2f2f2',
            justifyContent: 'space-around',
          }}
          />
          <ScrollView
            style={styles.container}
            ref="scrollView"
            onContentSizeChange={(w, h) => {
              this.currHeight = h;
              if (
                this.prevHeight > 0 &&
                this.currHeight - this.scrollHeight > this.prevHeight
              ) {
                this.scrollHeight += this.currHeight - this.prevHeight;
                this.prevHeight = this.currHeight;
                this.scrollToBottom();
              }
            }}
            onLayout={ev => {
              const fixedContentHeight = ev.nativeEvent.layout.height;
              this.prevHeight = fixedContentHeight;
            }}
          >
            <FlatList style={styles.list}
              vertical
              data={this.props.state.messages}
              extraData={this.props.state}
              keyExtractor= {(item, index) => index.toString()}
              renderItem={(message) => {
              const item = message.item;
              let emisor_id = parseInt(item.emisor_id);
              let inMessage = item.type === 'in';
              if (emisor_id==user_id) {
                inMessage = false
              }else {
                inMessage = true
              }
              let mensaje_string  = "";
              let mensaje_string_  = "";

              if (item.extension==0) {
                if (item.type=="text") {
                  mensaje_string  = item.mensaje_app?item.mensaje_app:'Vacío';
                  mensaje_string_ = <Text>{mensaje_string}</Text>
                }else if (item.type=="audio"){
                  mensaje_string  = item.mensaje_app?item.mensaje_app:'Vacío';
                  mensaje_string_ = <Text>{mensaje_string}</Text>
                }else if (item.type=="link"){
                  mensaje_string  = item.mensaje_app?item.mensaje_app:'Vacío';
                  mensaje_string_ = <Text onPress={()=>{Linking.openURL(mensaje_string)}}>
                  <Icon name="download" size={25} color="#aaa" />
                  </Text>
                }
              }else{
                let nuevo_contenido = "";
                if (item.extension=="jpg"   ||
                item.extension=="jpeg"  ||
                item.extension=="png"   ||
                item.extension=="gif") {
                  mensaje_string  =   item.mensaje_app?item.mensaje_app:'Vacío';
                  nuevo_contenido = <Text onPress={()=>{Linking.openURL(mensaje_string)}}>
                  <Image style={{width: 80, height: 80}} source={{uri: item.mensaje_app }} />
                  </Text>
                  //nuevo_contenido =  <Image source={item.mensaje_app} />
                }else if (item.extension=="pdf"   ||
                item.extension=="doc"   ||
                item.extension=="docx"  ||
                item.extension=="xls") {
                  mensaje_string  =   item.mensaje_app?item.mensaje_app:'Vacío';
                  nuevo_contenido =   <Text onPress={()=>{Linking.openURL(mensaje_string)}}>
                  <Icon name="download" size={25} color="#aaa" />
                  </Text>;
                }else {
                  nuevo_contenido =   item.mensaje_app;
                }

                mensaje_string_ = nuevo_contenido
              }

              let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
              return (
                <View style={[styles.item, itemStyle]}>
                  {!inMessage && this.renderDate(item.date)}
                  <View style={[styles.balloon]}>
                    {mensaje_string_}
                  </View>
                  {inMessage && this.renderDate(item.hora) }
                </View>
              )
            }}/>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput ref="textarea"
                style={styles.inputs}
                onChangeText={(text)=>{this.setState({mensaje:text});}}
                placeholder="Escribir mensaje..."
                underlineColorAndroid='transparent'
                value={this.state.mensaje}
              />
              { this.state.filler ? <View style={styles.filler}/> : null }
            </View>
            <TouchableOpacity onPress={this.handlerSend} >
              <View style={styles.btnSend}>
                <Icon name="send" size={20} color="#aaa" />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }else {
      return(
        <Loading/>
      )
    }

  }

}

const styles = StyleSheet.create({
  filler:{
    height: 'Keyboard Height'
  },
  container:{
    flex:1
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
});
