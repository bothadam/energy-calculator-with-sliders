import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./App.css";
import { parseIntBaseTen } from "./utils";

function App() {
  // TODO: add a state variable for selecting which field needs to be calculated
  const G = 9.81;
  const [state, setState] = useState({
    m: "",
    h: "",
    W: "",
  });

  const calculate = ({ m, h, W }) => {
    // W*3600=mgh
    console.log(m, h, W);
    if (!m && W && h) {
      m = (state.W * 3600) / (G * state.h);
    } else if (!h && W && m) {
      h = (state.W * 3600) / (G * state.m);
    } else if (!W && m && h) {
      W = (state.m * G * state.h) / 3600;
    }

    console.log("calculate", { m, h, W });
    setState({ m, h, W });
  };

  const clearAll = () => {
    console.log("clear all");
    setState({ m: "", h: "", W: "" });
  };

  const renderInputField = (id, label) => {
    return (
      <TextField
        id={id}
        variant="outlined"
        label={label}
        className="input-field"
        inputProps={{ style: { fontSize: 70, height: 170, width: 300 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 50 } }} // font size of input label
        type="number"
        size="medium"
        value={state[id]}
        onChange={(e) => {
          calculate({
            [id]: !Number.isNaN
              ? parseIntBaseTen(e.target.value, 10)
              : e.target.value,
          });
        }}
      />
    );
  };
  const renderStaticField = (id, label) => {
    return (
      <TextField
        id={id}
        variant="outlined"
        className="input-field"
        inputProps={{ style: { fontSize: 70, height: 170, width: 300 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 70 } }} // font size of input label
        disabled
        value={G}
      />
    );
  };
  return (
    <div className="App">
      <div className="pe-calculator-container">
        <div className="pe-calculator-column pe-calculator-inputs">
          <Button
            variant="contained"
            id="clear-button"
            onClick={() => clearAll()}
          />
          {renderInputField("m", "m")}
          {renderStaticField("g", "g")}
          {renderInputField("h", "h")}
          {renderInputField("W", "W")}
        </div>
        <div className="pe-calculator-column pe-calculator-sliders"></div>
      </div>
    </div>
  );
}

export default App;
