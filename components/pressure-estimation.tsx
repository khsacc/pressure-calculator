import classes from "*.module.css";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { Theme } from "../styles/theme";
import { defaultValues, calcR } from "./common";
import { PTRecord } from "./ptRecord";
import { equal } from "assert/strict";

const useStyles = makeStyles((theme) => ({
  whole: {
    display: "flex",
    alignItems: "flex-start",
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
  caption: {
    color: theme.palette.grey[500],
    fontSize: "0.7em",
  },
}));

export const PressureEstimation: NextPage = () => {
  const classes = useStyles(Theme);

  const [refRubyInt, setRefRubyInt] = useState(defaultValues.integer);
  const [refRubyDec, setRefRubyDec] = useState(defaultValues.decimal);
  const [samRubyInt, setSamRubyInt] = useState(defaultValues.integer);
  const [samRubyDec, setSamRubyDec] = useState(defaultValues.decimal);

  // // Mao: P = 1904 * ((λ/λ<sub>0</sub>)<sup>5</sup> - 1) / 5
  // const calcPMao = (ref: number, sam: number) => {
  //   const raw = (1904 * ((sam / ref) ** 5 - 1)) / 5;
  //   // console.log(raw);
  //   return Math.round(raw / 0.001) * 0.001;
  // };

  const [estimatedP, setEstimatedP] = useState(0);

  type Equation = "Mao-nonhydro" | "Mao-hydro" | "Dorogokupets";
  const [eq, setEq] = React.useState("Mao-nonhydro" as Equation);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEq((event.target as HTMLInputElement).value as Equation);
  };

  const calcP = (ref: number, sam: number, eq: Equation) => {
    const diffFraction = (sam - ref) / ref;

    switch (eq) {
      case "Mao-nonhydro":
        const rawMaoNonhydro = (1904 * ((sam / ref) ** 5 - 1)) / 5;
        return Math.round(rawMaoNonhydro / 0.001) * 0.001;
      case "Mao-hydro":
        const rawMaoHydro = (1904 * ((sam / ref) ** 7.665 - 1)) / 7.665;
        return Math.round(rawMaoHydro / 0.001) * 0.001;
      case "Dorogokupets":
        const rawDorogokupets = 1884 * diffFraction * (1 + 5.5 * diffFraction);
        return Math.round(rawDorogokupets / 0.001) * 0.001;
    }
  };

  useEffect(() => {
    // console.log(calcR(refRubyInt, refRubyDec), calcR(samRubyInt, samRubyDec))
    setEstimatedP(
      calcP(calcR(refRubyInt, refRubyDec), calcR(samRubyInt, samRubyDec), eq)
    );
  }, [refRubyInt, refRubyDec, samRubyInt, samRubyDec, eq]);

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
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="equation"
              name="choose equation to use"
              value={eq}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Mao-nonhydro"
                control={<Radio />}
                label={
                  <>
                    Mao et. al. (1986):
                    <br /> P = 1904 * ((λ/λ<sub>0</sub>)<sup>5</sup> - 1) / 5
                    <br />
                    <span className={classes.caption}>
                      for non-hydrostatic condition {"<"}180GPa
                    </span>
                  </>
                }
              />
              <FormControlLabel
                value="Dorogokupets"
                control={<Radio />}
                label={
                  <>
                    Dorogokupets and Oganov (2007):
                    <br /> P = 1884 (Δλ/λ<sub>0</sub>) [1 + 5.5 (Δλ/λ
                    <sub>0</sub>)]
                    <br />
                    <span className={classes.caption}>
                      for non-hydrostatic condition {"<"}150GPa
                    </span>
                  </>
                }
              />
              <FormControlLabel
                value="Mao-hydro"
                control={<Radio />}
                label={
                  <>
                    Mao et. al. (1986):
                    <br /> P = 1904 * ((λ/λ<sub>0</sub>)<sup>7.665</sup> - 1) /
                    7.665
                    <br />
                    <span className={classes.caption}>
                      for hydrostatic condition {"<"}80GPa
                    </span>
                  </>
                }
              />

              {/* <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Disabled option)"
              /> */}
            </RadioGroup>
          </FormControl>
        </Paper>
      </div>

      <PTRecord
        currentData={{
          pressure: estimatedP,
          samRuby: calcR(samRubyInt, samRubyDec),
          refRuby: calcR(refRubyInt, refRubyDec),
        }}
      />
    </div>
  );
};
