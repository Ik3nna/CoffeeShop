import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { useThemeContext } from "../../themes/themeContext"
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const Home = () => {
  const theme = useThemeContext();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundHex }}>
      <StatusBar style='auto' />
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})