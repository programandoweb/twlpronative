import React, { Component } from 'react';
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {Back} from './../../helpers/Functions';


class Topbar extends Component {
  constructor (args) {
    super(args)
    this.state = {
      q: "",
    }
  }

  render() {
    let props  = this.props.props;
    return (
      <View style={{height: 50,}}>
        <View style={{  flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: "#f9f9f9",
                      }}>
          <Input
            containerStyle={{flex: 0.9,}}
            onChangeText={(text)=>{this.setState({q:text});}}
            placeholder='Nombre de Usuario'
            rightIcon={{ type: 'font-awesome', name: 'search' }}
            errorStyle={{ color: 'red' }}
            value={this.state.q}
          />
        </View>
      </View>
    )
  }
}
export default Topbar;
