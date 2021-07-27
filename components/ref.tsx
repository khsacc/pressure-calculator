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
        "Ragan, D. D., Gustavsen, R., & Schiferl, D. (1992). Calibration of the ruby R 1 and R 2 fluorescence shifts as a function of temperature from 0 to 600 K. Journal of applied physics, 72(12), 5539-5544.",
      href: "https://aip.scitation.org/doi/abs/10.1063/1.351951",
    },
    {
      display:
        "Dorogokupets, P. I., & Oganov, A. R. (2007). Ruby, metals, and MgO as alternative pressure scales: A semiempirical description of shock-wave, ultrasonic, x-ray, and thermochemical data at high temperatures and pressures. Physical Review B, 75(2), 024115.",
      href: "https://journals.aps.org/prb/abstract/10.1103/PhysRevB.75.024115",
    },
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
