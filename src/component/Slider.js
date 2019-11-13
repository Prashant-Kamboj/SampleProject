import React from "react";
import { Slider, Grid } from "@material-ui/core";

const AmountSlider = props => {
  return (
    <Grid container>
      {props.showHistory ? (
        <Grid item md={12} xs={12}>
          {`$${props.amount}`}
        </Grid>
      ) : (
        <Grid container>
          <Grid item md={3} xs={3}>
            $500
          </Grid>
          <Grid item md={6} xs={6}>
            <Slider
              min={props.min}
              max={props.max}
              //value={0}
              valueLabelDisplay={"on"}
              valueLabelFormat={props.valueLabelFormat}
              onChange={props.onChange}
            />
          </Grid>
          <Grid item md={3} xs={3}>
            $5000
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const MonthSlider = props => {
  return (
    <Grid container>
    {props.showHistory ? <Grid item md={12} xs={12}>
    {props.month}
    </Grid> :
    <Grid container>
     <Grid item md={3} xs={3}>
        6
      </Grid>
      <Grid item md={6} xs={6}>
        <Slider
          min={6}
          max={24}
          // value={12}
          marks={true}
          valueLabelDisplay={"on"}
          valueLabelFormat={props.valueLabelFormat}
          onChange={props.onChange}
          onChangeCommitted={props.onChangeCommitted}
        />
      </Grid>
      <Grid item md={3} xs={3}>
        24
      </Grid>
    </Grid>
}
     
    </Grid>
  );
};

export { AmountSlider, MonthSlider };
