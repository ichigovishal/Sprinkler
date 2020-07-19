import React, {useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import { Calendar } from "react-native-calendars"
import {Context as graphContext}  from '../context/graphContext';

export default CalendarCompo = ()=>{
      const {data:buffer, sync} = React.useContext(graphContext);
      const {time_data: data, on_date} = buffer;
      const checkDate = (date_var)=>{
            sync(date_var.dateString);
      }
      useEffect(()=>{
            const date = new Date;
            sync(`${date.getFullYear()}-${date.getMonth() >= 9 ? (date.getMonth() + 1 ): '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`);
      }, [])
      return <Calendar
      markedDates={{
            [String(on_date)] : {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#339dd6',
            selectedTextColor: 'white'
      } }}

      style={style.view}
      // Initially visible month. Default = Date()
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={'2012-05-10'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={new Date()}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {checkDate(day);}}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {checkDate(day);}}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      theme={{
            backgroundColor: 'rgba(255,255,255,0.0)',
            calendarBackground: 'rgba(255,255,255,0.0)',
            textSectionTitleColor: 'rgba(0,0,0,0.6)',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: 'rgba(255,255,255,1)',
            textDisabledColor: 'rgba(255,255,255,0.6)',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'white',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'white',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
      }}
/>
}

const style = StyleSheet.create({
      view : {
       

      }
})