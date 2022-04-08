import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { useMoralis } from "react-moralis";
import { Framework, createSkipPaging } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

import BigNumber from "bignumber.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { gql } from "graphql-request";
import { sfSubgraph, sfApi } from "src/redux/store";
import { toast } from "react-toastify";
import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TableCell,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { networks } from "src/redux/networks";

import { GetSenderStream } from "../../context/GetSenderStreamContex";
import { SuperfluidWeb3Context } from "src/context/SuperfluidContext";

export const url = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`;
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
const USDCx = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

const ANIMATION_MINIMUM_STEP_TIME = 80;

function GetSubscriberStream(props) {
  const [isLoadingcon, setIsLoaing] = useState(false);
  const { user } = useMoralis();
  const navigate = useNavigate();

  const supweb3Context = React.useContext(SuperfluidWeb3Context);
  const { outgoingFlows, getSubAddress, subTotal, subflow } = supweb3Context;

  const [weiValue, setWeiValue] = useState(subflow?.streamedUntilUpdatedAt);

  useEffect(async () => {
    getSubAddress(props.data.subscriberAddress); 
  }, [props]);

  const balanceTimestampMs = useMemo(
    () => subflow && ethers.BigNumber.from(subflow?.updatedAtTimestamp).mul(1000),
    [subflow]
  );

  useEffect(() => {
    if (subflow !== undefined) {
      const flowRateBigNumber =
      subflow && ethers.BigNumber.from(subflow?.currentFlowRate);
      if (flowRateBigNumber && flowRateBigNumber.isZero()) {
        return; // No need to show animation when flow rate is zero.
      }

      const balanceBigNumber = ethers.BigNumber.from(
        subflow && subflow?.streamedUntilUpdatedAt
      );

      let stopAnimation = false;
      let lastAnimationTimestamp = 0;

      const animationStep = (currentAnimationTimestamp) => {
        if (stopAnimation) {
          return;
        }

        if (
          currentAnimationTimestamp - lastAnimationTimestamp >
          ANIMATION_MINIMUM_STEP_TIME
        ) {
          const currentTimestampBigNumber = ethers.BigNumber.from(
            new Date().valueOf() // Milliseconds elapsed since UTC epoch, disregards timezone.
          );

          setWeiValue(
            balanceBigNumber.add(
              currentTimestampBigNumber
                .sub(balanceTimestampMs)
                .mul(flowRateBigNumber)
                .div(1000)
            )
          );

          lastAnimationTimestamp = currentAnimationTimestamp;
        }

        window.requestAnimationFrame(animationStep);
      };

      window.requestAnimationFrame(animationStep);

      return () => {
        stopAnimation = true;
      };
    }
  }, [subflow]);

  useEffect(() => {
    outgoingFlows();
  });

  

  if(weiValue !== undefined){
    return (
      <TableRow>
        <TableCell>
          <List sx={{ pt: 0 }}>
            <ListItem
              button
              //   onClick={() => handleListItemClick()}
            >
              <Avatar
                alt={props.data?.subscriber}
                src={props.data?.subscriberAllData?.Avatar?.url}
              />
              <ListItemText primary={props.data?.subscriber?.slice(0, 10)} />
            </ListItem>
          </List>
        </TableCell>
  
        <TableCell>{props.data?.subscriberAddress?.slice(0, 10)}</TableCell>
        <TableCell>{weiValue ? ethers.utils.formatEther(weiValue).slice(0,10): <CircularProgress/>} USDCx</TableCell>
  
        <TableCell>
          {moment(props.data.createdAt).format("MMMM Do YYYY")}
        </TableCell>
        <TableCell>{props.data.subscriptionDuration}</TableCell>
      </TableRow>
    );
  } else{
    return (
      <TableRow>
        <TableCell>
          <CircularProgress/>
        </TableCell>
      </TableRow>
    );
  }
}

export default GetSubscriberStream;
