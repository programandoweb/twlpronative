import React, { Component } from 'react';
import { View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';

class Topbar extends Component {

  back=()=>{
    if (this.props.back!=undefined) {
      return <TouchableOpacity onPress={()=>this.props.methods.sobre_escribir_el_estado({screen:this.props.back})}>
                <View style={{marginLeft: 12}} >
                  <Icon name="chevron-left"  size={25} color="#333"/>
                </View>
             </TouchableOpacity>
    }
  }

  add=()=>{
    if (this.props.add!=undefined) {
      return <TouchableOpacity onPress={()=>this.props.methods.sobre_escribir_el_estado({screen:this.props.add,add_Evaluaciones:{}})}>
        <View style={{marginRight: 20}} >
          <Icon name="plus-circle"  size={30} color="#333"/>
        </View>
      </TouchableOpacity>
    }
  }

  render() {
    let props  = this.props.props;
    return (
      <Header
        containerStyle={{
          backgroundColor: '#f2f2f2',
          justifyContent: 'space-around',
        }}
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content"
        placement="left"
        centerComponent={{ text:this.props.name, style: { color: '#111',fontSize:20 } }}
        leftComponent={
          this.back()
        }
        rightComponent={
          this.add()
        }
      />
    )
  }
}
export default Topbar;
