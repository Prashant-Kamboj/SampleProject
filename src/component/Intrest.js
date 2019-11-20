import React, { Component } from "react";
import { Grid } from "@material-ui/core";

class Intrest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Grid container>
        <Grid item md={6} xs={6}>
          <h3>Rate of Intrest</h3>
          <h4>{this.props.intrestRate}</h4>
        </Grid>
        <Grid item md={6} xs={6}>
          <h3>Monthly Payment</h3>
          <h4>{this.props.monthlyPayment}</h4>
        </Grid>
      </Grid>
    );
  }
}

export default Intrest;
