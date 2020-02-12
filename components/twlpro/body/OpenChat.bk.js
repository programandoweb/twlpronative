import React, { Component } from 'react';
import { ScrollView, View , Text , Dimensions } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-render-html';
import Textarea from 'react-native-textarea';
import Voicer from './Voice';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class OpenChat extends Component {
  render() {
    let chats   =   this.props.state.messages
    let yo      =   this.props.state.user
    let user_id =   parseInt(yo.user_id);
    return (
      <View >
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        placement="left"
        centerComponent={{ text: this.props.state.chat.nombre_usuario, style: { color: '#111',fontSize:30 } }}
        leftComponent={{ type: 'font-awesome', icon: 'chevron-left', onPress: () => this.props.methods.sobre_escribir_el_estado({screen:"ListaChats"}) }}
        containerStyle={{
          backgroundColor: '#f2f2f2',
          justifyContent: 'space-around',
        }}
        />
        <ScrollView>
          {
            chats.map((v,k) => {
              if (v.mensaje!="") {
                let emisor_id = parseInt(v.emisor_id);
                let style       = {}
                let style_text  = {}
                if (emisor_id==user_id) {
                  style       = {marginBottom:1, paddingTop:15 , paddingBottom:15,paddingLeft:35,paddingRight:10 }
                  style_text  = {backgroundColor: '#dcf8c6',padding:15}
                  console.log(emisor_id);
                  console.log(user_id);
                }else {
                  style       = {marginBottom:1, paddingTop:15 , paddingBottom:15,paddingLeft:10,paddingRight:35 }
                  style_text  = {backgroundColor: '#f2f2f2',padding:15}
                }
                if (v.type=="text") {
                  return (
                    <View key={k} style={style}>
                      <Text style={style_text}>{v.mensaje}</Text>
                    </View>
                  );
                }else if (v.type=="audio"){
                  return (
                    <View key={k} style={style}>
                      <Text style={style_text}>{v.type}</Text>
                    </View>
                  )
                }else if (v.type=="link"){
                  return (
                    <View key={k} style={style}>
                      <Text style={style_text}>{v.mensaje}</Text>
                    </View>
                  )
                }
              }
            })
          }
        </ScrollView>
        <View style={{ padding:25 }}>
        </View>
        <View style={{ flex: 1, backgroundColor: '#f2f2f2', position:'fixed', top:HEIGHT-50,  left:0, right:0 }}>
          <View style={{ flex: 1, flexDirection: 'row', padding:5 }}>
            <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
              <Textarea
                maxLength={120}
                placeholder={'Escribe un mensaje aquí...'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                style={{backgroundColor: '#fff',  borderColor: '#d2d2d2', borderWidth: 1, borderRadius: 10, height:40, padding:5}}
              />
            </View>
            <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
              <Text style={{ flex: 1, color: '#fff',paddingTop:5,paddingLeft:5,paddingRight:5 }}>
                <Icon name="microphone" size={25} color="#aaa" />;
              </Text>
            </View>
            <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
              <Text style={{ flex: 1, color: '#fff',paddingTop:5,paddingLeft:5,paddingRight:5 }}>
                <Icon name="paperclip" size={25} color="#aaa" />;
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default OpenChat;


///<uses-permission android:name="android.permission.RECORD_AUDIO" />
