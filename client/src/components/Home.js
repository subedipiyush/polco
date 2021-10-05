import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchSongs } from "../store/utils/thunkCreators";
import { FilterBox, SongListView } from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  }
}));

const Home = (props) => {
  const classes = useStyles();
  const { fetchSongs } = props;

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);


  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <FilterBox />
        <SongListView />
      </Grid>
    </>
  );

};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => {
      dispatch(fetchSongs());
    }
  };
};

export default connect(null, mapDispatchToProps)(Home);