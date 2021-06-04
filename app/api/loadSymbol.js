import React from "react";
import { create } from "apisauce";

const width = "/200";

const cryptoIcon = create({
  baseUrl: "https://cryptoicons.org/api/",
});

const loadMetadata = (currency) =>
  cryptoIcon.get("icon/" + currency.toLowerCase() + width);

export default loadMetadata;
