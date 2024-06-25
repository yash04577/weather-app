import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/AppNavigator'
import Home from './src/screens/homescreen/Home'

type Props = {}

const App = (props: Props) => {
  return (
    // <AppNavigator />
    <Home />
  )
}

export default App

const styles = StyleSheet.create({})