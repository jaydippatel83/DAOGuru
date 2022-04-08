import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  CardContent,
  Container,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../utils/formatNumber";
//
import Label from "../../components/Label";
import ColorPreview from "../../components/ColorPreview";
import ProductDetail from "./ProductDetail";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "200px",
  objectFit: "cover", 
  borderRadius:'10px'
});

// ----------------------------------------------------------------------

HiringCard.propTypes = {
  product: PropTypes.object,
};

export default function HiringCard({ product,users }) {
  const { createdAt, description, email, skills, title, image,user } = product;
 

  return (
    <Card key={user} sx={{ border: "1px solid #eee" }}>
      <CardContent>
      <Box > 
        {image && <ProductImgStyle alt={image.name} src={image.url} />}
      </Box>
        <Box sx={{marginTop:'10px'}}>
          <Typography color="textPrimary" gutterBottom variant="h5">
            {title}
          </Typography>

          <Typography color="textPrimary" gutterBottom variant="body">
            {description}
          </Typography>
          <Box sx={{ mt: "15px", mb: "15px" }}>
            <Typography color="textPrimary" gutterBottom variant="h5">
              Skills:
            </Typography>
            <Stack direction="row" spacing={1}>
              {skills.map((skill) => (
                <Chip key={skill.id} label={skill.id} />
              ))}
            </Stack>
          </Box>
          <Box sx={{ mt: "15px", mb: "15px" }}> 
          <Typography color="textPrimary" gutterBottom variant="h5">
            Apply at:  {email}
          </Typography>
          <Typography color="textPrimary" gutterBottom variant="h5">
           Created by: {user.slice(0,10)}
          </Typography>
          <Typography color="textPrimary" gutterBottom variant="body">
           {createdAt}
          </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
