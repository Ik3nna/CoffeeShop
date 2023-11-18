import { NavigationProp, ParamListBase } from '@react-navigation/native'


// Navigation type
export type NavigationProps = {
    navigation: NavigationProp<ParamListBase>
}

// Icon type
export type IconProps = {
    [props: string]: any
}

// TopTab type
export type TopTabProps = {
    style?: any,
    item?: any
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

// FlashCard type
export type FlashCardProps = {
    w: number,
    h: number,
    borderRadius: number,
    icon?: any,
    size: number,
    font: string,
    bgColor: string,
    color: string,
    content: string,
    border?: string
}

// FavouriteList type
export type FavouriteListProps = {
    id: string,
    image: string,
    name: string,
    ingredients: string,
    special_ingredient: string,
    type: string,
    rating: number,
    count: string,
    roasted: string,
    description: string
}