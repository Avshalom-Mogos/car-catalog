import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import { useStyles } from "./useStyles";

const Spinner = (props: CircularProgressProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={80}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={80}
        thickness={4}
        {...props}
      />
    </div>
  );
};
export default Spinner;
