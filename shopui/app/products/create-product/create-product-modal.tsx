"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CSSProperties, useState } from "react";
import { useRouter } from "next/navigation";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import createProduct from "../actions/create-product";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";

const styles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const fileInputStyles: CSSProperties = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute" as "absolute",
  whiteSpace: "nowrap" as "nowrap",
  width: "1px",
  bottom: 0,
  left: 0,
};

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}
export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  const onClose = () => {
    setResponse(undefined);
    handleClose();
    setFileName("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form
          className="w-full max-w-xs"
          action={async (formData) => {
            const response = await createProduct(formData);
            setResponse(response);
            if (
              response &&
              !response.error &&
              !response.nameError &&
              !response.descriptionError &&
              !response.priceError
            ) {
              router.refresh(); // Instant UI update
              onClose();
            }
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              helperText={response?.nameError}
              error={!!response?.nameError}
              required
              InputLabelProps={{ required: false }}
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              helperText={response?.descriptionError}
              error={!!response?.descriptionError}
              required
              InputLabelProps={{ required: false }}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              helperText={response?.priceError}
              error={!!response?.priceError}
              required
              InputLabelProps={{ required: false }}
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <input
                type="file"
                name="image"
                style={fileInputStyles}
                onChange={(e) =>
                  e.target.files && setFileName(e.target.files[0].name)
                }
              />
            </Button>
            <Typography >{fileName}</Typography>
            <Button type="submit" variant="contained">
              Create Product
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
