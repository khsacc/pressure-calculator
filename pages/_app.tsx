import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme } from "../styles/theme";

const useStyle = makeStyles(() => ({
  footer: {
    paddingBottom: 20,
    textAlign: "center",
  },
}));

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const classes = useStyle();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={Theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <footer className={classes.footer}>
          Hiroki Kobayashi, 2021
          <br />
          Source code is available{" "}
          <a
            href="https://github.com/khsacc/pressure-calculator"
            rel="external"
            target="_blank"
          >
            here
          </a>
        </footer>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
