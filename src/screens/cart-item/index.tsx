import { Dimensions, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from '../../components/icons';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from "../../themes/themeContext";
import { useRoute } from '@react-navigation/native';
import TopTabs from '../../components/topTabs';
import { getFontSize } from '../../utils/getFontSize';
import FlashCard from '../../components/flashCard';

// assets
import bean from "../../assets/icons/bean.png";
import africa from "../../assets/icons/location.png";
import coffee from "../../assets/icons/coffee.png";
import milk from "../../assets/icons/milk.png";

const { width, height } = Dimensions.get("window");

const CartItem = () => {
  const theme = useThemeContext();
  const route = useRoute();
  const { item }: any = route.params;
  const [index, setIndex] = useState(2)
  const [selectedTab, setSelectedTab] = useState(item.prices[index].size);

  const handleTabSelect = (data: string)=> {
    setSelectedTab(data);

    if (data === "M" || data === "500gm") {
      setIndex(1)
    } else if (data === "S" || data === "250gm") {
      setIndex(0)
    } else {
      setIndex(2)
    }
  }

  const getColor = (data: string)=> {
    if (selectedTab === data) {
      return theme.activeHex
    } else {
      return theme.subTextHex
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <ImageBackground source={item.imagelink_portrait} style={styles.imgBackground}>
        <SafeAreaView>
          <TopTabs item={item} />
        </SafeAreaView>

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
              <Text style={[styles.score, { color: theme.textHex }]}>{item.average_rating}</Text>
              <Text style={[styles.ingredient, { color: theme.subTextHex }]}>({item.ratings_count})</Text>
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

      <View style={styles.other_content}>
        <View>
          <Text style={[styles.description, { color: theme.subTextHex }]}>Description</Text>
          <Text style={[styles.des_content, { color: theme.textHex }]}>{item.description}</Text>
        </View>
        
        <View>
          <Text style={[styles.description, { color: theme.subTextHex }]}>Size</Text>

          <View style={styles.tab_container}>
            {item.prices.map((item: any, index: number)=> (
              <TouchableOpacity key={index} onPress={()=>handleTabSelect(item.size)}>
                <FlashCard 
                  content={item.size}
                  color={getColor(item.size)}
                  bgColor={theme.subBgHex}
                  w={width * 0.27}
                  h={width * 0.1}
                  size={getFontSize(0.021)}
                  borderRadius={10}
                  border={selectedTab === item.size && theme.activeHex}
                  font={"poppins_medium"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.cart_container}>
        <View style={styles.sub_cart_container}>
          <Text style={[styles.price, { color: theme.subTextHex }]}>Price</Text>
          
          <View style={styles.currency_container}>
            <Text style={[styles.currency, { color: theme.activeHex }]}>{item.prices[2].currency}</Text>
            <Text style={[styles.currency, { color: theme.textHex }]}>{item.prices[index].price}</Text>
          </View>
        </View>
          
        <Button
          content='Add to cart'
          bgColor={theme.activeHex}
          color={theme.textHex}
          width={width * 0.63}
          height={width * 0.13}
          radius={15}
          size={getFontSize(0.021)}
          onClick={()=>console.log("Added to cart")}
        />
      </View>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
  container: {
    height: height,
    position: "relative"
  },
  imgBackground: {
    width: "100%",
    aspectRatio: Platform.OS === "ios" ? 20 / 24 : 23 /24,
    position: "relative"
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
  other_content: {
    paddingHorizontal: "4%"
  },
  description: {
    fontFamily: "poppins_semibold",
    paddingVertical: Platform.OS === "ios" ? "4%" : "3%",
    fontSize: getFontSize(0.02)
  },
  des_content: {
    fontFamily: "poppins_regular",
    fontSize: getFontSize(0.016),
    textAlign: "justify"
  },
  tab_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cart_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "4%",
    position: "absolute",
    bottom: Platform.OS === "ios" ? "4.5%" : "2%",
    width: "100%"
  }, 
  sub_cart_container: {
    alignItems: "center"
  },
  price: {
    fontSize: getFontSize(0.018),
  },
  currency_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5
  },
  currency: {
      fontFamily: "poppins_semibold",
      fontSize: getFontSize(0.027)
  }
})