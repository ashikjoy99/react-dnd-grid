import React from "react";
import { useDrag } from "react-dnd";

const Product = ({ product }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "prd",
    item: { productId: product.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div key={product.id} ref={drag}>
      {product.name}
    </div>
  );
};

export default Product;
