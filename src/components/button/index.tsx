import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ButtonProps } from '../../types'

const Button = ({ content, onClick, bgColor, color, size, radius, width, height }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onClick ? onClick : undefined} style={[styles.container, { borderRadius: radius, backgroundColor: bgColor, height: height, width: width }]}>
      <Text style={[styles.text, { color: color, fontSize: size }]}>{content}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }, 
    text: {
        fontFamily: "poppins_semibold",
    }
})