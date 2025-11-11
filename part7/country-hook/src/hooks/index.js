import { useState, useEffect } from "react";
import axios from "../services/axios.js";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};


export const useCountry = (name) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!name) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      try {
        const countryData = await axios.getCountry(name);
        const climateData = await axios.getClimate(name);
        setData({ ...countryData, climate: climateData });
      } catch (error) {
        console.error("Error fetching country:", error);
        setData(null);
      }
    };

    fetchData();
  }, [name]);

  return data;
};