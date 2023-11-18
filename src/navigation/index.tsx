import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CART, CART_ITEM, FAVOURITES, HOME, MAIN, ORDER_HISTORY, PAYMENT, SPLASH } from '../constants/routeName';
import { View, StyleSheet } from 'react-native';
import Splash from '../screens/splash';
import Payment from '../screens/payment';
import CartItem from '../screens/cart-item';
import Home from '../screens/home';
import Cart from '../screens/cart';
import Favourites from '../screens/favourites';
import OrderHistory from '../screens/order-history';
import { useThemeContext } from "../themes/themeContext"
import Icon from '../components/icons';
import { BlurView } from 'expo-blur';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator () {
  const theme = useThemeContext();

  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            let type;
            if (route.name === HOME) {
              iconName = "home";
              type = "foundation";
              size = focused ? 27 : 25;
            } else if (route.name === CART)  {
              iconName = "shopping-bag";
              type = "font-awesome5";
              size = focused ? 27 : 25;
            } else if (route.name === FAVOURITES) {
              iconName = "favorite";
              type = "material-icons";
              size = focused ? 27 : 25;
            } else {
              iconName = "ios-notifications";
              type = "ionicons";
              size = focused ? 27 : 25;
            }
            return(
              <View>
                <Icon type={type} name={iconName} size={size} color={color} />
              </View>
            )
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.activeHex,
        tabBarInactiveTintColor: theme.inactiveIconsHex,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { 
          position: "absolute", 
          backgroundColor: theme.tabBgHex, 
          elevation: 0, 
          borderTopColor: 'transparent',
          shadowColor: 'transparent'
        },
        tabBarBackground: ()=> (
          <BlurView intensity={15} blurReductionFactor={100} style={styles.blur} />
        )
        })
      }
    >
      <Tab.Screen name={HOME} component={Home} options={{ headerShown: false }} />
      <Tab.Screen name={CART} component={Cart} options={{ headerShown: false }} />
      <Tab.Screen name={FAVOURITES} component={Favourites} options={{ headerShown: false }} />
      <Tab.Screen name={ORDER_HISTORY} component={OrderHistory} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export function MainNavigator () {
  const theme = useThemeContext();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false, 
        animation: "slide_from_bottom", 
      }
    }>
      <Stack.Screen name={SPLASH} component={Splash} options={{ contentStyle: { backgroundColor: theme.backgroundHex  }}} />
      <Stack.Screen name={MAIN} component={BottomTabNavigator} />
      <Stack.Screen name={PAYMENT} component={Payment} options={{ contentStyle: { backgroundColor: theme.backgroundHex  }}} />
      <Stack.Screen name={CART_ITEM} component={CartItem} options={{ contentStyle: { backgroundColor: theme.backgroundHex  }}} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})