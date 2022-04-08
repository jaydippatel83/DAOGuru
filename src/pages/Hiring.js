import {
  Card,
  CircularProgress,
  Grid,
  Tab,
  TableBody,
  Tabs,
} from "@mui/material";
import {
  Button,
  Container,
  Stack,
  Box,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Iconify from "src/components/Iconify";
import { Web3Context } from "src/context/Web3Context";
import CreateSubscribtionModal from "src/modal/CreateSubscribtionModal";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Page from "../components/Page";
import { SuperfluidWeb3Context } from "../context/SuperfluidContext";
import IncommingStream from "src/components/subscription/incomingStream";
import Subscribers from "src/components/subscription/subscribers";
import OutgoingStream from "src/components/subscription/outgoinStream";
import OutgoingTab from "../components/subscription/tabs/outgoingTab";
import IncomingTab from "../components/subscription/tabs/incomingTab";
import TableSubView from "src/components/subscription/table/TableView";
import CreateHiringModal from "src/modal/CreateHiringModal";
import ShopProductCard from "src/sections/products/ProductCard";
import HiringList from "src/sections/products/HiringList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

function HiringPage() {
  const { Moralis, account, user } = useMoralis();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prod, setProd] = useState([]);

  const { fetch, data, error } = useMoralisCloudFunction("getHirings", {
    autoFetch: true,
  });

  useEffect(() => {
    setProducts();
  }, [data, isUpdate]);

  useEffect(() => {
    fetch();
  }, [isUpdate]);

  async function setProducts() {
    const product = await JSON.parse(JSON.stringify(data)); 
    const s =
      data &&
      product.filter(
        (e) => e?.user == user?.attributes?.username
      );  
   data &&  setProd(s);
  }

  const handlOpenHiring = () => {
    setOpen(true);
  };
  const handleCloseHiring = () => {
    setOpen(false);
  };

  return (
    <Page title="Subscriptions |  Trustified Network">
      <CreateHiringModal
        open={handlOpenHiring}
        close={handleCloseHiring}
        op={open}
        update={setIsUpdate}
        state={isUpdate}
        setLoading={setLoading}
        currentUser={user}
      />
      <Container pl={0} pr={0}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Hiring
          </Typography>
          <Button
            variant="contained"
            onClick={handlOpenHiring}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Hiring
          </Button>
        </Stack>  
        <HiringList products={prod} users={user} /> 
      </Container>
    </Page>
  );
}

export default HiringPage;
