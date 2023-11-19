import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeContext } from "../../themes/themeContext"
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Favourites = () => {
  const theme = useThemeContext();
  const itemsList = useSelector((state: RootState)=>state.favourite.itemsList)  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundHex }]}>
      
    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})