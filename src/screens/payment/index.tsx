import { Dimensions, StyleSheet, Text, View, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../../themes/themeContext';
import TopTabs from '../../components/topTabs';
import { getFontSize } from '../../utils/getFontSize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { cartActions } from '../../store/cart-slice';
import Button from '../../components/button';
import LottieView from 'lottie-react-native';

// assets
import creditCard from "../../assets/icons/credit-card-icon.png";
import wallet from "../../assets/icons/wallet.png";
import googlePay from "../../assets/icons/google-pay.png";
import applePay from "../../assets/icons/apple-pay.png";
import amazonPay from "../../assets/icons/amazon-pay.png";
import successful from "../../lottie/successful.json";

const { width, height } = Dimensions.get("window");
const imgList = [
  {index: 'Credit Card', img: creditCard},
  {index: 'Wallet', img: wallet},
  {index: 'Google Pay', img: googlePay},
  {index: 'Apple Pay', img: applePay},
  {index: 'Amazon Pay', img: amazonPay},
]

const Payment = () => {
  const theme = useThemeContext();
  const cartList = useSelector((state: RootState)=>state.cart.cartList);
  const totalPrice = useSelector((state: RootState)=>state.cart.totalPrice);
  const dispatch = useDispatch();
  const [paymentMeans, setPaymentMeans] = useState<'Credit Card' | 'Wallet' | 'Google Pay' | 'Apple Pay' | 'Amazon Pay'>('Credit Card');
  const [showSuccessfulLottie, setShowSuccessfulLottie] = useState(false);
  const animation = useRef(null);
  const today = new Date();

  const formatDate = () => {
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const getOrdinalSuffix = (day: any) => {
        if (day >= 11 && day <= 13) {
          return 'th';
        }
        const lastDigit = day % 10;
        switch (lastDigit) {
          case 1:
            return 'st';
          case 2:
            return 'nd';
          case 3:
            return 'rd';
          default:
            return 'th';
        }
    };
    const suffix = getOrdinalSuffix(day);
    return `${day}${suffix} ${month} ${year}`;
  };

  const formatTime = ()=> {
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
  }

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

    return formattedTotalPrice;
  }

  const item = {
    cartData: cartList, 
    total: totalPrice,
    date: formatDate(),
    itemID: today.getSeconds(),
    time: formatTime()
  }

  const handlePayment = ()=> {
    setShowSuccessfulLottie(true);
    dispatch(cartActions.checkoutFromCart(item));
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopTabs text='Payment' noRightPocket />
      
      {
        showSuccessfulLottie 
        ? <View style={styles.lottie_container}>
            <LottieView 
              autoPlay
              ref={animation}
              source={successful}
              style={styles.lottie_view}
            />
          </View>
        : <View style={{height: height - 0.14 * height}}>
          <View style={styles.img_container}>
            {imgList.map((item: any, index)=>(
              <TouchableOpacity 
                key={index} 
                style={[styles.btn, { 
                  borderColor: item.index === 'Credit Card' && theme.activeHex,
                  borderWidth: item.index === 'Credit Card' ? 2 : 0,
                  padding: item.index === 'Credit Card' ? "3%" : 0
                }]}
                onPress={()=>setPaymentMeans(item.index)}
              >
                <Image source={item.img} alt="payment" />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.cart_container}>
            <View style={styles.sub_cart_container}>
              <Text style={[styles.price, { color: theme.subTextHex }]}>Total Price</Text>
              
              <View style={styles.currency_container}>
                <Text style={[styles.currency, { color: theme.activeHex }]}>$</Text>
                <Text style={[styles.currency, { color: theme.textHex }]}>{formattedTotalPrice()}</Text>
              </View>
            </View>
              
            <Button
              content={`Pay from ${paymentMeans}`}
              bgColor={theme.activeHex}
              color={theme.textHex}
              width={width * 0.63}
              height={width * 0.13}
              radius={15}
              size={getFontSize(0.021)}
              onClick={()=>handlePayment()}
            />
          </View>
        </View>
      }
    </SafeAreaView>
  )
}

export default Payment

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
  img_container: {
    paddingHorizontal: "4%",
    rowGap: 15,
    marginTop: "4%"
  },
  btn: {
    borderRadius: 25,
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