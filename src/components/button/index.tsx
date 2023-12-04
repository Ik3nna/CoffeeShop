import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ButtonProps } from '../../types'
import { useThemeContext } from '../../themes/themeContext'

const Button = ({ content, onClick, bgColor, color, size, radius, width, height, loading }: ButtonProps) => {
  const theme = useThemeContext();
  
  return (
    <TouchableOpacity 
      onPress={onClick ? onClick : undefined} 
      style={[
        styles.container, 
        { 
          borderRadius: radius, 
          backgroundColor: loading ? theme.primaryRGBA : bgColor, 
          height: height, 
          width: width 
        }
      ]}
    >
      {loading && <ActivityIndicator color={loading ? theme.activeHex : theme.textHex} style={styles.loading} />}
      <Text style={[styles.text, { color: color, fontSize: size }]}>{content}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    }, 
    loading: {
      paddingRight: 7
    },
    text: {
      fontFamily: "poppins_semibold",
    }
})