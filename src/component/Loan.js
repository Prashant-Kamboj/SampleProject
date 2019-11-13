import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Loader from "react-loader-spinner";
import Interest from "./Intrest";
import Header from "./Header";
import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { AmountSlider, MonthSlider } from "./Slider";

class SliderPage extends Component {
  state = {
    amount: 0,
    month: 0,
    min: 500,
    max: 5000,
    intrestRate: null,
    monthlyPayment: null,
    loading: false,
    showHistory: false,
    cacheData: JSON.parse(localStorage.getItem("data")) || [],
    showError: false
  };

  handlePricingChange = (event, value) => {
    // console.log(value);
    this.setState({
      amount: value
    });
  };

  handleMonths = (event, value) => {
    this.setState({
      month: value
    });
  };
  formatValue = x => {
    if (x !== undefined) {
      return `$${x}`;
    } else {
      return `$${this.state.min}`;
    }
  };

  newLoan = () => {
    this.setState({
      showHistory: false,
      intrestRate: null,
      monthlyPayment: null,
      amount: 0,
      month: 0
    });
  };

  formatMonth = x => {
    if (x !== undefined) {
      return x;
    } else {
      return 6;
    }
  };

  fetchHistoryData = event => {
    this.closeNav();
    this.setState({
      showHistory: true
    });
    const index = event.target.id;
    const cache = this.state.cacheData;
    this.setState({
      intrestRate: `${cache[index].intrestRate}%`,
      monthlyPayment: `$${cache[index].monthlyPay}`,
      amount: cache[index].LoanAmount,
      month: cache[index].Month
    });
  };

  isDataproper = (amount, month) => {
   return month !== 0 && amount !== 0 ? true : false;
  };

  getResponse = (event, value) => {

    const validate = this.isDataproper(this.state.amount, value);
    if (validate) {
        this.setState({
            loading: true
          });
      axios
        .get("https://ftl-frontend-test.herokuapp.com/interest", {
          params: {
            amount: this.state.amount,
            numMonths: value
          }
        })
        .then(response => {
          const data = response.data;
          const interest = `${data.interestRate}%`;
          const monthPay = `$${data.monthlyPayment.amount}`;
          this.setState({
            intrestRate: interest,
            monthlyPayment: monthPay,
            loading: false
          });

          const historyData = {
            intrestRate: data.interestRate,
            monthlyPay: data.monthlyPayment.amount,
            LoanAmount: this.state.amount,
            Month: this.state.month
          };

          this.state.cacheData.push(historyData);
          localStorage.setItem("data", JSON.stringify(this.state.cacheData));
        });
    } else {
      this.setState({
          showError: true
      })
    }
  };

  openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  closeButton = () => {
      this.setState({
          showError: false
      })
      }
  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

  render() {
    const overlayStyle = {
      display: this.state.loading ? "block" : "none"
    };
    return (
      <React.Fragment>
        <div className="topnav">
          {this.state.showHistory ? (
            <React.Fragment>
              <button className="history" onClick={this.openNav}>
                History
              </button>
              <button className="newLoan" onClick={this.newLoan}>
                New Loan
              </button>
            </React.Fragment>
          ) : (
            <button className="history" onClick={this.openNav}>
              History
            </button>
          )}
        </div>

        <Grid container spacing={0}>
          <Header showHistory={this.state.showHistory} />

          <Grid container>
            <Grid item md={6} xs={12}>
              {this.state.showHistory ? (
                <h3>Loan Amount</h3>
              ) : (
                <h3>Select Loan Amount</h3>
              )}
              {this.state.showError ? <SnackbarContent
                className="Error"
                aria-describedby="client-snackbar"
                style={{backgroundColor:"red", position:"absolute", zIndex:"4"}}
                message={
                  <span id="client-snackbar" className="message" style={{backgroundColor: "red"}}>
                    {"Please select amount of Loan"}
                  </span>
                }
                
                action={[
                  <IconButton key="close" aria-label="close" color="inherit" onClick={this.closeButton}>
                    <CloseIcon className="close" />
                  </IconButton>
                ]}
              /> : null}  
              <AmountSlider
                style={{ marginTop: "20px" }}
                min={this.state.min}
                max={this.state.max}
                valueLabelDisplay={"auto"}
                valueLabelFormat={this.formatValue}
                onChange={this.handlePricingChange}
                showHistory={this.state.showHistory}
                amount={this.state.amount}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              {this.state.showHistory ? <h3>Month</h3> : <h3>Select Month</h3>}
              <MonthSlider
                style={{ marginTop: "20px" }}
                min={6}
                max={24}
                valueLabelDisplay={"auto"}
                valueLabelFormat={this.formatMonth}
                onChange={this.handleMonths}
                onChangeCommitted={this.getResponse}
                showHistory={this.state.showHistory}
                month={this.state.month}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} md={12}>
            {this.state.showHistory ? (
              <h2>Interest</h2>
            ) : (
              <h2>Calculate Interest</h2>
            )}
          </Grid>
        </Grid>

        <Interest
          intrestRate={this.state.intrestRate}
          monthlyPayment={this.state.monthlyPayment}
        />

        <div id="overlay" style={{ display: overlayStyle.display }}>
          <Loader
            type="ThreeDots"
            color="white"
            height={40}
            width={100}
            visible={true}
            style={{ marginTop: "400px" }}
          />
        </div>

        <div id="mySidepanel" className="sidepanel">
          <p className="closebtn" onClick={this.closeNav}>
            &times;
          </p>
          {this.state.cacheData.map((ele, i) => (
            <p key={i} id={i} onClick={this.fetchHistoryData}>
              Loan{i + 1}
            </p>
          ))}
          <p></p>
        </div>
      </React.Fragment>
    );
  }
}

export default SliderPage;
