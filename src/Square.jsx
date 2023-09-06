import { Box, Grid } from "@mui/material";
import React, { Children } from "react";
import { useDrop } from "react-dnd";
import Product from "./Product";

const Square = ({ i, x, y, products, setProduct }) => {
  const moveProduct = (x, y, item, prds) => {
    const updatedProducts = prds.map((prd) => {
      if (prd.id === item.productId) {
        return { ...prd, position: [x, y] };
      } else {
        return prd;
      }
    });
    setProduct((draft) => {
      draft.items = updatedProducts;
    });
  };
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "prd",
      drop: (item) => moveProduct(x, y, item, products),
      canDrop: (item) => {
        const hasProduct = products.find((item) => {
          const positionX = item.position[0];
          const positionY = item.position[1];
          return positionX === x && positionY === y;
        });
        if (hasProduct) {
          return false;
        }
        return true;
      },
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }),
    [products]
  );
  return (
    <Grid item xs={1.5}>
      <Box
        ref={drop}
        sx={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 50px",
          minHeight: "50px",
        }}
      >
        {products.map((item) => {
          const positionX = item.position[0];
          const positionY = item.position[1];
          if (positionX === x && positionY === y) {
            return <Product key={item.id} product={item} />;
          }
        })}
      </Box>
    </Grid>
  );
};

export default Square;
