import { NextPage } from "next";
import { useCommonStyles } from "./common";
import { TextField, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";

export const RubyEstimation: NextPage = () => {
  const classes = useCommonStyles();

  const [refRubyTemp, setRefRubyTemp] = useState("300");
  const [estimatedR0, setEstimatedR0] = useState(0);

  useEffect(() => {
    const temp = Number(refRubyTemp);
    const estWavenumber =
      14423 +
      4.49e-2 * temp -
      4.81e-4 * Math.pow(temp, 2) +
      3.71e-7 * Math.pow(temp, 3);
    setEstimatedR0(Math.round(10 ** 7 / (estWavenumber * 0.001)) * 0.001);
  }, [refRubyTemp]);

  return (
    <>
      <h2>Temperature for Estimation [K]</h2>
      <span className={classes.atMark}>@</span>
      <TextField
        required
        label=""
        type="number"
        defaultValue={300}
        variant="outlined"
        className={classes.numericalInput}
        onChange={(e) => {
          setRefRubyTemp(e.target.value);
        }}

      />
      <Paper className={classes.paper} elevation={3}>
        <p>
          Estimated ruby R<sub>0</sub> fluorescence shift
        </p>
        <p className={classes.display}>{estimatedR0} nm</p>
        <p>
          Ragan et. al. (1992): <br />
          14423 + 4.49e-2 T - 4.81e-4 T^2 + 3.71e-7 T^3
        </p>
      </Paper>
    </>
  );
};
