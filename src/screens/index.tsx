import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import { useThemeContext } from '../themes/themeContext'

const Custom = () => {
  const [darkMode, setDarkMode] = useState(true);
  const colors = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundHex }]}>
      <Text>Custom</Text>
      <Switch
        value={darkMode}
        onValueChange={(value)=>{
          setDarkMode(value);
          EventRegister.emit("ChangeTheme", value)
        }}
      />
    </View>
  )
}

export default Custom

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})