import React, { Component } from 'react';
import { Text, View , KeyboardAvoidingView,StyleSheet,ScrollView } from 'react-native';
import { Card, Input , Button  } from 'react-native-elements';
import { ThemeProvider } from 'react-native-elements';
import Headers from './Headers';

const params  = {
  title:"InSchool",
  Credit:"Desarrollo ProgramandoWeb 2020",
  theme:{
    Button: {
      raised: true,
    },
  },
}

const theme =   params.theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class KeyboardAvoidingViewTest extends Component {
  constructor (args) {
    super(args)
    this.state = {
      loading: false,
      user: {},
      listaUsuario:[],
      listaMateriasProfesores:{},
      ajax:false,
      screen:"Home",
      messages:[],
      styles:styles,
      data_peticiones:[],
      socket:[],
      loading:false,
      tareas:{},
      add_Evaluaciones:{},
      upload:{},
    }
  }
  render(){
    return(
        <ThemeProvider theme={theme}>
          <KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>
            <ScrollView>
              <Headers methods={this} state={this.state} params={params} />
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
              <View><Input/><Text>ss</Text></View>
              <Input
                onChangeText={(text)=>{this.setState({login:text});}}
                placeholder='Nombre de Usuario'
                rightIcon={{ type: 'font-awesome', name: 'chevron-right' }}
                errorStyle={{ color: 'red' }}
                value={this.state.login}
              />
              <View><Text>ughuhuuihuhuihuhuihuhuih</Text></View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ThemeProvider>

    )
  }
}

export default KeyboardAvoidingViewTest
