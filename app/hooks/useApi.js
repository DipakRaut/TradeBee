import React, { useEffect, useState } from "react";

function useApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //   useEffect(() => {
  //     console.log("Inside useEffect");
  //     console.log(data);
  //   }, [data]);

  const loadData = async (apiFunc) => {
    setData([]);
    setLoading(true);
    let response = await apiFunc;
    setLoading(false);
    if (!response.ok) {
      setError(true);
    } else {
      setError(false);
      setData((preData) => [response.data]);
    }
  };

  return {
    data,
    loading,
    error,
    loadData,
  };
}

export default useApi;
