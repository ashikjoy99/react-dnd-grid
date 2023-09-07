import { Stack } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";

const GarbageProduct = ({ prd, i }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "prd",
    item: { productId: prd.id, type: "garbage" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Stack
      ref={drag}
      key={i}
      sx={{ border: "1px solid grey", padding: "10px" }}
    >
      {prd.name}
    </Stack>
  );
};

export default GarbageProduct;
