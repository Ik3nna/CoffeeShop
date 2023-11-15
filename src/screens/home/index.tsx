import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from "../../themes/themeContext"
import React from 'react'
import TopTabs from '../../components/topTabs';
import Icon from '../../components/icons';

const { width, height } = Dimensions.get("window");

const Home = () => {
  const theme = useThemeContext();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundHex }]}>
      <TopTabs 
        rightTab={
          <TouchableOpacity>
            <Icon type="ionicons" name="ios-people-outline" size={24} color={theme.textHex} style={styles.icons} />
          </TouchableOpacity>
        }
      />
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  icons: {
    opacity: 0.4
  }
})