import { createContext, useContext } from "react";

const themeContext = createContext<any>(null);

export const useThemeContext = ()=>{
  return useContext(themeContext);
} 

export default themeContext;


