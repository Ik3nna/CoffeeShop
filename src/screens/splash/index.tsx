import { Image, StyleSheet, View, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import coffeeCup from "../../assets/images/splash-image.png"
import { NavigationProps } from '../../types'
import { MAIN } from '../../constants/routeName'
import { useFocusEffect } from '@react-navigation/native'

const { width } = Dimensions.get("window");

const Splash = ({ navigation }: NavigationProps) => {
  const [isMounted, setIsMounted] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsMounted(true);

      const timer = setTimeout(() => {
        if (isMounted) {
          navigation.navigate(MAIN);
        }
      }, 1500);

      return () => {
        clearTimeout(timer);
        setIsMounted(false);
      };
    }, [navigation, isMounted])
  );

  return (
    <>
      {isMounted &&
        <View style={styles.container}>
          <View style={styles.img_container}>
            <Image style={styles.image} source={coffeeCup} alt='coffee-cup' />
          </View>
        </View>
      }
    </>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
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