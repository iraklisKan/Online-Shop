"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import getCategories from "../categories/actions/get-categories";
import createCategory from "../categories/actions/create-category";
import { Category } from "../products/interfaces/product.interface";
import { useContext } from "react";
import { AuthContext } from "../auth/auth-context";

interface CategoriesContentProps {
  initialCategories: Category[];
}

function CategoriesContent({ initialCategories }: CategoriesContentProps) {
  const { role } = useContext(AuthContext);
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (role !== "ADMIN") {
    return (
      <Typography color="text.secondary">
        You do not have permission to manage categories.
      </Typography>
    );
  }

  const handleCreate = async () => {
    if (!name.trim()) return;
    const res = await createCategory(name.trim());
    if (res?.error) {
      setError(res.error);
    } else {
      setCategories((prev) => [...prev, res.data]);
      setName("");
      setError("");
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Categories
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "flex-start" }}>
        <TextField
          label="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error}
          size="small"
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <Button variant="contained" onClick={handleCreate}>
          Add
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {categories?.map((cat) => (
          <Chip key={cat.id} label={cat.name} variant="outlined" />
        ))}
      </Box>
    </Box>
  );
}

export default function CategoriesPageWrapper({
  categories,
}: {
  categories: Category[];
}) {
  return <CategoriesContent initialCategories={categories} />;
}
