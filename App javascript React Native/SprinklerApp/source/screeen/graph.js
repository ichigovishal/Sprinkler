import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LineGraph from '../components/linegraph';
import Calendar from '../components/calender';
import {Context as graphContext}  from '../context/graphContext';

export default graphScreen = ({navigation})=>{
      const {data:buffer, sync} = React.useContext(graphContext);
      const {time_data: data, on_date} = buffer;
      navigation.setOptions({
            title: "",
            headerTitleAlign : {
                  alignSelf: 'center',
                  
            },
            headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  backgroundColor: "#fb8c00",
            },
            headerTitleStyle: {
                  fontWeight: '600',
                  letterSpacing: 5,
                  paddingTop: 10,
                  fontSize: 27
            },
            backButton: {
                  color: 'red'
            }
      })
      return <View style={Style.screen}>
            { data.length < 1 ? 
             <View style={{
                  flex: 1,
                  alignItems:'center',
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 16,
                  marginHorizontal: 10,
                  alignSelf: 'stretch',
               }}> 
            <Text style={{
                  color: 'white',
                  fontWeight: '600'
                  }}>
            Loading....
            </Text>
             </View>
             :<LineGraph data={data} />
            }

       
      <View style={Style.bottom}>
      <Calendar />
      </View>
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
            backgroundColor: "#fb8c00",
            alignItems: 'center'
            
      },
      error:{
            flex: 10,
            alignItems: 'center',
      },
      bottom: {
            
            alignSelf: 'stretch',
            backgroundColor: "#fb8c00",
            marginTop: 1,
            borderRadius: 10,
            marginTop: 2,
            backgroundColor:  "rgba(255, 255, 255, 0.3)"

      },
      container: {
           
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            
      }
  
     
})