"use client";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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
      <div className="absolute left-10 bottom-10">
        <Fab color="primary" onClick={() => setModalVisible(true)}>
          <AddIcon></AddIcon>
        </Fab>
      </div>
    </>
  );
}
