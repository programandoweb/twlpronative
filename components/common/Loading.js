import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text,  View,} from 'react-native'

class Loading extends Component {

  render() {
    let props  = this.props.props;
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

}
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
