import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      paddingTop: theme.spacing(1),
      display: "inline-block",
      left: "50%",
      transform: "translate(-50%)",
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    top: {
      color: "primary",
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
  })
);
