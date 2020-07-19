import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context as sprinklerContext}  from '../context/sprinklerContext';

export default TwoPanel = ({dt, style: Style})=>{
      const {data, update_control} = React.useContext(sprinklerContext);
      const {control_state} = data;
      return <FlatList 
      contentContainerStyle={{...style.view, ...Style}} horizontal={true} data={dt}
      keyExtractor={({text})=>{
            return text;
      }}
      showsHorizontalScrollIndicator={false}
       renderItem={({item})=>{
                  const {icon, text} = item;
            
                  return <TouchableOpacity style={{...style.folder, backgroundColor: control_state[text] ? '#ff7b00' : '#fefdfa'}} onPress={()=>{
                        let obj = {"state": false, "moisture": false, "timeout shut": false, "last on": false};
                        switch(text){
                              
                              case "last on":
                                    obj[text] = true;
                              case "state":
                                    obj[text] = true;
                              case "moisture":
                                    obj[text] = true;
                              case "timeout shut":
                                    obj[text] = true;
                        }
                        update_control(obj);
                  }} >
                  <View style={style.iconView}>{icon}</View>
                  <Text style={style.iconText}>{text.toUpperCase()}</Text>
                  </TouchableOpacity>
            }}/>
    
};

const style = StyleSheet.create({
      view: {
            paddingTop: 20,   
            paddingHorizontal: 20,
            backgroundColor: '#fefdfa',
            paddingBottom: 10,
            paddingBottom: 10,
            

      },
      folder: {
            height: 120,
            width: 155,
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
	      width: 0,
	      height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            
            elevation: 1      ,
            alignItems: 'center',
            marginRight: 30
      },
      iconView: {
            paddingTop: 15,
      },
      iconText:{
            fontWeight:'700',
            paddingTop: 15,
            letterSpacing: 4,
      }
});
