import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/homescreen/Home'

type Props = {}

const Stack = createNativeStackNavigator();

const AppNavigator = (props: Props) => {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} />
        </Stack.Navigator>
    </NavigationContainer>
    // <Text>Hiiiiiiiii</Text>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})