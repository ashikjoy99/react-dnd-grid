import { Box, Stack } from "@mui/material";
import React from "react";
import { useDrop } from "react-dnd";
import GarbageProduct from "./GarbageProduct";

const List = ({ setProduct, products }) => {
  const moveItem = (item) => {
    setProduct((draft) => {
      draft.garbage = [
        ...draft.garbage,
        draft.items.find((prd) => prd.id === item.productId),
      ];
      draft.items = draft.items.filter((prd) => prd.id !== item.productId);
    });
  };
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "prd",
      drop: (item, monitor) => moveItem(item),
      canDrop: (item) => {
        const hasItem = products.find((prd) => prd.id === item.productId);
        if (hasItem) {
          return false;
        }
        return true;
      },
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }),
    [products]
  );
  return (
    <Box sx={{ border: "1px solid black", width: "100%" }} ref={drop}>
      {products.map((prd) => (
        <GarbageProduct prd={prd} key={prd.id} />
      ))}
    </Box>
  );
};

export default List;
