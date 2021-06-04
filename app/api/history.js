import apiClient from "./client";

const historyEndpoint = "exchangerate/";

const gettingHistory = (crypto_coin, currency, time_start, time_end) =>
  apiClient.coinIO.get(
    historyEndpoint + crypto_coin + "/" + currency + "/history",
    {
      period_id: "1DAY",
      time_start: time_start,
    }
  );

export default {
  gettingHistory,
};
