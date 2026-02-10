"use client";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import CreateProductModal from "./create-product-modal";
import { useState } from "react";

export default function CreateProductFab() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <CreateProductModal
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
      <Tooltip title="Add product" placement="left">
        <Fab
          color="primary"
          onClick={() => setModalVisible(true)}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
}
