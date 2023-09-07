import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { useImmer } from "use-immer";
import Square from "./Square";
import List from "./List";

const App = () => {
  const [state, setState] = useImmer({
    items: [
      { type: "product", id: 1, name: "ProductA", position: [0, 0] },
      { type: "product", id: 2, name: "ProductB", position: [0, 1] },
      { type: "product", id: 3, name: "ProductC", position: [0, 2] },
      { type: "product", id: 4, name: "ProductD", position: [0, 3] },
      { type: "product", id: 5, name: "ProductE", position: [0, 4] },
      { type: "product", id: 6, name: "ProductF", position: [0, 5] },
      { type: "product", id: 7, name: "ProductG", position: [0, 6] },
      { type: "product", id: 8, name: "ProductH", position: [0, 7] },
      { type: "product", id: 9, name: "ProductI", position: [1, 0] },
      { type: "product", id: 10, name: "ProductJ", position: [1, 1] },
    ],
    garbage: [{ type: "product", id: 11, name: "Productk", position: [0, 0] }],
  });

  const indices = state.items.map((item) => {
    const offset = item.position[0] * 8;
    const orderNumber = item.position[1];
    return { ...item, index: offset + orderNumber };
  });

  // indices.sort((a, b) => {
  //   return a.index - b.index;
  // });

  console.log("indexes", indices);

  function renderSquare(i, state) {
    const x = Math.floor(i / 8);
    const y = i % 8;
    return (
      <Square
        key={i}
        i={i}
        x={x}
        y={y}
        products={state.items}
        garbage={state.garbage}
        setProduct={setState}
      />
    );
  }

  const squares = [];
  for (let i = 0; i < 44; i++) {
    squares.push(renderSquare(i, state));
  }

  return (
    <Container
      maxWidth={false}
      sx={{ bgcolor: "#cfe8fc", height: "100vh", paddingTop: "20px" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container>{squares}</Grid>
        </Grid>
        <Grid item xs={4}>
          <List setProduct={setState} products={state.garbage} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
