import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import {Back} from './../../helpers/Functions';


class Topbar extends Component {

  back=()=>{
    if (this.props.back!=undefined) {
      return  <Icon name="chevron-left"  size={18} color="#333"/>
    }
  }

  add=()=>{
    if (this.props.add!=undefined) {
      return  <TouchableOpacity style={{alignContent: 'center', alignSelf: 'center',flex: 0.1,}} onPress={()=>this.props.methods.sobre_escribir_el_estado({screen:this.props.add,add_Evaluaciones:{}})}>
                <Icon name="plus-circle"  size={26} color="#333"/>
              </TouchableOpacity>
    }
  }

  handleClick=()=>{
    Back(this.props.props)
    //this.props.methods.sobre_escribir_el_estado({screen:this.props.back})
  }

  render() {
    let props  = this.props.props;
    return (
      <View style={{height: 50,}}>
        <View style={{  flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: "#f2f2f2",
                      }}>
          <TouchableOpacity style={{flex: 0.9,}} onPress={() => this.handleClick() }>
            <View style={{  flex: 1, flexDirection: 'row', }}>
              <View style={{flex: 0.05, paddingTop: 16, paddingLeft: 18, }}>
                {this.back()}
              </View>
              <View style={{flex: 0.9, paddingTop: 11, paddingLeft: 10, height: 50, }}>
                <Text style={{fontSize: 18}}>
                  {this.props.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {this.add()}
        </View>
      </View>
    )
  }
}
export default Topbar;
