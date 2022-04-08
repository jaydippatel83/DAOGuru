import PropTypes from "prop-types";
// material
import { Grid, Box } from "@mui/material";
import ShopProductCard from "./ProductCard";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import HiringCard from "./HiringCard";

// ----------------------------------------------------------------------

HiringList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function HiringList({ products, users, ...other }) {
  const { Moralis, user } = useMoralis();
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    setUserProducts(products);
  }, [products]);

  return (
    <Grid container spacing={3} {...other}>
      {userProducts &&
        userProducts.map((product) => {
          if (product.user == user.attributes.username) {
            return (
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <HiringCard product={product} users={users} />
              </Grid>
            );
          }
        })}

      {userProducts && userProducts.length == 0 && (
        <Grid  item xs={12} sm={6} md={4}>
          <h5>No Hiring available</h5>
        </Grid>
      )}
    </Grid>
  );
}
