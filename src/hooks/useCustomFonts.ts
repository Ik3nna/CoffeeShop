import { useFonts } from 'expo-font';
import { customFonts } from '../utils/fonts';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts(customFonts);

  return {
    fontsLoaded
  };
};