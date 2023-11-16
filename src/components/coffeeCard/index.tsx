import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useThemeContext } from '../../themes/themeContext'
import { CoffeeCardProps } from '../../types'
import { getFontSize } from '../../utils/getFontSize'
import Button from '../button'

const { width, height } = Dimensions.get("window");

const CoffeeCard = ({ name, image, rating, ingredient, currency, price }: CoffeeCardProps) => {
  const theme = useThemeContext();

  return (
    <LinearGradient
        colors={[ theme.cardHex, theme.cardSubHex ]}
        locations={[0.04,0.9193]}
        style={styles.container}
    >
        <View>
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
                    onClick={()=>console.log(12)}
                />
            </View>
       </View>
    </LinearGradient>
  )
}

export default CoffeeCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 23,
        paddingHorizontal: 10,
        paddingVertical: 15
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