import { NextPage } from "next";
import { useCommonStyles } from "./common";
import { TextField, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";

export const RubyEstimation: NextPage = () => {
  const classes = useCommonStyles();

  const [refRubyTemp, setRefRubyTemp] = useState("300");
  const [estimatedR0Ragan, setEstimatedR0Ragan] = useState(0);
  const [estimatedR0Jahren, setEstimatedR0Jahren] = useState(0);

  useEffect(() => {
    const temp = Number(refRubyTemp);
    const estWavenumberRagan =
      14423 +
      4.49e-2 * temp -
      4.81e-4 * Math.pow(temp, 2) +
      3.71e-7 * Math.pow(temp, 3);
    setEstimatedR0Ragan(
      Math.round(10 ** 7 / (estWavenumberRagan * 0.001)) * 0.001
    );

    // 678.63 (*O.Ol) + 7.8~ 10m3( hO.2) (T-273) + 0.031
    // ( ~0.003)P + 0.8 ( AO. 1) X 10V3 p,
    // const estJahren = 678.63 +
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
        <p className={classes.display}>{estimatedR0Ragan} nm</p>
        <p>
          Ragan et. al. (1992): <br />
          14423 + 4.49e-2 T - 4.81e-4 T^2 + 3.71e-7 T^3
        </p>
      </Paper>
    </>
  );
};
