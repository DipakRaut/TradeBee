import apiClient from "./client";

const coinIOEndPoint = "exchangerate/";

const fetchCoins = (baseId) => apiClient.coinIO.get(coinIOEndPoint + baseId);

const cancelFetchCoins = () => apiClient.cancelRequest;

const coinGekoEndPoint = "coins/markets";
const price_change_percentage = "1h,24h,7d,14d,30d";

const latestHistory = (currency) =>
  apiClient.coinGeko.get(coinGekoEndPoint, {
    vs_currency: currency,
    price_change_percentage: price_change_percentage,
  });

export default {
  fetchCoins,
  cancelFetchCoins,
  latestHistory,
};
