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
  width: { xs: "90%", sm: 440 },
  bgcolor: "background.paper",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  borderRadius: 3,
  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.5)",
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
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          New Product
        </Typography>
        <form
          className="w-full"
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
          <Stack spacing={2.5}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              helperText={response?.nameError}
              error={!!response?.nameError}
              required
              InputLabelProps={{ required: false }}
              fullWidth
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              helperText={response?.descriptionError}
              error={!!response?.descriptionError}
              required
              InputLabelProps={{ required: false }}
              multiline
              rows={3}
              fullWidth
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
              fullWidth
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{
                borderStyle: "dashed",
                py: 1.5,
                "&:hover": { borderStyle: "dashed" },
              }}
            >
              Upload Image
              <input
                type="file"
                name="image"
                style={fileInputStyles}
                onChange={(e) =>
                  e.target.files && setFileName(e.target.files[0].name)
                }
              />
            </Button>
            {fileName && (
              <Typography variant="body2" color="text.secondary">
                {fileName}
              </Typography>
            )}
            <Button type="submit" variant="contained" size="large" fullWidth>
              Create Product
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
