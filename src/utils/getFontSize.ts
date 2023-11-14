import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const getFontSize = (num: number)=> {
    return height * num;
}