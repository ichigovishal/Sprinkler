import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View, Button, Text, Dimensions, TouchableOpacity} from 'react-native';
import { BarChart } from "react-native-chart-kit";


export default  LineGraph = ({data})=>{
  return <BarChart
  data={{
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }
    ]
  }}
  width={Dimensions.get("window").width * 0.98} // from react-native
  height={Dimensions.get("window").height * 0.35}
  yAxisLabel="$"
  yAxisSuffix="k"
  yAxisInterval={1} // optional, defaults to 1
  chartConfig={{
      backgroundGradientFrom: "rgb(255, 255, 255)",
      backgroundGradientTo: "rgb(255, 255, 255)",
      backgroundGradientFromOpacity: 0.2,
      backgroundGradientToOpacity: 0.2,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "1",
      stroke: "#ffa726"
    }
  }}
  bezier
  style={{
borderRadius: 16,
marginVertical:10
  }}
/> 

}