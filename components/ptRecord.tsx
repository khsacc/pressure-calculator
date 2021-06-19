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
} from "@material-ui/core";
import TimelineIcon from "@material-ui/icons/Timeline";
import CreateIcon from "@material-ui/icons/Create";
import { NextPage } from "next";
import { Theme } from "../styles/theme";
import { create } from "jss";
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
    marginTop: "15px",
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
}));



const itemName = "ptRecord";

export const PTRecord: NextPage<{ currentData: RawDatum }> = ({
  currentData,
}) => {
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

  // Accordion
  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(true);
  const [expanded3, setExpanded3] = useState(false);

  return (
    <div className={classes.accordionWrap}>
      <Accordion
        className={classes.accordion}
        expanded={expanded1}
        onChange={() => {
          setExpanded1(!expanded1);
        }}
      >
        <AccordionSummary>
          <TimelineIcon className={classes.timelineIcon} color="primary" />
          p-T path record control
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          <Typography>Current Temperature [K]</Typography>
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
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CreateIcon />}
            onClick={() => {
              recordCurrentValue({
                pressure: currentData.pressure,
                temperature: currentTemp,
                refRuby: currentData.refRuby,
                samRuby: currentData.samRuby,
              });
            }}
          >
            Record current value
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded2}
        onChange={() => {
          setExpanded2(!expanded2);
        }}
      >
        <AccordionSummary>p-T path record raw data</AccordionSummary>
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              copyData();
            }}
          >
            Copy Data to Clipboard
          </Button>
          <br />
          <Button
            onClick={() => {
              deleteAllValues();
            }}
          >
            Delete all data
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded3}
        onChange={() => {
          setExpanded3(!expanded3);
        }}>
        <AccordionSummary>p-T path record chart</AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          <PTRecordChart data={localStorageDataJSON} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
