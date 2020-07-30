import React, { useContext, useEffect, useState } from "react";
import TectonContext from "../contexts/tecton";

export default () => {
  const q2 = useContext(TectonContext);
  const [data, setData] = useState();

  useEffect(async () => {
    // Request data from the `default` endpoint in our request handler
    const response = await q2.sources.requestExtensionData({
      route: "default"
    });

    setData(response.data);
    // Turn off the loading spinner now that the data fetch is done
    q2.actions.setFetching(false);
  }, []);

  return <p>{data || "Loading"}</p>;
};