import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners'
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useCustomFonts } from './src/hooks/useCustomFonts';
import themeContext from './src/themes/themeContext';
import { theme } from './src/themes/theme';
import { MainNavigator } from './src/navigation';

export default function App() {
  const { fontsLoaded } = useCustomFonts();
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === "dark" ? true : false);

  useEffect(()=> {
    EventRegister.addEventListener("ChangeTheme", (data)=>{
      setDarkMode(data)
    })

    return ()=> {
      EventRegister.removeAllListeners();
    }
  }, [darkMode]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer>
        <StatusBar style='auto' />
        <MainNavigator />
      </NavigationContainer>
    </themeContext.Provider>
  );
}
