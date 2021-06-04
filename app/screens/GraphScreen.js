import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { useRoute, useFocusEffect } from "@react-navigation/native";
import HistoryData from "../api/history";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import ActivityIndicator from "../components/ActivityIndicator";
import { coinRepo } from "../utility/globals";
import StatusBarScreen from "../components/StatusBarScreen";
import SearchableDropDown from "../components/SearchableDropdown";
import AppButton from "../components/AppButton";

function GraphScreen(props) {
  const [loading, setLoading] = useState(true);
  const [graph, setGraph] = useState([]);
  const route = useRoute();
  const [coins, setCoins] = useState([]);
  const [coinName, setCoinName] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      loadCoins();

      if (route.params.coinName !== "null") {
        setCoinName(route.params.coinName);
        temp(route.params.coinName);
      } else {
        setLoading(false);
      }

      return () => {
        clearData();
      };
    }, [route.params.coinName])
  );

  const clearData = () => {
    setCoinName(null);
    setGraph([]);
  };

  let d = new Date();
  d.setDate(d.getDate() - 7);

  const graph_items = [];

  const loadCoins = () => {
    let tempData = coinRepo.get("top", "INR");
    setCoins(tempData);
  };

  const temp = async (cN) => {
    setLoading(true);
    const data = await HistoryData.gettingHistory(
      cN.toUpperCase(),
      "USD",
      d.toISOString()
    );

    if (data.ok) {
      data.data.forEach((item) => {
        graph_items.push({ time: item.time_close, rate: item.rate_close });
        setGraph(graph_items);
      });
    } else {
      console.log(data.problem);
    }
    setLoading(false);
  };

  return (
    <StatusBarScreen style={styles.container}>
      <View style={{ width: "100%" }}>
        <SearchableDropDown
          onTextChange={(text) => {
            /*do nothing*/
          }}
          containerStyle={{ padding: 5 }}
          onItemSelect={(item) => {
            setCoinName(item.name);
            temp(item.symbol);
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: "#222",
          }}
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
          }}
          items={coins}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: "#FAF9F8",
            borderColor: "#bbb",
            borderWidth: 1,
          }}
          placeholder={
            coinName === null ? "Coin name..." : coinName.toUpperCase()
          }
          itemsContainerStyle={{ width: "100%", height: "60%" }}
        />
      </View>
      {loading && <ActivityIndicator />}
      {!loading && (
        <View style={styles.chartHolderContainer}>
          {coinName !== null && (
            <View>
              <View style={{ marginTop: 20 }}>
                {loading && <ActivityIndicator />}
                {!loading && (
                  <VictoryChart
                    domainPadding={20}
                    theme={VictoryTheme.material}
                  >
                    <VictoryAxis
                      tickValues={[1, 2, 3, 4, 5, 6]}
                      tickFormat={["1", "2", "3", "4", "5", "6", "7"]}
                      label="Graph Analysis of Past 7 Days"
                      style={{
                        axisLabel: { padding: 40 },
                      }}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(x) => `${x / 1000}k`}
                    />
                    <VictoryBar
                      data={graph}
                      x="time"
                      y="rate"
                      style={{ data: { fill: "#FFE663" } }}
                      barRatio={0.7}
                    />
                  </VictoryChart>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <AppButton
                  title="1 Day"
                  style={{
                    width: "30%",
                    fontSize: 10,
                    margin: 4,
                    padding: 4,
                  }}
                />
                <AppButton
                  title="1 Week"
                  style={{
                    width: "30%",
                    fontSize: 10,
                    margin: 4,
                    padding: 2,
                  }}
                />
                <AppButton
                  title="1 Month"
                  style={{
                    width: "30%",
                    fontSize: 10,
                    margin: 4,
                    padding: 2,
                  }}
                />
              </View>
            </View>
          )}
          {coinName === null && (
            <View>
              <Text style={styles.requestingText}>
                Please enter a coin name
              </Text>
            </View>
          )}
        </View>
      )}
    </StatusBarScreen>
  );
}

export default GraphScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  chartHolderContainer: {
    flex: 1,
  },

  requestingText: {
    fontWeight: "600",
    fontSize: 20,
    alignSelf: "center",
  },
});

// import React, { useEffect, useState } from "react";
// <<<<<<< HEAD
// import {
//   View,
//   StyleSheet,
//   FlatList,
//   ScrollView,
//   TextInput,
//   Button,
// } from "react-native";

// import { useRoute } from "@react-navigation/native";
// import AppTextInput from "../components/AppTextInput";
// import AppText from "../components/AppText";
// import Coin from "../components/Coin";
// import Apidata from "../api/client";
// import HistoryData from "../api/history";
// import {
//   VictoryBar,
//   VictoryChart,
//   VictoryTheme,
//   VictoryAxis,
// } from "victory-native";
// import ActivityIndicator from "../components/ActivityIndicator";
// import AppButton from "../components/AppButton";

// function GraphScreen(props) {
//   const [coins, setCoins] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [graph, setGraph] = useState([]);
//   const route = useRoute();

//   const { coinName } = route.params;
//   console.log(coinName);
//   let d = new Date();
//   d.setDate(d.getDate() - 7);

//   const graph_items = [];

//   useEffect(() => {
//     temp();
//   }, []);

//   const temp = async () => {
//     const data = await HistoryData.gettingHistory(
//       coinName.toUpperCase(),
//       "USD",
//       d.toISOString()
//     );
//     // console.log(data.data);
// =======
// import { Text, View, StyleSheet } from "react-native";

// import { useRoute } from "@react-navigation/native";
// import HistoryData from "../api/history";
// import { VictoryBar, VictoryChart } from "victory-native";
// import ActivityIndicator from "../components/ActivityIndicator";
// import { coinRepo } from "../utility/globals";
// import StatusBarScreen from "../components/StatusBarScreen";
// import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
// import SearchableDropDown from "../components/SearchableDropdown";

// function GraphScreen(props) {
//   const [loading, setLoading] = useState(true);
//   const [graph, setGraph] = useState([]);
//   const route = useRoute();
//   const [search, setSearch] = useState("");
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [coinName, setCoinName] = useState(null);

//   let d = new Date();
//   d.setDate(d.getDate() - 7);

//   console.log(route.params.coinName);

//   const graph_items = [];

//   useEffect(() => {
//     loadCoins();

//     if (route.params.coinName !== "null") {
//       setCoinName(route.params.coinName);
//       setSearch(route.params.coinName);
//       temp(route.params.coinName);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const loadCoins = () => {z
//     let tempData = coinRepo.get("top", "INR");
//     setCoins(tempData);
//     setFilteredCoins(coinRepo.get("top", "INR"));
//   };

//   const temp = async (cN) => {
//     setLoading(true);
//     const data = await HistoryData.gettingHistory(
//       cN.toUpperCase(),
//       "USD",
//       d.toISOString()
//     );

// >>>>>>> 67786ef5a9c2c2950184d37bc888e85356cfbd7f
//     if (data.ok) {
//       data.data.forEach((item) => {
//         graph_items.push({ time: item.time_close, rate: item.rate_close });
//         setGraph(graph_items);
//       });
// <<<<<<< HEAD
//       //   console.log(graph_items);
// =======
// >>>>>>> 67786ef5a9c2c2950184d37bc888e85356cfbd7f
//     } else {
//       console.log(data.problem);
//     }
//     setLoading(false);
//   };

// <<<<<<< HEAD
//   return (
//     <View>
//       <View style={{ marginTop: 80 }}>
//         {loading && <ActivityIndicator />}
//         {!loading && (
//           <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
//             <VictoryAxis
//               tickValues={[1, 2, 3, 4, 5, 6]}
//               tickFormat={["1", "2", "3", "4", "5", "6", "7"]}
//               label="Graph Analysis of Past 7 Days"
//               style={{
//                 axisLabel: { padding: 40 },
//               }}
//             />
//             <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}k`} />
//             <VictoryBar
//               data={graph}
//               x="time"
//               y="rate"
//               style={{ data: { fill: "#FFE663" } }}
//               barRatio={0.7}
//             />
//           </VictoryChart>
//         )}
//       </View>

//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 60,
//         }}
//       >
//         <AppButton
//           title="1 Day"
//           style={{ width: "30%", fontSize: 10, margin: 4, padding: 4 }}
//         />
//         <AppButton
//           title="1 Week"
//           style={{ width: "30%", fontSize: 10, margin: 4, padding: 2 }}
//         />
//         <AppButton
//           title="1 Month"
//           style={{
//             width: "30%"  ,
//             fontSize: 10,
//             margin: 4,
//             padding: 2,
//           }}
//         />
//       </View>
//     </View>
// =======
//   const searchFilterFunction = (text) => {
//     if (text) {
//       const newData = coins.filter((item) => {
//         let tempCointName = item.name;
//         tempCointName = tempCointName
//           ? tempCointName.toUpperCase()
//           : "".toUpperCase();
//         return tempCointName.indexOf(text.toUpperCase()) > -1;
//       });
//       setFilteredCoins(newData);
//       setSearch(text);
//     } else {
//       setFilteredCoins(coins);
//       setSearch(text);
//     }
//   };

//   return (
//     <StatusBarScreen style={styles.container}>
//       <View style={{ width: "100%" }}>
//         <SearchableDropDown
//           onTextChange={(text) => console.log(text)}
//           containerStyle={{ padding: 5 }}
//           onItemSelect={(item) => {
//             setCoinName(item.name);
//             temp(item.symbol);
//             console.log(item);
//           }}
//           itemTextStyle={{
//             //text style of a single dropdown item
//             color: "#222",
//           }}
//           textInputStyle={{
//             //inserted text style
//             padding: 12,
//             borderWidth: 1,
//           }}
//           items={coins}
//           itemStyle={{
//             //single dropdown item style
//             padding: 10,
//             marginTop: 2,
//             backgroundColor: "#FAF9F8",
//             borderColor: "#bbb",
//             borderWidth: 1,
//           }}
//           placeholder={
//             coinName === null ? "Coin name..." : coinName.toUpperCase()
//           }
//           itemsContainerStyle={{ width: "100%", height: "60%" }}
//         />
//       </View>
//       {loading && <ActivityIndicator />}
//       {!loading && (
//         <View style={styles.chartHolderContainer}>
//           {coinName !== null && (
//             <VictoryChart>
//               <VictoryBar data={graph} x="time" y="rate" />
//             </VictoryChart>
//           )}
//           {coinName === null && (
//             <Text style={styles.requestingText}>Please set coin name</Text>
//           )}
//         </View>
//       )}
//     </StatusBarScreen>
// >>>>>>> 67786ef5a9c2c2950184d37bc888e85356cfbd7f
//   );
// }

// export default GraphScreen;

// const styles = StyleSheet.create({
// <<<<<<< HEAD
//   container: {},
// =======
//   container: {
//     flex: 1,
//   },

//   chartHolderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   requestingText: {
//     fontWeight: "600",
//     fontSize: 20,
//   },
// >>>>>>> 67786ef5a9c2c2950184d37bc888e85356cfbd7f
// });
