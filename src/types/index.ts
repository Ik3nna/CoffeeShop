import { NavigationProp, ParamListBase } from '@react-navigation/native'


// Navigation type
export type NavigationProps = {
    navigation: NavigationProp<ParamListBase>
}

// Icon type
export type IconProps = {
    [props: string]: any
}

// TopTabs type
export type TopTabsProps = {
    rightTab: any
}

// CoffeeCard type 
export type CoffeeCardProps = {
    image: any,
    name: string,
    rating?: number,
    ingredient: string,
    currency: string,
    price: string
}

// Button type
export type ButtonProps = {
    content: string,
    onClick?: ()=> void,
    bgColor: string,
    color: string,
    width?: number,
    height?: number,
    radius?: number,
    size?: number
}