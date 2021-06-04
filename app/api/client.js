import { create } from "apisauce";
import axios from "axios";

const source = axios.CancelToken.source();

//Use api key from 'apikey.7z', for personal use, get key from 'coinapi.io'.
const coinIO = create({
  baseURL: "https://rest.coinapi.io/v1/",
  headers: {
    "X-CoinAPI-Key": "Use coin api key here",
  },
  cancelToken: source.token,
});

const coinGeko = create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

const cancelRequest = () => source.cancel;

export default {
  coinIO,
  coinGeko,
  cancelRequest,
};
