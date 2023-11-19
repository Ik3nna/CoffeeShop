import { Dimensions, FlatList, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from "../../themes/themeContext";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import LottieView from 'lottie-react-native';
import FlashCard from '../../components/flashCard';
import { getFontSize } from '../../utils/getFontSize';
import Icon from '../../components/icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { favouriteActions } from '../../store/favourite-slice'

// assets
import coffeecup from "../../lottie/coffeecup.json";
import TopTabs from '../../components/topTabs';
import bean from "../../assets/icons/bean.png";
import africa from "../../assets/icons/location.png";
import coffee from "../../assets/icons/coffee.png";
import milk from "../../assets/icons/milk.png";


const { width, height } = Dimensions.get("window");

const Favourites = () => {
  const theme = useThemeContext();
  const itemsList = useSelector((state: RootState)=>state.favourite.itemsList);
  const animation = useRef(null);
  const BottomTabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const [toggleHeart, setToggleHeart] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundHex }]}>
      {
        itemsList.length === 0 
        ? <View style={styles.lottie_container}>
            <LottieView 
              autoPlay
              ref={animation}
              source={coffeecup}
              style={styles.lottie_view}
            />
          </View>
        : <View>
            <TopTabs />

            <FlatList 
              data={itemsList}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              ListFooterComponent={<View style={{ height: BottomTabBarHeight * 1.6 }} />}
              renderItem={({item})=> (
                <View style={styles.list_container}>
                  <ImageBackground source={item.image} imageStyle={styles.img_style} style={styles.imgBackground}>
                    <LinearGradient
                      colors={[ theme.secondarySubBgHex, theme.backgroundHex]}
                      locations={[0.0428, 0.9352]}
                      style={[styles.heart_container, { borderColor: theme.secondarySubBgHex }]}
                    >
                      <TouchableOpacity onPress={()=>dispatch(favouriteActions.removeFromFavourites(item.id))}>
                        <Icon name="heart" size={20} color={toggleHeart ? theme.heartHex : theme.textHex} style={{ opacity: !toggleHeart ? 0.4 : 1 }} />
                      </TouchableOpacity>
                    </LinearGradient>

                    <View style={[styles.flash_card, { backgroundColor: theme.primaryRGBA }]}>
                      <View style={styles.details}>
                        <View>
                          <Text style={[styles.name, { color: theme.textHex }]}>{item.name}</Text>
                          <Text style={[styles.ingredient, { color: theme.textHex }]}>{item.special_ingredient}</Text>
                        </View>
                        
                        <View style={styles.card_container}>
                          <FlashCard 
                            w={width * 0.13}
                            h={width * 0.13}
                            icon={
                              item.id.toLowerCase().includes('c') 
                              ? <Image source={coffee} alt="coffee" style={styles.img} />
                              : <Image source={bean} alt="bean" style={styles.img} />
                            }
                            content={item.type}
                            bgColor={theme.subBgHex}
                            color={theme.subTextHex}
                            borderRadius={10}
                            size={getFontSize(0.016)}
                            font={"poppins_medium"}
                          />

                          <FlashCard 
                            w={width * 0.13}
                            h={width * 0.13}
                            icon={
                              item.id.includes('C') 
                              ? <Image source={milk} alt="milk" style={styles.img} />
                              : <Image source={africa} alt="africa" style={styles.img} />
                            }
                            content={item.ingredients}
                            bgColor={theme.subBgHex}
                            color={theme.subTextHex}
                            borderRadius={10}
                            size={getFontSize(0.016)}
                            font={"poppins_medium"}
                          />
                        </View>
                      </View>
                      
                      <View style={styles.sub_details}>
                        <View style={styles.ratings}>
                          <Icon type="ant" name="star" size={25} color={theme.activeHex} />
                          <Text style={[styles.score, { color: theme.textHex }]}>{item.rating}</Text>
                          <Text style={[styles.ingredient, { color: theme.subTextHex }]}>({item.count})</Text>
                        </View>

                        <FlashCard 
                          w={width * 0.32}
                          h={width * 0.1}
                          borderRadius={10}
                          content={item.roasted}
                          bgColor={theme.subBgHex}
                          color={theme.subTextHex}
                          size={getFontSize(0.016)}
                          font={"poppins_medium"}
                        />
                      </View>
                    </View>
                  </ImageBackground>

                  <LinearGradient 
                    colors={[ theme.secondarySubBgHex, theme.backgroundHex]}
                    locations={[0.0807, 0.9193]}
                    style={styles.sub_content}
                  >
                    <Text style={[styles.description, { color: theme.subTextHex }]}>Description</Text>
                    <Text style={[styles.des_content, { color: theme.textHex }]}>{item.description}</Text>
                  </LinearGradient>
                </View>
              )}
            />
          </View>
        }
    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "4%",
  },
  lottie_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  lottie_view: {
    width: width * 0.7,
    height: width * 0.7
  },
  list_container: {
    paddingHorizontal: "4%",
    marginTop: "2%",
    position: "relative",
    marginBottom: 30
  },
  imgBackground: {
    width: "100%",
    height: height * 0.57,
  },
  img_style: {
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23
  },
  heart_container: {
    borderWidth: 1,
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "3%",
    top: "3%"
  },
  flash_card: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: "4%"
  },
  details: {
    paddingHorizontal: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.035),
  },
  ingredient: {
    fontSize: getFontSize(0.016),
    fontFamily: "poppins_regular"
  },
  card_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15
  },
  img: {
    width: 26,
    height: 26
  },
  sub_details: {
    paddingHorizontal: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "5%"
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10
  },
  score: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.022)
  },
  sub_content: {
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    marginTop: -3
  },
  description: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.02)
  },
  des_content: {
    fontFamily: "poppins_regular",
    fontSize: getFontSize(0.016),
    textAlign: "justify"
  }
})