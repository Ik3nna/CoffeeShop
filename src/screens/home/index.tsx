import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useThemeContext } from "../../themes/themeContext"
import React, { useEffect, useState } from 'react'
import TopTabs from '../../components/topTabs';
import Icon from '../../components/icons';
import { getFontSize } from '../../utils/getFontSize';
import CoffeeData from '../../data/CoffeeData';
import BeansData from '../../data/BeansData';
import CoffeeCard from '../../components/coffeeCard';

const { width, height } = Dimensions.get("window");

const Home = () => {
  const theme = useThemeContext();
  const [selectedTab, setselectedTab] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [filteredList, setFilteredList] = useState<any>(CoffeeData)
  const BottomTabBarHeight = useBottomTabBarHeight();

  const getSearchItem = (data: string)=> {
    const searchedItem = CoffeeData.filter((item: any)=> {
      return item.name.toLowerCase().includes(data.toLowerCase());
    });
    setFilteredList(searchedItem);
  }

  const getCategories = () => {
    let uniqueSet = new Set();

    CoffeeData.forEach((obj: any)=> {
      uniqueSet.add(obj.name);
    })
    let tabsArray = Array.from(uniqueSet);

    tabsArray.unshift("All");

    return tabsArray;
  }

  const getTabColors = (selected: string)=> {
    if (selectedTab === selected) {
      return theme.activeHex;
    } else {
      return theme.inactiveTabHex;
    }
  }

  useEffect(()=>{
    if (selectedTab !== "All") {
      const tabItems = CoffeeData.filter((item: any)=> {
        return item.name.toLowerCase().includes(selectedTab.toLowerCase());
      });
      setFilteredList(tabItems);
    } else {
      setFilteredList(CoffeeData)
    }
  }, [selectedTab])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundHex }]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <TopTabs 
          rightTab={
            <TouchableOpacity>
              <Icon type="ionicons" name="ios-people-outline" size={24} color={theme.textHex} style={styles.icons} />
            </TouchableOpacity>
          }
        />

        <Text style={[styles.header, { color: theme.textHex }]}>Find the best{'\n'}coffee for you</Text>

        <View>
          <View style={styles.search_container}>
            <Icon type="ionicons" name="search" size={24} color={theme.inactiveTabHex} style={styles.search} />
            <TextInput 
              placeholder='Find your Coffee...'
              value={searchInput}
              onChangeText={(value)=> {
                setSearchInput(value); 
                getSearchItem(value)
              }}
              placeholderTextColor={theme.inactiveTabHex}
              style={[styles.input, { backgroundColor: theme.subBgHex, color: theme.inactiveTabHex }]}
            />
          </View>

          {searchInput === "" && 
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.tabs_container}
            >
              {getCategories().map((item: any, index: number)=> (
                <TouchableOpacity style={styles.tab_btn} key={index} onPress={()=>setselectedTab(item)}>
                  <Text style={[styles.tabs, { color: getTabColors(item) }]}>{item}</Text>
                  <View style={[styles.drop, { backgroundColor: item === selectedTab ? theme.activeHex : null }]} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          }

          {filteredList.length > 0 ?
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.coffee_list}
            >
              {filteredList.map((item: any)=>(
                <TouchableOpacity key={item.id} style={styles.tab_btn}>
                  <CoffeeCard 
                    name={item.name}
                    image={item.imagelink_square}
                    rating={item.average_rating}
                    ingredient={item.special_ingredient}
                    currency={item.prices[0].currency}
                    price={item.prices[0].price}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView> :
            <View style={styles.nothing_container}>
              <Text style={[styles.nothing, { color: theme.textHex }]}>Nothing to show here</Text>
            </View>
          }
        </View>

        <Text style={[styles.beans, { color: theme.textHex }]}>Coffee beans</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.coffee_list, { marginBottom: BottomTabBarHeight }]}
        >
          {BeansData.map((item)=>(
            <TouchableOpacity key={item.id} style={styles.tab_btn}>
              <CoffeeCard 
                name={item.name}
                image={item.imagelink_square}
                rating={item.average_rating}
                ingredient={item.special_ingredient}
                currency={item.prices[0].currency}
                price={item.prices[0].price}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icons: {
    opacity: 0.7
  },
  header: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.037),
    paddingHorizontal: "4%",
    paddingVertical: "3%",
  },
  search_container: {
    paddingHorizontal: "4%",
    paddingVertical: "3%",
    flexDirection: "row",
    position: "relative"
  },
  search: {
    position: "absolute",
    top: "47%",
    left: 30,
    zIndex: 5
  },
  input: {
    width: "100%",
    padding: Platform.OS === "ios" ? "5%" : "4%",
    borderRadius: 15,
    fontFamily: "poppins_medium",
    paddingLeft: 50
  },
  tabs_container: {
    paddingHorizontal: "4%",
    marginRight: "4%"
  },
  tab_btn: {
    alignItems: "center",
    marginRight: 20
  },
  tabs: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.027),
  }, 
  nothing_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "30%"
  },
  nothing: {
    fontFamily: "poppins_semibold",
    fontSize: getFontSize(0.027)
  },
  drop: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  coffee_list: {
    paddingHorizontal: "4%",
    marginRight: "4%",
    paddingVertical: "5%"
  },
  beans: {
    paddingHorizontal: "4%",
    fontFamily: "poppins_medium",
    fontSize: getFontSize(0.03)
  }
})