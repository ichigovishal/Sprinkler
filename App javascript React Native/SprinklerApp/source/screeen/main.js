import React, { useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import TwoPanel from '../components/twoPanel';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Result from '../components/result';
import Control from '../components/control';
import Icon2 from 'react-native-vector-icons/Entypo';
import {Context as sprinklerContext}  from '../context/sprinklerContext';
import {Context as dataContext}  from '../context/dataContext';



export default mainScreen = ({navigation})=>{
      
      navigation.setOptions({
            title: "Sprinkler's Control",
            headerTitleAlign : {
                  alignSelf: 'center',
                  
            },
            headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  backgroundColor: '#f8f8f8'

            },
            headerTitleStyle: {
                  fontWeight: '600',
                  letterSpacing: 5,
                  paddingTop: 10,
                  fontSize: 27
            }
      })
      const {control_state} = React.useContext(sprinklerContext)["data"];
     const {data, get_data} =  React.useContext(dataContext);
     useEffect(()=>{
            get_data(1);
      })
      const displayResult = ()=>{
            const dt = data[0]
            if (control_state["state"]) {
                  return {symbol:'', data : dt['status_of_sprinkler'] ? 'ON': 'OFF'};
            }
            else if (control_state["last on"]) {
                  time = new Date(dt['last_on']*1000);
                  days = ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'  ]
                  console.log(time.getUTCHours())
                  return {symbol: days[time.getDay() - 1], data : `${time.getHours()}:${time.getMinutes()}`};
            }
            else if (control_state["timeout shut"]){
                  return {symbol: '', data : dt["was_closed_overtime"] ? 'YEP' : 'NO'};
            }
            else return {symbol: '%', data : dt["moisture_reading"].toFixed(2)};
      }
      return <View style={Style.screen}>
            <View style={Style.header}/>
        
            <TwoPanel 
            style={Style.TwoPanel}
             dt={[{
                  "icon" : <Icon1 name="timeline-clock" size={55}/>,
                  "text": "last on"
            },
            {
                  "icon" : <Icon1 name="sprinkler-variant" size={55}/>,
                  "text": "state"
            },
            {
                  "icon" : <Icon name="water" size={55}/>,
                  "text": "moisture"
            },
            {
                  "icon" : <Icon2 name="warning" size={55}/>,
                  "text": "timeout shut"
            }
            ]} />
            { data.length == 0  ? <View style={Style.error}><Text>Getting Data..</Text></View>: <Result style={Style.Result} symbol={displayResult()["symbol"]} data={displayResult()["data"]} /> }
            <Control
             //Style={{flex : 2}}
              onclick={()=>{
                  setstate("True");
            }}/>
     
          
      </View>

}

const Style = StyleSheet.create({
      header :{
            alignSelf:'stretch',
            height : 50,
            backgroundColor: '#f8f8f8'
      },
      screen:{
            flex: 1,
            flexDirection: 'column',
            height: Dimensions.get("window").height
            
      },
      error:{
            flex: 1,
            alignItems: 'center',
      },
      TwoPanel:{
            height: Dimensions.get("window").height * 0.3
      },
      Result:{
            height: Dimensions.get("window").height * 0.4

            
      }
  
     
})