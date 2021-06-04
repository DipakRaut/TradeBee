import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  UIManager,
  Platform,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import coinFetchService from "../api/fetchCoins";
import ActiveButton from "../components/ActiveButton";
import MarketCard from "../components/MarketCard";
import StatusBarScreen from "../components/StatusBarScreen";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../components/colors";
import Globals from "../utility/globals";
import { createStackNavigator } from "@react-navigation/stack";
import TradeScreen from "./TradeScreen";
import { useNavigation } from "@react-navigation/native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function MarketScreen() {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState(coins);
  const [exchangerate, setExchangeRate] = useState("INR");

  //true for 'all' and false for 'top 100'
  const [currentBtn, toggleActiveBtn] = useState(false);
  const [showSearchBar, toggleSearchBar] = useState(false);
  const [loading, setLoading] = useState(true);

  const repo = Globals.coinRepo;

  useEffect(() => {
    loadData(currentBtn);
    return () => {
      coinFetchService.cancelFetchCoins();
    };
  }, []);

  const loadData = async (tempCurrentBtn, currency) => {
    currency = typeof currency === "undefined" ? exchangerate : currency;
    const type = tempCurrentBtn ? "all" : "top";

    setLoading(true);
    let data = repo.get(type, currency);

    if (typeof data === "undefined") {
      let response = tempCurrentBtn
        ? await loadCoins(currency)
        : await loadTop(currency);
      repo.store(type, currency, response.data);

      if (tempCurrentBtn) {
        setCoins(response.data.rates);
        setFilteredCoins(response.data.rates);
      } else {
        setCoins(response.data);
        setFilteredCoins(response.data);
      }
    } else {
      if (tempCurrentBtn) {
        setCoins(data.rates);
        setFilteredCoins(data.rates);
      } else {
        setCoins(data);
        setFilteredCoins(data);
      }
    }
    setLoading(false);
  };

  const loadCoins = (currency) => coinFetchService.fetchCoins(currency);

  const loadTop = (currency) => coinFetchService.latestHistory(currency);

  const resetCoins = () => {
    setFilteredCoins([]);
    setCoins([]);
  };

  const rateChanged = (currency) => {
    setExchangeRate(currency);
    resetCoins();
    loadData(currentBtn, currency);
  };

  const toggleRequest = (value) => {
    if (currentBtn != value) {
      toggleActiveBtn(value);
      coinFetchService.cancelFetchCoins();
      resetCoins();
      loadData(value);
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = coins.filter((item) => {
        let coinName = currentBtn ? item.asset_id_quote : item.name;
        coinName = coinName ? coinName.toUpperCase() : "".toUpperCase();
        return coinName.indexOf(text.toUpperCase()) > -1;
      });
      setFilteredCoins(newData);
      setSearch(text);
    } else {
      setFilteredCoins(coins);
      setSearch(text);
    }
  };

  function ItemRender(props) {
    return (
      <MarketCard
        coinData={props.coinData}
        exchangerate={exchangerate}
        isAll={currentBtn}
        navigation={navigation}
        style={{
          alignSelf: "center",
        }}
      />
    );
  }

  return (
    <StatusBarScreen>
      <View style={styles.container}>
        <View>
          <View style={styles.horFilterBtnContainer}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  toggleRequest(false);
                }}
              >
                <ActiveButton isActive={!currentBtn} title="Top 100" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  toggleRequest(true);
                }}
              >
                <ActiveButton isActive={currentBtn} title="All" />
              </TouchableOpacity>

              <View style={{ flexGrow: 1 }} />

              <Picker
                mode="dropdown"
                selectedValue={exchangerate}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) => {
                  rateChanged(itemValue);
                  //console.log(itemValue);
                }}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="INR" value="INR" />
              </Picker>

              <AntDesign
                name="search1"
                size={20}
                style={styles.serachIcon}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.create(
                      100,
                      LayoutAnimation.Types.linear,
                      LayoutAnimation.Properties.opacity
                    )
                  );
                  toggleSearchBar(!showSearchBar);
                }}
              />
            </View>
          </View>
          {showSearchBar && (
            <SearchBar
              lightTheme={true}
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={(text) => searchFilterFunction("")}
              placeholder="Coint name..."
              value={search}
            />
          )}
        </View>
        {!loading && (
          <>
            {currentBtn && (
              //'all' flat list
              <FlatList
                data={filteredCoins}
                keyExtractor={(coin) => coin.asset_id_quote}
                renderItem={({ item }) => <ItemRender coinData={item} />}
              />
            )}
            {!currentBtn && (
              //'top 100' flat list
              <FlatList
                data={filteredCoins}
                keyExtractor={(coin) => coin.id}
                renderItem={({ item }) => <ItemRender coinData={item} />}
              />
            )}
          </>
        )}
        {loading && <ActivityIndicator />}
      </View>
    </StatusBarScreen>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "blue",
    borderWidth: 0.5,
    borderColor: "#d6d7da",
  },

  horFilterBtnContainer: {
    flexDirection: "row",
    backgroundColor: colors.primary,
  },

  pickerStyle: {
    alignSelf: "center",
    width: "23%",
  },

  serachIcon: {
    alignSelf: "center",
    marginEnd: 15,
  },

  container: {
    flex: 1,
  },
});

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market"
        options={{
          headerShown: false,
        }}
        component={MarketScreen}
      />
      <Stack.Screen
        name="Trade"
        options={{
          headerShown: true,
        }}
        component={TradeScreen}
      />
    </Stack.Navigator>
  );
};
