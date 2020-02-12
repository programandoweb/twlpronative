import React, { Component } from 'react';
import { ScrollView, View , Text } from 'react-native';
import Cards from './Cards';
class ListaChats extends Component {
  render() {
    return (
      <ScrollView>
        {
          this.props.listaUsuario.map((v,k) => {
            return (
              <Cards method={this.props.method} key={k} values={v}/>
            );
          })
        }
      </ScrollView>
    );
  }
}
export default ListaChats;
