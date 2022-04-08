import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useMoralisCloudFunction, useMoralis } from "react-moralis";
import { styled } from "@mui/material/styles";
import HiringList from "src/sections/products/HiringList";
import HiringCard from "src/sections/products/HiringCard";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
});

function HiringLists() {
  const [prod, setProd] = useState([]);
  const { user } = useMoralis();
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
    <div className="container-fluid  mt-5 mb-5">
      <div className="row">
        <div className="col-12  ">
          <p className="network pt-4">All Hirings</p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {prod &&
            prod.map((e) => {
              return (
                <div key={e.id} className="col-12 col-lg-4 col-md-4">
                  <HiringCard product={e} users={user} />
                </div>
              );
            })}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 network">
          {/* <Button  onClick={handleNavigateService} variant="contained">View all Services</Button> */}
        </div>
      </div>
    </div>
  );
}

export default HiringLists;
