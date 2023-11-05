import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import App from "./App";

const theme = extendTheme({
  // Add your Chakra UI theme configurations here
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals