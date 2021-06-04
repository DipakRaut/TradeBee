import React, { PureComponent } from "react";
import {
  LayoutAnimation,
  Text,
  Image,
  TouchableOpacity,
  UIManager,
  Platform,
  Button,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import colors from "./colors";
import MyCard from "./MyCard";
import PercentageDiffText from "./PercentageDiffText";
import TextButton from "./TextButton";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const cryptoIcon = "https://cryptoicons.org/api/color/";
const iconWidth = "/64";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const someData = [];
data.forEach((item) => {
  someData.push({
    earnings: item.earnings,
  });
});

console.log(someData);

/**
 * Using pure component for stop re-rendering of item in flat list
 * Check this for more details
 * https://stackoverflow.com/questions/44743904/virtualizedlist-you-have-a-large-list-that-is-slow-to-update
 */
class MarketCard extends PureComponent {
  state = {
    showDetail: false,
  };

  initCoinData() {
    this.props.isAll ? this.loadFromAll() : this.loadFromTop();
  }

  loadFromAll() {
    const coinData = this.props.coinData;
    this.coinName = coinData.asset_id_quote;
    this.currentPrice = coinData.rate;
    this.symbol = coinData.asset_id_quote;
  }

  loadFromTop() {
    const coinData = this.props.coinData;
    this.coinName = coinData.name;
    this.currentPrice = coinData.current_price;
    this.symbol = coinData.symbol;
    this.coinChangePercentage = [
      {
        title: "Past hour",
        value: this.props.coinData.price_change_percentage_1h_in_currency,
      },
      {
        title: "Past 24 hour",
        value: this.props.coinData.price_change_percentage_24h_in_currency,
      },
      {
        title: "Past 7 days",
        value: this.props.coinData.price_change_percentage_7d_in_currency,
      },
      {
        title: "Past 14 days",
        value: this.props.coinData.price_change_percentage_14d_in_currency,
      },
      {
        title: "Past 30 days",
        value: this.props.coinData.price_change_percentage_30d_in_currency,
      },
    ];
    this.imageUrl = coinData.image;
  }

  render() {
    this.initCoinData();

    const navigation = this.props.navigation;
    let imageUrl = this.imageUrl;

    if (typeof imageUrl === "undefined") {
      imageUrl = cryptoIcon + this.symbol.toLowerCase() + iconWidth;
    }

    const fixed = this.currentPrice.toFixed(2).toString();
    let tenPower = this.currentPrice.toString().indexOf(".");
    tenPower = this.currentPrice.toString().length - tenPower;

    return (
      <MyCard style={this.props.style}>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.create(
                100,
                LayoutAnimation.Types.linear,
                LayoutAnimation.Properties.opacity
              )
            );
            this.setState({ showDetail: !this.state.showDetail });
          }}
        >
          <View style={cardStyle.coinContainer}>
            <Image
              style={cardStyle.cointImage}
              source={{ uri: imageUrl, cache: "only-if-cached" }}
            />
            <Text style={cardStyle.coinName}>{this.coinName}</Text>

            <View style={{ flexGrow: 1 }} />

            <View style={cardStyle.priceContainer}>
              <Text style={cardStyle.price}>{fixed + "x10"}</Text>
              <Text style={cardStyle.tenPower}>{tenPower}</Text>
            </View>
          </View>
          {this.state.showDetail && (
            <>
              {!this.props.isAll && (
                <>
                  <FlatList
                    data={this.coinChangePercentage}
                    keyExtractor={(coinChange) => coinChange.title}
                    renderItem={({ item }) => {
                      return (
                        <PercentageDiffText
                          title={item.title}
                          value={item.value}
                          titleStyle={cardStyle.marketScreenTextStyle}
                          valueStyle={cardStyle.marketScreenTextStyle}
                        />
                      );
                    }}
                  />
                </>
              )}
              <View style={cardStyle.showDetailContainer}>
                <TextButton
                  onPress={() => {
                    navigation.navigate("Trade", {
                      coinName: this.coinName,
                      exchangerate: this.props.exchangerate,
                      coinSymbol: this.symbol,
                      coinPrice: this.currentPrice,
                    });
                  }}
                  btnTextStyle={cardStyle.detailButton}
                  title="Trade"
                />
                <TextButton
                  onPress={() => {
                    navigation.navigate("GraphScreen", {
                      coinName: this.symbol,
                    });
                  }}
                  btnTextStyle={cardStyle.detailButton}
                  title="Show Details"
                />
              </View>
            </>
          )}
        </TouchableOpacity>
      </MyCard>
    );
  }
}

const cardStyle = StyleSheet.create({
  coinContainer: {
    flexDirection: "row",
  },

  cointImage: {
    width: 35,
    height: 35,
    margin: 10,
  },

  price: {
    fontSize: 16,
  },

  tenPower: {
    fontSize: 10,
    lineHeight: 15,
  },

  priceContainer: {
    margin: 10,
    flexDirection: "row",
    alignSelf: "center",
  },

  coinName: {
    fontWeight: "300",
    alignSelf: "center",
    fontSize: 22,
  },

  detailButton: {
    marginHorizontal: 8,
    fontSize: 18,
    color: colors.secondary,
  },

  marketScreenTextStyle: {
    fontSize: 18,
    margin: 10,
  },

  showDetailContainer: {
    flexDirection: "row-reverse",
  },
});

export default MarketCard;
