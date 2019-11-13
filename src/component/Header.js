import React from 'react';
import {Grid} from '@material-ui/core';

const Header = props => {

    
    return (
        <Grid container>
            <Grid item md={12} xs={12}>
            {!props.showHistory ? <h2>Check Your Loan</h2> : <h2>Loan</h2>}
            </Grid>
          </Grid>
    )
}

export default Header;