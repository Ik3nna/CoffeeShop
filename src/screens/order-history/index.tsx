import { Dimensions, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeContext } from '../../themes/themeContext'
import TopTabs from '../../components/topTabs'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import LottieView from 'lottie-react-native';
import DisplayCard from '../../components/displayCard';
import { getFontSize } from '../../utils/getFontSize';
import FlashCard from '../../components/flashCard';
import Button from '../../components/button';
import { BlurView } from 'expo-blur';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { CartListProps } from '../../types';

// assets
import coffeeCup from "../../assets/images/splash-image.png"
import coffeecup from "../../lottie/coffeecup.json";
import download from "../../lottie/download.json";

const { width, height } = Dimensions.get("window");

const OrderHistory = () => {
  const theme = useThemeContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const animation = useRef(null);
  const BottomTabBarHeight = useBottomTabBarHeight();
  const orderList = useSelector((state: RootState)=>state.cart.orderHistoryList);
  const [showDownloadLottie, setShowDownloadLottie] = useState(false);

  const checkAuthenticationStatus = async ()=> {
    onAuthStateChanged(auth, async (user)=> {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    })
  }

  useFocusEffect(
    useCallback(()=>{
      checkAuthenticationStatus();
    },[orderList])
  )

  useFocusEffect(
    useCallback(()=>{
      setShowDownloadLottie(false)
    },[])
  )

  return (
    <>
      {isAuthenticated 
      ? <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundHex }]}>
          <TopTabs text='Order History' />

          {showDownloadLottie
          ? <View style={styles.lottie_container}>
              <LottieView 
                autoPlay
                ref={animation}
                source={download}
                style={styles.lottie_view}
              />
            </View>
          : <>
              {orderList.length === 0
              ? <View style={styles.lottie_container}>
                  <LottieView 
                    autoPlay
                    ref={animation}
                    source={coffeecup}
                    style={styles.lottie_view}
                  />
                </View>
              : <FlatList 
                  data={orderList}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.itemID}
                  style={styles.flat_list}
                  ListFooterComponent={<View style={{ height: BottomTabBarHeight * 2 }} />}
                  renderItem={({item})=> (
                    <View style={{ marginBottom: "3%" }}>
                      <View style={styles.order_info}>
                        <View>
                          <Text style={[styles.text1, { color: theme.textHex }]}>Order Date</Text>
                          <Text style={[styles.text2, { color: theme.textHex }]}>{item.date}, {item.time}</Text>
                        </View>

                        <View style={styles.amount_container}>
                          <Text style={[styles.text1, { color: theme.textHex }]}>Total Amount</Text>
                          <Text style={[styles.text2, { color: theme.activeHex }]}>${item.total}</Text>
                        </View>
                      </View>
                      
                      {item.cartData.map((item: CartListProps, index: number)=>
                        <DisplayCard style={styles.list} key={index}>
                          <View style={styles.wrapper}>
                            <Image source={item.image} style={styles.img} />

                            <View>
                              <Text style={[styles.name, { color: theme.textHex }]}>{item.name}</Text>
                              <Text style={[ styles.ingredient, { color: theme.subTextHex }]}>{item.ingredient}</Text>
                            </View>

                            <Text style={[styles.price_text, { color: theme.textHex }]}>
                              <Text style={{ color: theme.activeHex }}>${" "}</Text>
                              {item.innerArr.reduce((total: number, cartItem: any) => {
                                return (
                                  total + cartItem.quantity * cartItem.price
                                );
                              }, 0).toFixed(2)}
                            </Text>
                          </View>
                          
                          {item.innerArr.map((item: any, index: number)=> (
                            <View key={index} style={styles.cart_quantity}>
                              <View style={styles.flashcard_container}>
                                <FlashCard 
                                  content={item.size}
                                  color={theme.textHex}
                                  font={"poppins_medium"}
                                  size={getFontSize(0.022)}
                                  bgColor={theme.sizeHex}
                                  w={width * 0.2}
                                  h={width * 0.1}
                                  borderRadius={10}
                                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                                />

                                <FlashCard 
                                  content={
                                    <Text style={[styles.flashcard_text, { color: theme.activeHex }]}>
                                      {item.currency}{" "}
                                      <Text style={[styles.flashcard_text, { color: theme.textHex}]}>{item.price}</Text>
                                    </Text>
                                  }
                                  color={theme.textHex}
                                  font={"poppins_medium"}
                                  bgColor={theme.sizeHex}
                                  w={width * 0.2}
                                  h={width * 0.1}
                                  borderRadius={10}
                                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                                />
                              </View>

                              <View style={styles.quantity}>
                                <Text style={[styles.flashcard_text, { color: theme.activeHex }]}>X</Text>
                                <Text style={[styles.flashcard_text, { color: theme.subTextHex }]}>{item.quantity}</Text>
                              </View>

                              
                              <Text style={[styles.flashcard_text, { color: theme.activeHex }]}>{(item.price * item.quantity).toFixed(2)}</Text>
                            </View>
                          ))}
                        </DisplayCard>
                      )}
                      
                    </View>
                  )}
                />
              }

              {orderList.length > 0 && (
                <DisplayCard style={[styles.cart_container, { bottom: BottomTabBarHeight }]}>
                  <BlurView style={styles.cart_container} intensity={15} blurReductionFactor={100}>
                    <Button
                      content='Download'
                      bgColor={theme.activeHex}
                      color={theme.textHex}
                      width={width * 0.63}
                      height={width * 0.13}
                      radius={15}
                      size={getFontSize(0.021)}
                      onClick={()=>setShowDownloadLottie(true)}
                    />
                  </BlurView>
                </DisplayCard>
              )}
            </>
          }
        </SafeAreaView>
      : <View style={[styles.loading, { backgroundColor: theme.backgroundHex }]}>
          <View style={styles.img_container}>
            <Image style={styles.image} source={coffeeCup} alt='coffee-cup' />
          </View>
        </View>
      }
    </>
  )
}

export default OrderHistory

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
    marginTop: "2%"
  },
  order_info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.017)
  },
  amount_container: {
    display: "flex",
    alignItems: "flex-end"
  },
  text2: {
    fontFamily: "poppins_light",
    fontSize: getFontSize(0.017)
  },
  list: {
    borderRadius: 23,
    rowGap: 10,
    marginVertical: "4%"
  }, 
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15
  },
  img: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2)/5,
  },
  name: {
    fontFamily: "poppins_regular",
    fontSize: getFontSize(0.025)
  },
  ingredient: {
    fontFamily: "poppins_regular",
    fontSize: getFontSize(0.015),
  },
  price_text: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.028),
    marginLeft: "auto"
  },
  cart_quantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flashcard_container: {
    flexDirection: "row",
    columnGap: 3
  },
  flashcard_text: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.022)
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4
  },
  cart_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "4%",
    paddingVertical: height * 0.05,
    position: "absolute",
    width: width,
  }, 
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img_container: {
    backgroundColor: "#0C0F14",
    padding: "6%",
    borderRadius: ((width * 0.2) + (width * 0.2)) / 2
  },
  image: {
    width: width * 0.2,
    height: width * 0.2
  }
})