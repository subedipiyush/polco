import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { MultiSelectDropDown } from "./index";

import { filter } from "../store";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
}));


const FilterBox = (props) => {
    const classes = useStyles();

    const { appliedFilters, filter } = props;

    const handleChange = (change) => {
        filter(change);
    };

    
    return (
        <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}
        >
            {appliedFilters && Object.entries(appliedFilters).map((filter) => (
                <Grid item sm={4} key={filter[0]}>
                    <MultiSelectDropDown label={filter[0]} values={filter[1]} onChange={handleChange} /> 
                </Grid>
            ))}
        </Grid>
    );
};



const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    appliedFilters: state.appliedFilters,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    filter: (change) => {
        dispatch(filter(change));
    }
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);