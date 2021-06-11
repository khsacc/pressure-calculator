import makeStyles from "@material-ui/core/styles/makeStyles";

export const defaultValues = {
  integer: '693',
  decimal: '0',
};

export const calcR = (int: string, dec: string) => {
  const ret = Number(Number(int) + ((Number(dec) / (10 ** String(dec).length))));
  return ret
};

export const useCommonStyles = makeStyles((theme) => ({
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
    margin: '10px 0',
  },
  display: {
    fontSize: 25,
  },
  section: {
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderTop: `1px solid ${theme.palette.primary.main}`
  },
  atMark: {
    fontSize: '1.5em',
    margin: "0 5px",
  }
}));