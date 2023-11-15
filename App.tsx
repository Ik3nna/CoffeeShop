import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners'
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appearance } from 'react-native';
import { useCustomFonts } from './src/hooks/useCustomFonts';
import themeContext from './src/themes/themeContext';
import { theme } from './src/themes/theme';
import { MainNavigator } from './src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const { fontsLoaded } = useCustomFonts();
  const [darkMode, setDarkMode] = useState(false);

  const saveThemeMode = async (value: boolean) => {
    await AsyncStorage.setItem("theme", JSON.stringify(value));
  }

  const getTheme = async ()=> {
    const theme = await AsyncStorage.getItem("theme");
  
    try {
      if (theme) {
        const parsedTheme = JSON.parse(theme);
        setDarkMode(parsedTheme);
      }
    } catch (error) {
      console.log("error", error)
    }
  }  

  useEffect(()=> {
    getTheme();
  }, [])

  useEffect(()=> {
    EventRegister.addEventListener("ChangeTheme", (data)=>{
      setDarkMode(data);
      saveThemeMode(data);
    })

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      let data: boolean;

      if (colorScheme === "dark") {
        data = true;
        setDarkMode(data);
        saveThemeMode(data)
      } else {
        data = false;
        setDarkMode(false);
        saveThemeMode(data);
      }
    })

    return ()=> {
      EventRegister.removeAllListeners();
      subscription.remove();
    }
  }, [darkMode]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer>
        <StatusBar style={darkMode === true ? "light" : "dark"} />
        <MainNavigator />
      </NavigationContainer>
    </themeContext.Provider>
  );
}
