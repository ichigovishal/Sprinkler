import React, {useEffect} from 'react';
import {StyleSheet, View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import {Context as settingContext}  from '../context/settingContext';
import jsonServer from '../api/server';

const SettingScreen = ({navigation})=>{
      const {data, update, sync} = React.useContext(settingContext);
      useEffect(()=>{
            sync()
      }, [])
      navigation.setOptions({
            title: "",
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

      return <View style={style.view}>
            <View style={style.heading_container}>
                  <Text style={style.heading}>Sprinkler Setting</Text>
            </View>
            <View style={style.container}>
            <Text 
            style={style.text}
            >
                  Sprinkler Port
            </Text>
            <TextInput
             style={style.input}
             keyboardType='number-pad'
             value={data["sprinkler_port"] != undefined ?  String(data["sprinkler_port"]) : ''}
             onChangeText={(newValue)=>{
                  update({sprinkler_port: Number(newValue)})
             }}
              />
            </View>
            <View style={style.container}>
            <Text 
            style={style.text}
            >
                  Approximation Total Interval
            </Text>
            <TextInput
             style={style.input}
             keyboardType='numeric'
             value={data["approximation_total_interval"] != undefined ?  String(data["approximation_total_interval"]) : ''}
             onChangeText={(newValue)=>{
                  update({approximation_total_interval: Number(newValue)})
             }}
              />
            </View>
            <View style={style.container}>
            <Text 
            style={style.text}
            >
                  Minimum Moisture Level
            </Text>
            <TextInput
             style={style.input}
             keyboardType='decimal-pad'
             value={data["minimum_moisture_level"] != undefined ? String(data["minimum_moisture_level"]) : ''}
             onChangeText={(newValue)=>{
                  update({minimum_moisture_level: Number(newValue)})
             }}
              />
            </View>
            <View style={style.container}>
            <Text 
            style={style.text}
            >
                  Check After Hours
            </Text>
            <TextInput
             style={style.input}
             keyboardType='number-pad'
             value={data["check_after_hours"] != undefined ? String(data["check_after_hours"]) : ''}
             onChangeText={(newValue)=>{
                  update({check_after_hours: Number(newValue)})
             }}
              />
            </View>
            <View style={style.container}>
            <Text 
            style={style.text}
            >
                 Time After Which Shutdown
            </Text>
            <TextInput
             style={style.input}
             keyboardType='number-pad'
             value={data["time_after_which_shutdown"] != undefined ?  String(data["time_after_which_shutdown"]) : ''}
             onChangeText={(newValue)=>{
                  update({time_after_which_shutdown: Number(newValue)})
             }}
              />
            </View>
            <TouchableOpacity style={style.buttonContainer}
            onPress={()=>{
            jsonServer.post('http://test.yadavshome.xyz:81/api/actions/', {
                      type: 101,
                      ...data
                }).catch(err=>{
                      console.log(err);
                }).finally(()=>{
                      sync();
                });

            }}
            >
                  <Text style={style.button}>Save Changes</Text>
            </TouchableOpacity>
            
      </View>
}

const style = StyleSheet.create({
      view: {
            flex: 1,
            paddingVertical: 30,
            backgroundColor: '#f8f8f8',

      },
      heading_container:{
            justifyContent: 'center',
            alignItems:'center',
            borderColor: 'black',
            borderBottomWidth: 2,
            paddingBottom:15
      },
      heading:{
            letterSpacing: 4,
            fontWeight: '700',
            fontSize: 25
      },
      input : {
            borderColor: 'black',
            borderWidth: .3,
            fontSize: 15,
            height: 30,
            paddingVertical: 0,
            paddingHorizontal: 15,      
      },
      text: {
            fontSize: 17,
            fontWeight: '600',
            marginRight: 20,
            letterSpacing: 3,
      },
      container : {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'stretch',
            borderColor: 'black',
            borderBottomWidth: 0.5,
            paddingBottom:15,
            marginTop: 10,
            paddingHorizontal: 10
            
      },
      buttonContainer:{
            backgroundColor: '#ff7b00',
            shadowColor: "#000",
            shadowOffset: {
	      width: 0,
	      height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.50,
            marginBottom: 10,
            elevation: 1      ,
            alignItems: 'center',
            alignSelf: 'center',
            paddingHorizontal:20,
            paddingVertical: 15,
            marginTop: 30,
      },
      button:{
            letterSpacing:5,
            fontWeight:'600'
      }
});

export default SettingScreen;