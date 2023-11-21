import { StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeContext } from "../../themes/themeContext";

const DisplayCard = ({ children, style }: { children: React.ReactNode, style?: any }) => {
  const theme = useThemeContext();

  return (
    <LinearGradient
      colors={[ theme.displayCardHex, theme.cardSubHex ]}
      locations={[0.0807, 0.9193]}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  )
}

export default DisplayCard

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "4%",
    paddingVertical: "2%",
  }
})