import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View, Switch, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeContext } from '../../themes/themeContext';
import { TopTabsProps } from '../../types';
import { useRoute } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import { CART_ITEM, PAYMENT } from '../../constants/routeName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../icons';

const { width, height } = Dimensions.get("window");

const getTheme = async ()=> {
  const theme = await AsyncStorage.getItem("theme");

  try {
    if (theme) {
      const parsedTheme = JSON.parse(theme);
      return parsedTheme
    }
  } catch (error) {
    console.log("error", error)
  }

  return null
}  

const TopTabs = ({ rightTab }: TopTabsProps) => {
  const theme = useThemeContext();
  const route = useRoute();
  const [darkMode, setDarkMode] = React.useState<boolean>();

  const toggleMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    EventRegister.emit("ChangeTheme", newValue);
  };

  useEffect(()=>{
    const fetchData = async () => {
      const parsedTheme = await getTheme();
      setDarkMode(parsedTheme);
    };

    fetchData();
  },[])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[ theme.secondarySubBgHex, theme.backgroundHex]}
        locations={[0.0428, 0.9352]}
        style={[styles.left_tab, { borderColor: theme.secondarySubBgHex }]}
      >
        {
          route.name === PAYMENT || route.name === CART_ITEM 
          ? 
            <Icon type="feather" name="chevron-left" size={25} color={theme.arrowHex} />
          : 
          <TouchableOpacity onPress={toggleMode} style={styles.toggle_btn}>
            {
              darkMode ?
                <Icon type="feather" name="sun" size={24} color={theme.textHex} style={[styles.btn, { opacity: darkMode ? 0.2 : 1 }]} /> :
                <Icon type="octicons" name="moon" size={24} color={theme.textHex} style={[styles.btn, { opacity: darkMode ? 0.2 : 1 }]} />
            }
          </TouchableOpacity>
        }
      </LinearGradient>

      <LinearGradient
        colors={[ theme.secondarySubBgHex, theme.backgroundHex]}
        locations={[0.0428, 0.9352]}
        style={[styles.right_tab, { borderColor: theme.secondarySubBgHex }]}
      >
        {rightTab}
      </LinearGradient>
    </View>
  )
}

export default TopTabs

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "3%",
    paddingHorizontal: "4%"
  },
  left_tab: {
    borderWidth: 1,
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 3
  },
  toggle_btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    opacity: 0.2
  },
  right_tab: {
    borderWidth: 1,
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 3,
    justifyContent: "center",
    alignItems: "center",
  }
})