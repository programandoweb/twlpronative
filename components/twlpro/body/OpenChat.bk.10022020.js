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
} from 'react-native';

import { Header } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Chat extends Component {

  currHeight = 0;
  prevHeight = 0;
  scrollHeight = 0;

  scrollToBottom = () => {
    this.refs.scrollView.getScrollResponder().scrollResponderScrollTo({
      x: 0,
      y: this.scrollHeight,
      animated: true
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filler: false,
      activo_teclado:"Desactivo",
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    //this.setState({filler: true,activo_teclado:"Activo"})
    setTimeout(() => this.refs.scrollView.scrollToEnd({animated: true}), 200);

  }

  _keyboardDidHide() {
    //this.setState({filler: false,activo_teclado:"Inactivo"})
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
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          barStyle="light-content" // or directly
          placement="left"
          centerComponent={{ text: this.props.state.chat.nombre_usuario, style: { color: '#111',fontSize:30 } }}
          leftComponent={{ type: 'font-awesome', icon: 'chevron-left', onPress: () => this.props.methods.sobre_escribir_el_estado({screen:"ListaChats"}) }}
          rightComponent={{ text: this.state.activo_teclado }}
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
                // console.log("--------------------------------------------");
                // console.log("Curr: ", this.currHeight);
                // console.log("Prev: ", this.prevHeight);
                // console.log("Scroll: ", this.scrollHeight);
                this.prevHeight = this.currHeight;
                // console.log("PREV: ", this.prevHeight);
                // console.log("--------------------------------------------");
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
              if (item.type=="text") {
                mensaje_string  = item.mensaje?item.mensaje:'Vacío';
                mensaje_string_ = <Text>{mensaje_string}</Text>
              }else if (item.type=="audio"){
                mensaje_string  = item.mensaje?item.mensaje:'Vacío';
                mensaje_string_ = <Text>{mensaje_string}</Text>
              }else if (item.type=="link"){
                mensaje_string  = item.mensaje?item.mensaje:'Vacío';
                mensaje_string_ = <Text onPress={()=>{Linking.openURL(mensaje_string)}}>
                                    <Icon name="download" size={25} color="#aaa" />
                                  </Text>
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
            <TextInput style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid='transparent'
                onChangeText={(name_address) => this.setState({name_address})}/>
            { this.state.filler ? <View style={styles.filler}/> : null }
          </View>
          <TouchableOpacity style={styles.btnSend}>
            <Image source={{uri:"https://png.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
          </TouchableOpacity>
        </View>
      </View>
    );
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
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
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
