import { makeStyles } from "@material-ui/core";
import { NextPage } from "next";
import { TextField } from "@material-ui/core";
import { defaultValues, calcR, useCommonStyles } from "./common";
import { useEffect, useState } from "react";

export const TemperatureCalibration: NextPage = () => {
  const classes = useCommonStyles();

  const [refRubyInt, setRefRubyInt] = useState(defaultValues.integer);
  const [refRubyDec, setRefRubyDec] = useState(defaultValues.decimal);
  const [refRubyTemp, setRefRubyTemp] = useState('300')
  const [tarTemp, setTarTemp] = useState('300')

  const [calcRuby, setCalcCuby] = useState(0)

  useEffect(() => {
    const wavenumber = ((1/calcR(refRubyInt, refRubyDec) )) - 3.551 * (10 ** 8) * ((Math.log(Number(tarTemp) / Number(refRubyTemp))) ** 11.54)

    console.log((Math.log(Number(tarTemp) / Number(refRubyTemp))) ** (11.54))
    setCalcCuby((1 / (wavenumber)))
  }, [refRubyInt, refRubyDec, refRubyTemp, tarTemp])

  return (
    <>
      <h2>
        Measured Ruby (λ<sub>0</sub>) [nm]
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
      <span className={classes.atMark}>@</span>
      <TextField
        required
        label="temperature"
        type="number"
        defaultValue={300}
        variant="outlined"
        className={classes.numericalInput}
        onChange={(e) => {
          setRefRubyTemp(e.target.value);
        }}
      />

      <h2>Temperature for Calibration [K]</h2>
      <TextField
        required
        label=""
        type="number"
        defaultValue={300}
        variant="outlined"
        className={classes.numericalInput}
        onChange={(e) => {
          setTarTemp(e.target.value);
        }}
      />
      {calcRuby}
    </>
  );
};
