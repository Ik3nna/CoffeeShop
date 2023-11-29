import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlashCardProps } from '../../types'

const FlashCard = ({ w, h, borderRadius, icon, size, font, bgColor, color, content, border }: FlashCardProps) => {
  return (
    <View 
      style={[
        styles.container, 
        { 
          width: w, 
          height: h, 
          borderWidth: border ? 2 : undefined, 
          borderColor: border, 
          borderRadius: borderRadius, 
          backgroundColor: bgColor, 
          rowGap: icon ? 2 : 0 
        }
      ]}
    >
      {icon && icon}
      <Text style={{ color: color, fontSize: size, fontFamily: font }}>{content}</Text>
    </View>
  )
}

export default FlashCard

const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
})