import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import themeContext from './src/themes/themeContext';
import { theme } from './src/themes/theme';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(()=> {
    const listener = EventRegister.addEventListener("ChangeTheme", (data)=>{
      setDarkMode(data)
    })

    return ()=> {
      EventRegister.removeAllListeners();
    }
  }, [darkMode]);

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer>
        <StatusBar style='dark' />
        {/* <Custom /> */}
      </NavigationContainer>
    </themeContext.Provider>
  );
}
