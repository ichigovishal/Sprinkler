import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Context as sprinklerContext}  from '../context/sprinklerContext';
import {Context as dataContext}  from '../context/dataContext';
import json from '../api/server';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
      
    >
      {props.children}
    </Animated.View>
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
      const {update, data: context} = React.useContext(sprinklerContext);
      const {data: context2} = React.useContext(dataContext);
      if (context2.length != 0) {
            useEffect(()=>{
                  if (context2[0]["on_since"] > context2[0]["last_on"])
                        update({state: ""})
                  else if(context2[0]["status_of_sprinkler"])
                        update({state: 'True'})
                  else
                        update({state: 'False'})
                  
            }, [])
      }
      else{
            useEffect(()=>{},[]);
      }
      
  return (

      <TouchableOpacity onPress={()=>{
            
            if (context.state != ''){
                  update({state: context.state == 'True' ? 'False': 'True'})
                json.post('http://test.yadavshome.xyz:81/api/actions/', {
                      type: 102,
                      state: context.state == 'True' ? false : true
                }).catch(err=>{
                      console.log(err);
                });
            };
      }}>
      <FadeInView style={{...style.view, backgroundColor: context["state"] == 'True' ? '#a9d171' : context["state"] == 'False' ? '#be2535' : '#b8bfc2'}}>
        <Icon name="poweroff" style={style.icon} size={50} />
      </FadeInView>
      </TouchableOpacity>
  )
}

const style = StyleSheet.create({
      view: {
            width: 65,
            height: 65,
            borderRadius: 100/2,
            
            
      },
      icon : {
            marginLeft:7,
            marginTop: 7
      }
})