import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import { CardActions, CardContent, Stack, Typography } from "@mui/material";
import "./Lending.css";
import Box from "@mui/material/Box";
import { Card } from "react-bootstrap";

import { alpha, styled } from "@mui/material/styles";
import Iconify from "../components/Iconify";
import AgreementRoot from "./AgreementRoot";
import CryptoRoot from "./CryptoRoot";
import SubscriptionRoot from "./SubscriptionRoot";
import ProductRoot from "./ProductRoot";
import InvoicingRoot from "./InvoicingRoot";
import AnalyticsRoot from "./AnalyticsRoot";
import landing_product from "./Landing_product/landingproduct";
import Landingproduct from "./Landing_product/landingproduct";
import Landingservice from "./Landing_product/landingservice";
import Landinghiring from "./Landing_product/landinghiring";
import { Link as RouterLink, useNavigate } from "react-router-dom"; 
 
  

export default function Lending() {
  const navigate = useNavigate();
  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    border: "none",
    textAlign: "center",
    padding: theme.spacing(5, 5),
    color: theme.palette.primary.main,
  }));

  const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0
    )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
  }));

  const handleNavigateProduct=()=>{
    navigate("/landingproduct");
  }
  const handleNavigateService=()=>{
    navigate("/landingservice");
  }
  const handleNavigateHiring=()=>{
    navigate("/landinghiring");
  }
  return (
    <Fragment>
      <div className="container-fluid p-5 mb-5">
        <div className="row">
          <div className="col-10 mx-auto mt-5">
            <p className="peragraph">
            Decentralized <span
                style={{
                  color: " #D82148",
                }}
              >
                Business
              </span>{" "} Enabler and  <span
                style={{
                  color: " #D82148",
                }}
              >
                Growth
              </span>{" "} Platform for {" "}
              <span
                style={{
                  color: " #D82148",
                }}
              >
                DAOs
              </span>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="container  mt-5 mb-5 ">
        <div className="row">
          {/* <div className="col-12  ">
            <p className="network pt-4">Key Features</p>
          </div> */}
        </div>
        <div className="row">
          <div className="col-12 col-lg-4 col-md-4 mt-4">
            <AgreementRoot />
          </div>
          <div className="col-12 col-lg-4 col-md-4 mt-4">
            <CryptoRoot />
          </div>
          <div className="col-12 col-lg-4 col-md-4 mt-4">
            <SubscriptionRoot />
          </div>
          <div className="col-12 col-lg-4 col-md-4 mt-4">
            <ProductRoot />
          </div>
          <div className="col-12 col-lg-4 col-md-4 mt-4">
            <InvoicingRoot />
          </div>
          <div className="col-12 col-lg-4 col-md-4 mt-4">
            <AnalyticsRoot />
          </div>
        </div>
      </div>

      <div
        className="container-fluid mt-5"
        style={{ backgroundColor: "#F2F3F6", paddingBottom: "60px" }}
      >
        <div className="row">
          <div className="col-12  ">
            <p className="network pt-4">Products</p>
          </div>
        </div>
        <div className="container ">
          <Landingproduct />
        </div>
        <div className="row mt-4">
          <div className="col-12 network">
            <Button onClick={handleNavigateProduct} variant="contained">View all products</Button>
          </div>
        </div>
      </div>
      <div className="container-fluid  mt-5 mb-5">
        <div className="row">
          <div className="col-12  ">
            <p className="network pt-4">Services</p>
          </div>
        </div>
        <div className="container">
          <Landingservice />
        </div>
        <div className="row mt-4">
          <div className="col-12 network">
            <Button  onClick={handleNavigateService} variant="contained">View all Services</Button>
          </div>
        </div>
      </div>
      <div className="container-fluid  mt-5" style={{ backgroundColor: "#F2F3F6", paddingBottom: "60px" }}>
        <div className="row">
          <div className="col-12  ">
            <p className="network pt-4">Hiring</p>
          </div>
        </div>
        <div className="container">
          <Landinghiring />
        </div>
        <div className="row mt-4">
          <div className="col-12 network">
            <Button onClick={handleNavigateHiring} variant="contained">View all Hirings</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
