import React, { Component } from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date:new Date(),
        mode:'date',
        show:false,
      };
    }

    onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      this.setState({show:Platform.OS === 'ios',date:currentDate})

      let date  = new Date( Date.parse(currentDate) );
      let day    =  date.getDate();
          if (day < 10) {
            day = "0"+day;
          }
      let month  =  date.getUTCMonth();
          if (month < 10) {
            month  =  month+1;
            month  =  "0"+month;
          }else {
            month  =  month+1;
          }

      let year   =  date.getUTCFullYear();
      let newDate = year+"-"+month+"-"+day;
      this.props.Object.setState({fecha:newDate})
    };

    showMode = currentMode => {
      this.setState({mode:currentMode,show:true})
    };

    showDatepicker = () => {
      this.showMode('date');
    };

    showTimepicker = () => {
      this.showMode('time');
    };

    render(){
      return(
        <View>
          <View style={{marginTop: 10, marginBottom: 10,}}>
            <Button onPress={this.showDatepicker} title="Seleccione la fecha" />
          </View>
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          )}
        </View>
      )
    }
  }

export default App;
