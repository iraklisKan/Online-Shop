"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { FormResponse } from "../common/interfaces/form-response.interface";
import createProduct from "../actions/create-product";

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

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}
export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();
  const onClose = () => {
    setResponse(undefined);
    handleClose();
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
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              helperText={response?.descriptionError}
              error={!!response?.descriptionError}
              required
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              helperText={response?.priceError}
              error={!!response?.priceError}
              required
            />
            <Button type="submit" variant="contained">
              Create Product
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
