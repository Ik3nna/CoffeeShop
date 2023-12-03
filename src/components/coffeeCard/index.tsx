import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useThemeContext } from '../../themes/themeContext'
import { CartListProps, CoffeeCardProps } from '../../types'
import { getFontSize } from '../../utils/getFontSize'
import Button from '../button'
import Icon from '../icons'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cart-slice'
import Toast from 'react-native-root-toast'
import { useNavigation } from '@react-navigation/native'
import { CART } from '../../constants/routeName'

const { width, height } = Dimensions.get("window");

const CoffeeCard = React.memo(({ id, name, image, rating, ingredient, currency, price, size, roasted }: CoffeeCardProps) => {
  const theme = useThemeContext();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const addedItem = {
    id,
    name, 
    image, 
    ingredient,  
    roasted,
    innerArr: [{ id: id, size: size, price: price, quantity: 1, currency: currency }]
  }

  const handleCart = (data: CartListProps)=> {
    dispatch(cartActions.addToCart(data));

    Toast.show("Added to cart!!", {
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

  return (
    <LinearGradient
        colors={[ theme.cardHex, theme.cardSubHex ]}
        locations={[0.04,0.9193]}
        style={styles.container}
    >
        <View style={styles.img_container}>
            <View style={[styles.star, { backgroundColor: theme.primaryRGBA }]}>
                <Icon type="ant" name="star" size={15} color={theme.activeHex} />
                <Text style={[styles.rating, { color: theme.textHex }]}>{rating}</Text>
            </View>
            <Image 
                source={image} 
                alt="coffee" 
                style={styles.image}
            />
        </View>
       
       <View style={styles.sub_container}>
            <Text style={[styles.name, { color: theme.textHex }]}>{name}</Text>

            <Text style={[styles.ingredient, { color: theme.textHex}]}>{ingredient}</Text>

            <View style={styles.flex_container}>
                <View style={styles.currency_container}>
                    <Text style={[styles.currency, { color: theme.activeHex }]}>{currency}</Text>
                    <Text style={[styles.currency, { color: theme.textHex }]}>{price}</Text>
                </View>

                <Button 
                    content='+'
                    bgColor={theme.activeHex}
                    color={theme.textHex}
                    width={width * 0.1}
                    height={width * 0.1}
                    radius={10}
                    size={getFontSize(0.035)}
                    onClick={()=>handleCart(addedItem)}
                />
            </View>
       </View>
    </LinearGradient>
  )
})

export default CoffeeCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 23,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    img_container: {
        position: "relative"
    },
    star: {
        position: "absolute",
        right: 0,
        borderBottomLeftRadius: 23,
        borderTopRightRadius: 23,
        paddingVertical: "4%",
        paddingHorizontal: "6%",
        zIndex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 5
    },
    rating: {
        fontFamily: "poppins_semibold",
        fontSize: getFontSize(0.017)
    },
    sub_container: {
        flexDirection: "column",
        rowGap: 10,
        marginTop: 5
    },
    image: {
        borderRadius: 23,
        width: width * 0.45,
        height: width * 0.45,
    },
    name: {
        fontFamily: "poppins_regular",
        fontSize: getFontSize(0.02),
    },
    ingredient: {
        fontFamily: "poppins_regular",
        fontSize: getFontSize(0.015),
    }, 
    flex_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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