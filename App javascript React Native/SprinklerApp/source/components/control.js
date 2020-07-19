import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import OnAndOff from '../components/on&off';
import {Context as sprinklerContext}  from '../context/sprinklerContext';
import {Context as dataContext}  from '../context/dataContext';
import { useNavigation } from '@react-navigation/native';


export default Control = ({state, onclick, Style})=>{
      const {data} = React.useContext(sprinklerContext);
      const navigation = useNavigation();

      return <View style={{...style.view, ...Style}}>
            <OnAndOff state={data["state"]} onclick={()=>{

            }} style={style.item} />
            <TouchableOpacity>
                  <Icon name="wifi-tethering" size={50}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                   navigation.navigate("setting");
            }}>
                  <Icon1 name="settings-outline" size={50}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                  navigation.navigate("graph")
            }}>
                  <Icon2 name="line-graph" size={50}/>
            </TouchableOpacity>
      </View>
    
};

const style = StyleSheet.create({
      view: {
            height:70,
            flexDirection: 'row',
            //alignSelf:'stretch',
            justifyContent: 'space-evenly',
            marginTop: 4,
            backgroundColor: '#fefdfa',
            paddingVertical: 5
      },
      item : {
            
      }

});
 