import { makeStyles, Typography } from "@material-ui/core";
import { NextPage } from "next";

const useStyles = makeStyles(() => ({
  wrap: {
    width: 500,
  },
}));

export const Ref: NextPage = () => {
  const classes = useStyles();
  const data = [
    {
      display:
        "Datchi, F., Dewaele, A., Loubeyre, P., Letoullec, R., Le Godec, Y., & Canny, B. (2007). Optical pressure sensors for high-pressure–high-temperature studies in a diamond anvil cell. High Pressure Research, 27(4), 447-463.",
      href: "https://www.tandfonline.com/doi/full/10.1080/08957950701659593",
    },
  ];
  return (
    <>
      <h2>References</h2>
      <ul className={classes.wrap}>
        {data.map((datum) => (
          <li key={datum.href}>
            <a rel="external nofollow" target="_blank" href={datum.href}>
              {datum.display}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
