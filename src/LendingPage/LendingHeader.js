import React, { useEffect } from "react";
import Logo from "../components/Logo";
import Button from "@mui/material/Button";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar"; 
import Container from "@mui/material/Container"; 
import AccountPopover from "src/layouts/dashboard/AccountPopover";
import { InitSwAuth } from "@skill-wallet/auth";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const skillWallet=process.env.REACT_APP_SKILL_WALLET;

export default function LendingHeader() {
  const navigate = useNavigate();
  const { authenticate, user, isAuthenticated } = useMoralis(); 
 
  useEffect(() => {
    InitSwAuth();
  }, [user]);  
  
  const agreement = () => {
    if (isAuthenticated && user) {
      navigate("/dashboard/Agreement");
    } else {
      toast.info("Please connect the wallet!");
    }
  };

  return ( 
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0,display:'flex',justifyContent:'flex-end' }}> 
            <Button
              onClick={agreement}
              variant="outlined"
              style={{ margin: "0 5px" }}
            >
            Dashboard
            </Button>

            <sw-auth  
              partner-key={skillWallet}
              use-dev="true" 
            ></sw-auth>

            {user == null ? (
              <Button
                variant="contained"
                onClick={async () => {
                  await authenticate(); 
                  navigate("/dashboard/Agreement");
                }}
              >
                Connect
              </Button>
            ) : (
              <AccountPopover />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
