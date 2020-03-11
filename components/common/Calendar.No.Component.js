import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = (e) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

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
    console.log(e);
    //setState({fecha:newDate})
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View style={{marginTop: 10, marginBottom: 10,}}>
        <Button onPress={showDatepicker} title="Seleccione la fecha" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default App;
