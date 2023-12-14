import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from "../../themes/themeContext";
import TopTabs from '../../components/topTabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import LottieView from 'lottie-react-native';
import DisplayCard from '../../components/displayCard';
import { getFontSize } from '../../utils/getFontSize';
import FlashCard from '../../components/flashCard';
import Button from '../../components/button';
import { cartActions } from '../../store/cart-slice';
import Toast from 'react-native-root-toast';
import { BlurView } from 'expo-blur';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { NavigationProps } from '../../types';
import { LOGIN, PAYMENT } from '../../constants/routeName';


// assets
import coffeecup from "../../lottie/coffeecup.json";

const { width, height } = Dimensions.get("window");

const Cart = ({ navigation }: NavigationProps) => {
  const theme = useThemeContext();
  const animation = useRef(null);
  const BottomTabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const cartList = useSelector((state: RootState)=>state.cart.cartList);
  const totalPrice = useSelector((state: RootState)=>state.cart.totalPrice);

  const formattedTotalPrice = ()=> {
    const splittedPrice = totalPrice.toString().split(".");

    let formattedTotalPrice: string;

    if (splittedPrice.length === 1) {
      formattedTotalPrice = `${totalPrice}.00`;
    } else if (splittedPrice[1].length === 1) {
      formattedTotalPrice = `${totalPrice}0`
    } else {
      formattedTotalPrice = totalPrice
    }

    return formattedTotalPrice
  }

  const checkAuthenticationStatus = async ()=> {
    onAuthStateChanged(auth, async (user)=> {
      if (user) {
        navigation.navigate(PAYMENT)
      } else {
        // navigation.navigate(LOGIN)
        navigation.navigate(PAYMENT)
      }
    })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundHex }]}>
      <TopTabs text='Cart' />

      {
        cartList.length === 0 
        ? <View style={styles.lottie_container}>
            <LottieView 
              autoPlay
              ref={animation}
              source={coffeecup}
              style={styles.lottie_view}
            />
          </View>
        : <FlatList 
            data={cartList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            style={styles.flat_list}
            ListFooterComponent={<View style={{ height: BottomTabBarHeight * 2 }} />}
            renderItem={({item})=> (
              <DisplayCard style={styles.list}>
                <View style={styles.wrapper}>
                  <Image source={item.image} style={styles.img} />

                  <View>
                    <Text style={[styles.name, { color: theme.textHex }]}>{item.name}</Text>
                    <Text style={[ styles.ingredient, { color: theme.subTextHex }]}>{item.ingredient}</Text>
                    <View style={[styles.roasted_container, { backgroundColor: theme.subBgHex }]}>
                      <Text style={[styles.roasted, { color: theme.subTextHex }]}>{item.roasted}</Text>
                    </View>
                  </View>
                </View>

                {item.innerArr.map((item: any, index: number)=>(
                  <View key={index} style={styles.cart_quantity}>
                    <FlashCard 
                      content={item.size}
                      color={theme.textHex}
                      font={"poppins_medium"}
                      size={getFontSize(0.027)}
                      bgColor={theme.sizeHex}
                      w={width * 0.21}
                      h={width * 0.1}
                      borderRadius={10}
                    />

                    <Text style={[styles.flashcard_text, { color: theme.activeHex }]}>
                      {item.currency}{" "}
                      <Text style={[styles.flashcard_text, { color: theme.textHex}]}>{item.price}</Text>
                    </Text>

                    <View style={styles.btns_container}>
                      <Button 
                        content='-'
                        bgColor={theme.activeHex}
                        color={theme.textHex}
                        width={width * 0.1}
                        height={width * 0.1}
                        radius={10}
                        size={getFontSize(0.035)}
                        onClick={()=>{
                          dispatch(cartActions.decrement(item));

                          if (item.quantity === 1) {
                            Toast.show("Removed from cart!!", {
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
                        }}
                      />

                      <FlashCard 
                        content={item.quantity}
                        color={theme.subTextHex}
                        bgColor={theme.subBgHex}
                        w={width * 0.15}
                        h={width * 0.1}
                        size={getFontSize(0.021)}
                        borderRadius={10}
                        border={theme.activeHex}
                        font={"poppins_medium"}
                      />

                      <Button 
                        content='+'
                        bgColor={theme.activeHex}
                        color={theme.textHex}
                        width={width * 0.1}
                        height={width * 0.1}
                        radius={10}
                        size={getFontSize(0.035)}
                        onClick={()=>dispatch(cartActions.increment(item))}
                      />
                    </View>
                  </View>
                ))}
              </DisplayCard>
            )}
          />
      }

      {cartList.length > 0 && (
        <DisplayCard style={[styles.cart_container, { bottom: BottomTabBarHeight }]}>
          <BlurView style={styles.cart_container} intensity={15} blurReductionFactor={100}>
            <View style={styles.sub_cart_container}>
              <Text style={[styles.price, { color: theme.subTextHex }]}>Total Price</Text>
              
              <View style={styles.currency_container}>
                <Text style={[styles.currency, { color: theme.activeHex }]}>$</Text>
                <Text style={[styles.currency, { color: theme.textHex }]}>{formattedTotalPrice()}</Text>
              </View>
            </View>
              
            <Button
              content='Pay'
              bgColor={theme.activeHex}
              color={theme.textHex}
              width={width * 0.63}
              height={width * 0.13}
              radius={15}
              size={getFontSize(0.021)}
              onClick={()=>checkAuthenticationStatus()}
            />
          </BlurView>
        </DisplayCard>
      )}
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    height: height,
    position: "relative",
    paddingHorizontal: "4%"
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
  flat_list: {
    paddingHorizontal: "4%",
  },
  list: {
    borderRadius: 23,
    rowGap: 10,
    marginBottom: "5%"
  }, 
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 15
  },
  img: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 23,
  },
  name: {
    fontFamily: "poppins_regular",
    fontSize: getFontSize(0.027)
  },
  ingredient: {
    fontFamily: "poppins_regular",
    fontSize: getFontSize(0.017),
    paddingVertical: "3%",
  },
  roasted_container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: "4%",
    padding: "5%",
  },
  roasted: {
    fontFamily: "poppins_regular",
    fontSize: getFontSize(0.017)
  },
  cart_quantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flashcard_text: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.027)
  },
  btns_container: {
    flexDirection: "row",
    columnGap: 10
  },
  cart_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "4%",
    paddingVertical: height * 0.05,
    position: "absolute",
    width: width,
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