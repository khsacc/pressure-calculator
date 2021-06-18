import classes from "*.module.css";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import { Theme } from "../styles/theme";
import { defaultValues, calcR } from "./common";
import { PTRecord } from "./ptRecord";

const useStyles = makeStyles((theme) => ({
  whole: {
    display: "flex",
    alignItems: 'flex-start'
  },
  container: {
    minHeight: "100vh",
    padding: "0 0.5rem",
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'center',
    alignItems: "center",
    height: "100vh",
  },
  heading: {
    color: theme.palette.primary.main,
  },
  numericalInput: {
    width: 100,
  },
  dot: {
    fontWeight: "bold",
    fontSize: "2em",
    lineHeight: "2",
    margin: "0 5px",
  },
  paper: {
    padding: 10,
    margin: "10px 0",
  },
  display: {
    fontSize: 25,
  },
  section: {
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderTop: `1px solid ${theme.palette.primary.main}`,
  },
}));

export const PressureEstimation: NextPage = () => {
  const classes = useStyles();

  const [refRubyInt, setRefRubyInt] = useState(defaultValues.integer);
  const [refRubyDec, setRefRubyDec] = useState(defaultValues.decimal);
  const [samRubyInt, setSamRubyInt] = useState(defaultValues.integer);
  const [samRubyDec, setSamRubyDec] = useState(defaultValues.decimal);

  // Mao: P = 1904 * ((λ/λ<sub>0</sub>)<sup>5</sup> - 1) / 5
  const calcPMao = (ref: number, sam: number) => {
    const raw = (1904 * ((sam / ref) ** 5 - 1)) / 5;
    console.log(raw);
    return Math.round(raw / 0.001) * 0.001;
  };
  const [estimatedP, setEstimatedP] = useState(0);

  useEffect(() => {
    // console.log(calcR(refRubyInt, refRubyDec), calcR(samRubyInt, samRubyDec))
    setEstimatedP(
      calcPMao(calcR(refRubyInt, refRubyDec), calcR(samRubyInt, samRubyDec))
    );
  }, [refRubyInt, refRubyDec, samRubyInt, samRubyDec]);

  return (
    <div className={classes.whole}>
      <div>
        <form>
          <h2>
            Reference Ruby (λ<sub>0</sub>) [nm]
          </h2>
          <TextField
            required
            label=""
            type="number"
            defaultValue={defaultValues.integer}
            variant="outlined"
            className={classes.numericalInput}
            onChange={(e) => {
              setRefRubyInt(e.target.value);
            }}
          />
          <span className={classes.dot}>.</span>
          <TextField
            required
            label=""
            type="number"
            defaultValue={defaultValues.decimal}
            variant="outlined"
            className={classes.numericalInput}
            onChange={(e) => {
              setRefRubyDec(e.target.value);
            }}
          />

          <h2>Sample Ruby (λ) [nm]</h2>
          <TextField
            required
            label=""
            type="number"
            defaultValue={defaultValues.integer}
            variant="outlined"
            className={classes.numericalInput}
            onChange={(e) => {
              setSamRubyInt(e.target.value);
            }}
          />
          <span className={classes.dot}>.</span>
          <TextField
            required
            label=""
            type="number"
            defaultValue={defaultValues.decimal}
            variant="outlined"
            className={classes.numericalInput}
            onChange={(e) => {
              setSamRubyDec(e.target.value);
            }}
          />
        </form>
        <Paper className={classes.paper} elevation={3}>
          <p>Estimated sample pressure</p>
          <p className={classes.display}>{estimatedP} GPa</p>
          <p>
            Mao (1986): <br /> P = 1904 * ((λ/λ<sub>0</sub>)<sup>5</sup> - 1) /
            5
          </p>
        </Paper>
      </div>

      <PTRecord currentData={{pressure: estimatedP, samRuby: calcR(samRubyInt, samRubyInt), refRuby: calcR(refRubyInt, refRubyDec)}} />
    </div>
  );
};
