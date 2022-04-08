import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import {
  Stack,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

import Iconify from "../components/Iconify";
import { useMoralis, useMoralisFile } from "react-moralis";
import { toast } from "react-toastify";
import { WithContext as ReactTags } from "react-tag-input";

const Input = styled("input")({
  display: "none",
});

function CreateHiringModal(props) {
  const { Moralis, user } = useMoralis();
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

  const [tags, setTags] = React.useState([]);

  const navigate = useNavigate();
  const [creator, setCreator] = useState("hiring");
  const [imgs, setImgs] = useState("");
  const [loading, setLoading] = useState(false);

  const Product = Moralis.Object.extend("Hiring");
  const prod = new Product();

  const handleChange = (event) => {
    setCreator(event.target.value);
  };

  const handlechangeImage = async (e) => {
    const file = e.target.files[0];
    let fileIpfs = await saveFile("dao", file, { saveIPFS: true });
    const moralisFile = new Moralis.File("dao_hiring", file); 
    setImgs(fileIpfs);
  };

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required("Required this field!"),
    description: Yup.string().required("Required this field!"), 
    email:Yup.string()
    .email("Invalid email address format").required("Required this field!")
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { resetForm }) => { 
      try {
        setLoading(true);
        props.setLoading(true);
        prod.set("title", values.title);
        prod.set("description", values.description);
        prod.set("email", values.email);
        prod.set("skills", tags);
        prod.set("image", imgs);
        prod.set("user", user.attributes.username);
        await prod.save();
        setLoading(false);
        props.setLoading(false);
        toast.success("Successfully created!");
        resetForm();
        props.close();
        props.update(!props.state);
      } catch (error) {
        setLoading(false);
        props.setLoading(true);
      }
    },
  });


  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <div>
      <Dialog open={props.op} onClose={props.close} fullWidth>
        <FormikProvider value={formik} className={Container}>
          <DialogTitle>Hiring</DialogTitle>
          <DialogContent style={{ overflowX: "hidden" }}>
            <Form
              autoComplete="off"
              noValidate
              onSubmit={formik.handleSubmit}
              style={{
                // width: "50vw",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                // marginTop: "100px",
              }}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  type="text"
                  {...formik.getFieldProps("title")}
                  error={Boolean(formik.touched.title && formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  fullWidth
                  name="description"
                  type="text"
                  label="Description"
                  {...formik.getFieldProps("description")}
                  error={Boolean(
                    formik.touched.description && formik.errors.description
                  )}
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
                {/*  */}
                <div className="d-create-file">
                  <div>
                    <p id="file_name" className="text-grey-500">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                    </p>
                  </div>

                  <label
                    htmlFor="files"
                    id="get_file"
                    // name="file"
                    className="btn-main"
                    type="file"
                    style={{ backgroundColor: "#D82148" }}
                    // {...formik.getFieldProps("file")}
                    // error={Boolean(formik.touched.file && formik.errors.file)}
                    // helperText={formik.touched.file && formik.errors.file}
                  >
                    Browse
                  </label>
                  <TextField
                    id="files"
                    type="file"
                    onChange={handlechangeImage}
                    style={{ display: "none" }}
                    // {...formik.getFieldProps("file")}
                    error={Boolean(formik.touched.file && formik.errors.file)}
                    helperText={formik.touched.file && formik.errors.file}
                  />
                </div> 
                <ReactTags
                  classNames={{ 
                    tagInput: 'form-input', 
                  }}
                  inputFieldPosition="inline" 
                  tags={tags} 
                  placeholder="Press enter to add new Skills"
                  labelField="Enter the Skills"
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick} 
                />

                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  {...formik.getFieldProps("email")}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                /> 
              </Stack>
              <DialogActions> 
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={formik.isSubmitting}
                  disabled={loading}
                >
                  {loading ? "Submiting..." : "Submit"}
                </LoadingButton>
                <Button onClick={props.close} variant="contained">
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          </DialogContent>
        </FormikProvider>
      </Dialog>
    </div>
  );
}

export default CreateHiringModal;
