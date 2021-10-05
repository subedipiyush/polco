import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardContent, Grid, Typography, Checkbox, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setFavoriteStatus } from "../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "90vh"
    }
}));

const SongListView = (props) => {
    const classes = useStyles();

    const { filteredSongs, favorites, setFavoriteStatus } = props;

    const toggleFavoriteStatus = (event) => {

        const songId = event.target.name;

        setFavoriteStatus(parseInt(songId), event.target.checked, favorites);
    };

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}
        >
            { filteredSongs && filteredSongs.map((song) => {

                return (
                    <Grid item sm={12} key={song.id}>
                        <Card>
                            <CardHeader
                                title={song.title}
                            />
                            <CardContent>
                                <Grid container direction="row">
                                    <Grid item sm={2}>
                                        <Typography variant="h6" gutterBottom>
                                            Length: {song.length}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={3}>
                                        <Typography variant="h6" gutterBottom>
                                            Album: {song.album.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Typography variant="h6" gutterBottom>
                                            Rating: {song.rating}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Typography variant="h6" gutterBottom>
                                            Genre: {song.genre}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Typography variant="h6" gutterBottom>
                                            Release Year: {song.album.year}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row">
                                    <Grid item sm={6}>
                                        <Typography variant="h6" gutterBottom>
                                            Artists: { song.artists.map((artist) => artist.name + " " ) }
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <Typography variant="h6" gutterBottom>
                                            <FormControlLabel
                                                control={
                                                  <Checkbox checked={favorites.indexOf(song.id) !== -1}
                                                            onChange={toggleFavoriteStatus}
                                                            name={"" + song.id} />
                                                }
                                                label="Toggle favorite status"
                                              />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                     </Grid>
                );
            })}

        </Grid>
    );
};


const mapStateToProps = (state) => {
  return {
    filteredSongs: state.filteredSongs,
    favorites: state.favorites,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    setFavoriteStatus: (songId, isFavorite, favorites) => {
        dispatch(setFavoriteStatus(songId, isFavorite, favorites));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SongListView);
