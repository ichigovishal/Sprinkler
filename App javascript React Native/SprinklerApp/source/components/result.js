import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default Result = ({data, symbol, style: Style})=>{
      return <View style={{...style.view, ...Style}}>
            <Text style={style.data}>{data}</Text>
            <Text style={style.symbol}>{symbol}</Text>
      </View>
    
};

const style = StyleSheet.create({
      view: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 3,
            backgroundColor: '#fefdfa',
            flexDirection: 'row',            
      },
      symbol: {
            position: 'relative',
            left: 5,
            bottom: 66,
            fontSize: 30,
            fontWeight: '500'
      },
      data: {
            fontSize: 124,
            fontWeight: '400',
      }
});
 