import React from "react";
import ReactDOM from "react-dom";
import GlobalThemeProvider from "./style/GlobalThemeProvider";
import Main from "./pages/Main/Main.tsx";

ReactDOM.render(
  <GlobalThemeProvider>
    <Main />
  </GlobalThemeProvider>,
  document.querySelector("#root")
);
