import Head from "next/head";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import { Theme } from "../styles/theme";
import { useEffect, useState } from "react";
import { PressureEstimation } from "../components/pressure-estimation";
import { TemperatureCalibration } from "../components/temperature-calibration";
import { RubyEstimation } from "../components/ruby-estimation";
import { Fit } from "../components/sample-estimation";
import { Ref } from "../components/ref";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    padding: "0 0.5rem",
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'center',
    alignItems: "center",
    // height: "100vh",
  },
  heading: {
    color: theme.palette.primary.main,
  },
  section: {
    paddingBottom: 10,
    // borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderTop: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default function Home() {
  const classes = useStyles(Theme);

  return (
    <div className={classes.container}>
      <Head>
        <title>Pressure Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={classes.heading}>Pressure Calculator</h1>

        <section className={classes.section}>
          <PressureEstimation />
        </section>
        {/* <div className={classes.section}>
          <TemperatureCalibration />
        </div> */}
        <section className={classes.section}>
          <RubyEstimation />
        </section>
        {/* <section className={classes.section}>
          <Fit />
        </section> */}
        <section className={classes.section}>
          <Ref />
        </section>
      </main>
    </div>
  );
}
