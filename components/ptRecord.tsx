import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Button,
  TextField,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from "@material-ui/core";
import TimelineIcon from "@material-ui/icons/Timeline";
import CreateIcon from "@material-ui/icons/Create";
import { NextPage } from "next";
import { Theme } from "../styles/theme";
import { useState } from "react";
import { useEffect } from "react";
import { useCommonStyles, RawDatum, Datum } from "./common";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { ListItem } from "@material-ui/core";
import React from "react";
import { PTRecordChart } from "./ptRecordChart";

const useStyles = makeStyles((theme) => ({
  timelineIcon: {
    marginRight: 10,
    // color: theme.palette.primary.main
  },
  accordionWrap: {
    // marginTop: "15px",
    marginLeft: "15px",
    minWidth: 450,
  },
  accordion: {
    minWidth: "100%",
    width: "fit-content",
  },
  accordionDetail: {
    display: "block",
  },
  numInput: {
    display: "block",
    margin: "10px 0",
  },
  rawDataLine: {
    padding: 5,
    verticalAlign: "middle",
  },
  rawDataPrimitive: {
    color: theme.palette.secondary.main,
  },
  deleteIcon: {
    marginRight: 5,
  },
  button: {
    margin: "5px 0",
    display: "inline-block",
  },
}));

const itemName = "ptRecord";

export const PTRecord: NextPage<{
  currentData: RawDatum;
  setCommonCurrentTemp: (number) => void;
  commonCurrentTemp: number;
}> = ({ currentData, setCommonCurrentTemp, commonCurrentTemp }) => {
  const classes = useStyles(Theme);
  const commonClasses = useCommonStyles(Theme);

  const createDatum = (
    pressure: number,
    temperature: number,
    refRuby: number,
    samRuby: number
  ): Datum => {
    return {
      pressure,
      temperature,
      time: Date.now(),
      refRuby,
      samRuby,
    };
  };

  const [localStorageData, setLocalStorageData] = useState("");
  const [localStorageDataJSON, setLocalStorageDataJSON] = useState(
    [] as Datum[]
  );

  useEffect(() => {
    const previousRecord = localStorage.getItem(itemName);
    if (previousRecord) {
      setLocalStorageData(previousRecord);
    }
    setCsvData(generateCSV());
  }, []);

  useEffect(() => {
    localStorageData &&
      setLocalStorageDataJSON(JSON.parse(localStorageData) as Datum[]);
  }, [localStorageData]);

  const recordCurrentValue = (data: {
    pressure: number;
    temperature: number;
    refRuby: number;
    samRuby: number;
  }) => {
    const previousRecord = localStorage.getItem(itemName);
    if (!previousRecord) {
      localStorage.setItem(
        itemName,
        JSON.stringify([
          createDatum(
            data.pressure,
            data.temperature,
            data.refRuby,
            data.samRuby
          ),
        ])
      );
    } else {
      const previousRecordJSON = JSON.parse(previousRecord) as Datum[];
      localStorage.setItem(
        itemName,
        JSON.stringify([
          ...previousRecordJSON,
          createDatum(
            data.pressure,
            data.temperature,
            data.refRuby,
            data.samRuby
          ),
        ])
      );
    }
    setLocalStorageData(localStorage.getItem(itemName));
  };

  const deleteValue = (index: number) => {
    if (!!window && window.confirm("Are you sure to delete this value?")) {
      const newArray = localStorageDataJSON.filter((_, idx) => idx !== index); // spliceが破壊的変更なので渋々こう書いている、代替案募集中
      localStorage.setItem(itemName, JSON.stringify(newArray));
      setLocalStorageData(localStorage.getItem(itemName));
    }
  };

  const deleteAllValues = () => {
    if (!!window && window.confirm("Are you sure to delete all the data?")) {
      localStorage.setItem(itemName, "[]");
      setLocalStorageData(localStorage.getItem(itemName));
    }
  };

  const [currentTemp, setCurrentTemp] = useState(300);

  const copyData = () => {
    const str = localStorageDataJSON
      .map((datum) =>
        [
          new Date(datum.time).toLocaleString(),
          datum.temperature,
          datum.pressure,
          datum.refRuby,
          datum.samRuby,
        ].join("\t")
      )
      .join("\n");
    const strWithHeader = `time\ttemperature[K]\tpressure[GPa]\tref\tsample\n${str}`;
    const listener = (e) => {
      e.clipboardData.setData("text/plain", strWithHeader);
      e.preventDefault();
      document.removeEventListener("copy", listener);
    };
    document.addEventListener("copy", listener);
    document.execCommand("copy");
  };

  const generateCSV = () => {
    const arr = [
      ["time", "temperature", "pressure", "reference", "sample"],
      ...localStorageDataJSON.map((datum) => [
        new Date(datum.time).toLocaleString(),
        String(datum.temperature),
        String(datum.pressure),
        String(datum.refRuby),
        String(datum.samRuby),
      ]),
    ];

    return arr
      .map((row) =>
        row.map((str) => '"' + (str ? str.replace(/"/g, '""') : "") + '"')
      )
      .map((row) => row.join(","))
      .join("\n");
  };

  const [csvData, setCsvData] = useState("");

  useEffect(() => {
    setCsvData(generateCSV());
  }, [localStorageData, localStorageDataJSON]);

  const downloadFile = (href: string, filename: string) => {
    const virtualDLButton = document.createElement("a");
    virtualDLButton.href = href;
    virtualDLButton.download = filename;
    virtualDLButton.click();
    virtualDLButton.remove();
  };

  const downloadData = () => {
    // const now = new Date().toLocaleString();
    const filePrefix = window.prompt("file name?");
    const getChartFile = (id: string) =>
      (document.getElementById(id).firstChild as HTMLCanvasElement).toDataURL();
    if (filePrefix) {
      [
        {
          href: getChartFile("chart1"),
          filename: "pTPath",
          ext: "png",
        },
        {
          href: getChartFile("chart2"),
          filename: "temp",
          ext: "png",
        },
        {
          href: getChartFile("chart3"),
          filename: "press",
          ext: "png",
        },
        {
          href: `data:text/csv;charset=utf-16,${encodeURIComponent(
            "\uFEFF" + csvData
          )}`,
          filename: "pTPath",
          ext: "csv",
        },
      ].forEach((e) => {
        downloadFile(e.href, `${filePrefix}_${e.filename}.${e.ext}`);
      });
    }
  };

  // Accordion
  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(true);
  const [expanded3, setExpanded3] = useState(false);

  return (
    <>
      <div className={classes.accordionWrap}>
        <h2>Current Temperature</h2>
        <TextField
          required
          label=""
          type="number"
          defaultValue={300}
          variant="outlined"
          className={[commonClasses.numericalInput, classes.numInput].join(" ")}
          InputProps={{
            endAdornment: <InputAdornment position="start">K</InputAdornment>,
          }}
          onChange={(e) => {
            setCommonCurrentTemp(Number(e.target.value));
          }}
        />
        <Accordion
          className={classes.accordion}
          expanded={expanded1}
          onChange={() => {
            setExpanded1(!expanded1);
          }}
        >
          <AccordionSummary>
            <TimelineIcon className={classes.timelineIcon} color="primary" />
            p-T path record control (click here to{" "}
            {expanded1 ? "close" : "open"})
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetail}>
            {/* <Typography>Current Temperature [K]</Typography>
          <TextField
            required
            label=""
            type="number"
            defaultValue={300}
            variant="outlined"
            className={[commonClasses.numericalInput, classes.numInput].join(
              " "
            )}
            onChange={(e) => {
              setCurrentTemp(Number(e.target.value));
            }}
          /> */}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CreateIcon />}
              className={classes.button}
              onClick={() => {
                recordCurrentValue({
                  pressure: currentData.pressure,
                  temperature: commonCurrentTemp,
                  refRuby: currentData.refRuby,
                  samRuby: currentData.samRuby,
                });
              }}
            >
              Record current value
            </Button>
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                copyData();
              }}
            >
              Copy Data to Clipboard
            </Button>
            <br />
            {/* <a
            download={`PTPath.csv`}
            href={`data:text/csv;charset=utf-16,${encodeURIComponent(
              "\uFEFF" + csvData
            )}`}
          > */}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                downloadData();
                console.log(localStorageDataJSON);
              }}
            >
              Export data
            </Button>
            {/* </a> */}

            <br />
            <Button
              className={classes.button}
              onClick={() => {
                deleteAllValues();
              }}
            >
              Delete all data
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded2}
          onChange={() => {
            setExpanded2(!expanded2);
          }}
        >
          <AccordionSummary>
            <TimelineIcon className={classes.timelineIcon} color="primary" />
            p-T path record raw data (click here to{" "}
            {expanded2 ? "close" : "open"})
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetail}>
            <List>
              {localStorageDataJSON.map((datum, idx) => (
                <ListItem
                  key={idx}
                  button
                  onClick={() => {
                    deleteValue(idx);
                  }}
                >
                  <ListItemIcon>
                    <HighlightOffIcon
                      color="primary"
                      className={classes.deleteIcon}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    [{new Date(datum.time).toLocaleString()}]{" "}
                    <span className={classes.rawDataPrimitive}>
                      T=
                      {datum.temperature}K, P={datum.pressure}GPa
                    </span>
                    <br />
                    (λ={datum.samRuby}nm, λ<sub>0</sub>= {datum.refRuby}nm)
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded3}
          onChange={() => {
            setExpanded3(!expanded3);
          }}
        >
          <AccordionSummary>
            <TimelineIcon className={classes.timelineIcon} color="primary" />
            p-T path record chart (click here to {expanded3 ? "close" : "open"})
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetail}>
            <PTRecordChart data={localStorageDataJSON} />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
