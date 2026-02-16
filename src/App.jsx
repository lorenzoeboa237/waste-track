import React from "react";
import { DataProvider } from "./context/DataContext";
import Routes from "./Routes";

function App() {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
}

export default App;
