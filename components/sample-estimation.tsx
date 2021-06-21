import { NextPage } from "next";
import { useCommonStyles } from "./common";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({}));

export const Fit: NextPage = () => {
  const commonStyles = useCommonStyles();

  const [pressure, setPressure] = useState(0);
  const [temperature, setTemperature] = useState(300);

  const [ruby, setRuby] = useState(0);

  useEffect(() => {}, [pressure, temperature]);

  return (
    <>
      <h2>Ruby Fluorescence Estimation @any P</h2>
      <span className={commonStyles.atMark}>T=</span>
      <TextField
        required
        label=""
        type="number"
        defaultValue="300"
        variant="outlined"
        className={commonStyles.numericalInput}
        onChange={(e) => {
          setPressure(Number(e.target.value));
        }}
      />
      <span className={commonStyles.atMark}>P=</span>
      <TextField
        required
        label=""
        type="number"
        defaultValue="0"
        variant="outlined"
        className={commonStyles.numericalInput}
        onChange={(e) => {
          setPressure(Number(e.target.value));
        }}
      />
      {ruby}
      {/* <br /> */}
    </>
  );
};
