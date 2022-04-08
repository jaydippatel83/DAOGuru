import React, { useEffect, useRef, useState } from "react";
 
const AnimatedBalance = ({
  value,
  rate,
  timeout = 100,
  decimalPlaces = 7
}) => {
  const [valueShow, setValueShow] = useState(value);
  useEffect(() => {
    setValueShow(value);
    const id = setInterval(() => {
      setValueShow((currValue) => {
        return currValue + rate / (1000 / timeout);
      });
    }, timeout);
    return () => {
      clearInterval(id);
    };
  }, [value, rate]);
  return <p>{valueShow}</p>;
};

export default AnimatedBalance;
