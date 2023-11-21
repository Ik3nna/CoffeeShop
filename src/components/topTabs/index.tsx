import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeContext } from '../../themes/themeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import { CART_ITEM, PAYMENT } from '../../constants/routeName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../icons';
import { FavouriteListProps, TopTabProps } from '../../types';
import { favouriteActions } from '../../store/favourite-slice';
import { RootState } from '../../store';
import { getFontSize } from '../../utils/getFontSize';
import Toast from 'react-native-root-toast';

const { width, height } = Dimensions.get("window");

const getTheme = async ()=> {
  const theme = await AsyncStorage.getItem("theme");

  try {
    if (theme) {
      const parsedTheme = JSON.parse(theme);
      return parsedTheme
    }
  } catch (error) {
    console.log("error", error)
  }

  return null
}  

const TopTabs = ({ style, item, text }: TopTabProps) => {
  const theme = useThemeContext();
  const route = useRoute();
  const [darkMode, setDarkMode] = React.useState<boolean>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const itemsList = useSelector((state: RootState)=> state.favourite.itemsList);
  const [toggleHeart, setToggleHeart] = useState(
    itemsList.some((data: FavouriteListProps)=>data.id === item?.id) ? true : false
  );

  const data = {
    id: item?.id,
    image: item?.imagelink_portrait,
    name: item?.name,
    ingredients: item?.ingredients,
    special_ingredient: item?.special_ingredient,
    type: item?.type,
    rating: item?.average_rating,
    count: item?.ratings_count,
    roasted: item?.roasted,
    description: item?.description
  }

  const toggleMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    EventRegister.emit("ChangeTheme", newValue);
  };

  const handleFavourites = ()=> {
    setToggleHeart((prev)=>!prev);

    if (toggleHeart) {
      dispatch(favouriteActions.removeFromFavourites(data.id))
    } else {
      dispatch(favouriteActions.addToFavourites(data));
    }

    Toast.show(!toggleHeart ? "Added to favourites!!" : "Removed from favourites!!", {
      duration: 2000,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      backgroundColor: theme.textHex,
      textColor: theme.backgroundHex,
      opacity: 0.9,
      textStyle: { fontFamily: "poppins_semibold", fontSize: getFontSize(0.02)},
    });
  }

  useEffect(()=>{
    const fetchData = async () => {
      const parsedTheme = await getTheme();
      setDarkMode(parsedTheme);
    };

    fetchData();
  },[])

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[ theme.secondarySubBgHex, theme.backgroundHex]}
        locations={[0.0428, 0.9352]}
        style={[styles.left_tab, { borderColor: theme.secondarySubBgHex }]}
      >
        {
          route.name === PAYMENT || route.name === CART_ITEM 
          ? 
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.goBack()}>
              <Icon type="feather" name="chevron-left" size={27} color={theme.arrowHex} />
            </TouchableOpacity>
          : 
          <TouchableOpacity onPress={toggleMode} style={styles.btn}>
            {
              darkMode ?
                <Icon type="feather" name="sun" size={24} color={theme.textHex} style={{ opacity: darkMode ? 0.4 : 0.7 }} /> :
                <Icon type="octicons" name="moon" size={24} color={theme.textHex} style={{ opacity: darkMode ? 0.4 : 0.7 }} />
            }
          </TouchableOpacity>
        }
      </LinearGradient>

      <Text style={[styles.text, { color: theme.textHex }]}>{text}</Text>

      <LinearGradient
        colors={[ theme.secondarySubBgHex, theme.backgroundHex]}
        locations={[0.0428, 0.9352]}
        style={[styles.right_tab, { borderColor: theme.secondarySubBgHex }]}
      >
        {
          route.name === CART_ITEM 
          ? 
            <TouchableOpacity style={styles.btn} onPress={()=>handleFavourites()}>
              <Icon name="heart" size={20} color={toggleHeart ? theme.heartHex : theme.textHex} style={{ opacity: !toggleHeart ? 0.4 : 1 }} />
            </TouchableOpacity>
          : 
          <TouchableOpacity style={styles.btn}>
              <Icon type="ionicons" name="ios-people-outline" size={24} color={theme.textHex} style={{ opacity: darkMode ? 0.4 : 0.7 }} />
            </TouchableOpacity>
        }
      </LinearGradient>
    </View>
  )
}

export default TopTabs

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "3%",
    paddingHorizontal: "4%"
  },
  left_tab: {
    borderWidth: 1,
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 3
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.03)
  },
  right_tab: {
    borderWidth: 1,
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 3,
    justifyContent: "center",
    alignItems: "center",
  }
})