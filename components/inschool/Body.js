import React, { Component } from 'react';
import { View } from 'react-native';
import Cards from './body/Cards';


class Body extends Component {
  render() {
    const menu = this.props.params.menu.items;
    return (
        <View>
          {
            menu.map((v,k) => {
              return (
                <Cards key={k} values={v}/>
              );
            })
          }
        </View>
    );
  }
}
export default Body;
