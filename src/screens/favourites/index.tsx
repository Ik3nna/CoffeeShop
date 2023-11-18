import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeContext } from "../../themes/themeContext"
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Favourites = () => {
  const theme = useThemeContext();
  const itemsList: any = useSelector((state: RootState)=>state.favourite)

  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundHex }]}>
      {itemsList?.map((item: any)=> (
        <Text style={{ color: theme.textHex }}>
          {item.name}
        </Text>
      ))}
    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})