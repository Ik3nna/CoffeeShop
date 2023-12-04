import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { InputProps } from '../../types'
import { getFontSize } from '../../utils/getFontSize';
import { useThemeContext } from '../../themes/themeContext';

const { width } = Dimensions.get("window");

const Input = ({ placeholder, value, onChange, onBlur, error, errorWidth, ...props }: InputProps) => {
  const theme = useThemeContext();

  return (
    <View>
      <TextInput 
        style={[styles.input, { color: theme.subTextHex, borderBottomColor: theme.subTextHex }]}
        placeholder={placeholder}
        placeholderTextColor={theme.subTextHex}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        {...props}
      />
      {error && <Text style={[styles.error, { width: errorWidth ? errorWidth : null, color: theme.danger }]}>{error}</Text>}
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 2,
    paddingVertical: "3%", 
    fontFamily: "poppins_light",
    opacity: 0.4,
    fontSize: getFontSize(0.028),
  },
  error: {
    fontFamily: "poppins_semibold",
    paddingVertical: "1%",
    fontSize: getFontSize(0.015)
  }
})