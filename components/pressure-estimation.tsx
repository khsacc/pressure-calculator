import classes from "*.module.css";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import {
  Checkbox,
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
import { defaultValues, calcR, useCommonStyles } from "./common";
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
  caution: {
    color: theme.palette.error.main,
  },
  calibration: {
    marginTop: 10,
  },
  calibration__disabled: {
    color: theme.palette.grey[500],
  },
}));

export const PressureEstimation: NextPage = () => {
  const classes = useStyles(Theme);
  const commonClasses = useCommonStyles(Theme);

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

  const [tempCal, setTempCal] = useState(false);
  const handleTempCalChange = () => {
    setTempCal(!tempCal);
  };

  const [refTempCal, setRefTempCal] = useState(300);
  const [samTempCal, setSamTempCal] = useState(300);

  // function to output a calibrated reference ruby fluorescence line (R0)
  // assuming that temperature dependence and pressure dependence of R0 are independent to each other
  const calibrateTemp = (
    initialRefRuby: number,
    refTemp: number,
    samTemp: number
  ) => {
    // let's define function to compute wavelength shift as temperature changed compared to that @296K
    const getDiffRuby = (__refTemp: number) => {
      const __deltaRefTemp = refTemp - 296;
      if (__refTemp < 50) {
        return -0.887;
      } else if (__refTemp < 296) {
        return (
          0.006644 * __deltaRefTemp +
          6.7652e-6 * __deltaRefTemp ** 2 -
          2.3316e-8 * __deltaRefTemp ** 3
        );
      } else {
        return (
          0.007464 * __deltaRefTemp -
          0.3125e-6 * __deltaRefTemp ** 2 +
          8.7633e-9 * __deltaRefTemp ** 3
        );
      }
    };
    // let's estimate R0 line @296K @ 1atm
    const estimatedAmbientRuby = initialRefRuby - getDiffRuby(refTemp);
    // let's estimate R0 line @sample temperature @1atm
    const estimatedTrueRefRuby = estimatedAmbientRuby + getDiffRuby(samTemp);
    return estimatedTrueRefRuby;
  };

  const calcP = (ref: number, sam: number, eq: Equation) => {
    const calibRef = !tempCal
      ? ref
      : calibrateTemp(ref, refTempCal, samTempCal);

    const diffFraction = (sam - calibRef) / calibRef;

    switch (eq) {
      case "Mao-nonhydro":
        const rawMaoNonhydro = (1904 * ((sam / calibRef) ** 5 - 1)) / 5;
        return Math.round(rawMaoNonhydro / 0.001) * 0.001;
      case "Mao-hydro":
        const rawMaoHydro = (1904 * ((sam / calibRef) ** 7.665 - 1)) / 7.665;
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
  }, [
    refRubyInt,
    refRubyDec,
    samRubyInt,
    samRubyDec,
    eq,
    refTempCal,
    samTempCal,
  ]);

  const TempCalibCaution: NextPage<{ temp: number }> = ({ temp }) => {
    if (temp > 900) {
      return (
        <div className={classes.caution}>
          Temperature should be below 900K to calibrate
        </div>
      );
    } else {
      return null;
    }
  };

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
          <div>
            <div
              className={[
                classes.calibration,
                tempCal ? "" : classes.calibration__disabled,
              ].join(" ")}
            >
              <span className={commonClasses.atMark}>Ref T[K] =</span>
              <TextField
                label=""
                type="number"
                disabled={!tempCal}
                defaultValue={300}
                variant="outlined"
                className={classes.numericalInput}
                onChange={(e) => {
                  setRefTempCal(Number(e.target.value));
                }}
              ></TextField>
              <TempCalibCaution temp={refTempCal} />
            </div>
          </div>

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
          {/* <br /> */}

          <div
            className={[
              classes.calibration,
              tempCal ? "" : classes.calibration__disabled,
            ].join(" ")}
          >
            <span className={commonClasses.atMark}>Sample T[K] =</span>
            <TextField
              label=""
              type="number"
              defaultValue={300}
              variant="outlined"
              disabled={!tempCal}
              className={classes.numericalInput}
              onChange={(e) => {
                setSamTempCal(Number(e.target.value));
              }}
            ></TextField>
            <TempCalibCaution temp={samTempCal} />
          </div>

          <br />
          <FormControlLabel
            control={
              <Checkbox checked={tempCal} onChange={handleTempCalChange} />
            }
            label="Temperature Calibration"
          />
          <br />
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
