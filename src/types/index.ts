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