import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider as SprinklerProvider}  from './source/context/sprinklerContext';
import {Provider as DataProvider}  from './source/context/dataContext';
import {Provider as SettingProvider}  from './source/context/settingContext';
import {Provider as GraphProvider}  from './source/context/graphContext';
import mainScreen from './source/screeen/main';
import graphScreen from './source/screeen/graph';
import SettingScreen from './source/screeen/setting';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="main"
      component={mainScreen}
      options={{
          title: 'Sprinkler',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            //fontWeight: 'bold',
          }
        }}/>
        <Stack.Screen name="graph"
      component={graphScreen}
      options={{
          title: 'heu',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            //fontWeight: 'bold',
          }
        }}/>
         <Stack.Screen name="setting"
      component={SettingScreen}
      options={{
          title: '',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            //fontWeight: 'bold',
          }
        }}/>
       </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default ()=>{
  return <GraphProvider>
    <SettingProvider>
    <DataProvider>
    <SprinklerProvider>
    <App/>
  </SprinklerProvider>
  </DataProvider>
  </SettingProvider>
  </GraphProvider>
};