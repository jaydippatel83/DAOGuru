import React, { useState, createContext, useEffect, useCallback } from "react";

import { useMoralis } from "react-moralis";
import { Framework, createSkipPaging } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

import { Hyphen, RESPONSE_CODES, SIGNATURE_TYPES } from "@biconomy/hyphen";

export const HyphenBridgeWeb3Context = createContext(undefined);

export const HyphenBridgeWeb3ContextProvider = (props) => {
  const [isLoadingcon, setIsLoaing] = useState(false);
  const { user } = useMoralis();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  let hyphen = new Hyphen(window.ethereum, {
    debug: true, // If 'true', it prints debug logs on console window
    environment: "test", // It can be "test" or "prod"
    // onFundsTransfered: (data) => {
    //   // Optional Callback method which will be called when funds transfer across
    //   // chains will be completed
    // },
  });

  async function initalize() {
    await hyphen.init();
  }

  

  async function TransferToken(transferData) {
   await initalize(); 
    let preTransferStatus = await hyphen.depositManager.preDepositStatus({
      tokenAddress: transferData.tokenAddress, // Token address on fromChain which needs to be transferred
      amount: transferData.amount, // Amount of tokens to be transferred in smallest unit eg wei
      fromChainId: transferData.fromChainId, // Chain id from where tokens needs to be transferred
      toChainId: transferData.toChainId, // Chain id where tokens are supposed to be sent
      userAddress: user?.attributes?.ethAddress, // User wallet address who want's to do the transfer
    });
     

    if (preTransferStatus.code === RESPONSE_CODES.OK) { 
      let approveTx = await hyphen.tokens.approveERC20(
        transferData.tokenAddress,
        preTransferStatus.depositContract,
        transferData.amount.toString()
      );

      await approveTx.wait(2);
      let depositTx = await hyphen.depositManager.deposit({
        sender: user?.attributes?.ethAddress, 
        receiver: user?.attributes?.ethAddress,
        tokenAddress: transferData.tokenAddress,
        depositContractAddress: transferData.liquidityPool, //LiquidityPool address on fromChain
        amount: transferData.amount, //Amount to be transferred. Denoted in smallest unit eg in wei",
        fromChainId: transferData.fromChainId, // chainId of fromChain
        toChainId: transferData.toChainId, // chainId of toChain
        useBiconomy: false, // OPTIONAL boolean flag specifying whether to use Biconomy for gas less transaction or not
        tag: "trustified_network", // Can be any string, emitted from the contract during the deposit call; used for analytics
      });

      // Wait for 1 block confirmation
      await depositTx.wait(1);
    } else if (preTransferStatus.code === RESPONSE_CODES.ALLOWANCE_NOT_GIVEN) {
      alert(
        "Not enough apporval from user address on LiquidityPoolManager contract on fromChain"
      );
      let approveTx = await hyphen.tokens.approveERC20(
        transferData.tokenAddress,
        preTransferStatus.depositContract,
        transferData.amount.toString()
      );
      await approveTx.wait(2);
    } else if (preTransferStatus.code === RESPONSE_CODES.UNSUPPORTED_NETWORK) {
      alert("Target chain id is not supported yet");
    } else if (preTransferStatus.code === RESPONSE_CODES.NO_LIQUIDITY) {
      alert("No liquidity available on target chain for given tokenn");
    } else if (preTransferStatus.code === RESPONSE_CODES.UNSUPPORTED_TOKEN) {
      alert("Requested token is not supported on fromChain yet");
    } else {
      alert("unexpected error");
    }
  }

  return (
    <HyphenBridgeWeb3Context.Provider
      value={{
        TransferToken,
      }}
      {...props}
    >
      {props.children}
    </HyphenBridgeWeb3Context.Provider>
  );
};
