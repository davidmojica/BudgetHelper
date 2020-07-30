// Import React
import React from "react";
import ReactDOM from "react-dom";

// Import Tecton's `connect()` function
import { connect } from "q2-tecton-sdk";

// Import files we will create in the next steps
import TectonContext from "./contexts/tecton";
import App from "./components/App";

// Initialize your Tecton extension and then render the React app
connect().then(({ actions, sources }) => {
  renderApp(document.getElementById("app"), { actions, sources });
});

// Adding the capabilities (actions and sources) to the Tecton
// Context we are about to create will make them available anywhere
// in the React app.
function renderApp(root, capabilities) {
  ReactDOM.render(
    <TectonContext.Provider value={capabilities}>
      <App />
    </TectonContext.Provider>,
    root
  );
}