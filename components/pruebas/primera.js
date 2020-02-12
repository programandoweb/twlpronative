class Screen_1 extends Component {

  static navigationOptions =
    {
      title: 'First Activity',
      headerTransparent: true,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'rgba(0,0,0,0.3)'
      }
    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }

  render() {

    return (

      <View style={styles.Container_screen_1}>

        <Text style={styles.text}>First Screen Activity.</Text>

        <Button onPress={this.gotoNextActivity} title='Open Second Activity' />

      </View>
    );
  }
}
