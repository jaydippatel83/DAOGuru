import { Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { styled } from "@mui/material/styles";
import HiringCard from "src/sections/products/HiringCard";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
});
function Landinghiring() {
  const [prod, setProd] = useState([]);
  const {user}= useMoralis();
  const { fetch, data, error, isLoading } = useMoralisCloudFunction(
    "getHirings",
    {
      autoFetch: true,
    }
  );

  useEffect(() => {
    setProducts();
  }, [data]);

  async function setProducts() {
    const product = await JSON.parse(JSON.stringify(data)); 
    setProd(product);
  }

  useEffect(() => {
    fetch();
  }, [isLoading]); 
  
  return (
    <div className="row">
    {prod &&
      prod.map((e,i) => {
        if(i < 3){
          return (
            <div key={e.id} className="col-12 col-lg-4 col-md-4">
                  <HiringCard product={e} users={user} />
                </div>
              );
        }
          })}
      </div>
  );
}

export default Landinghiring;
