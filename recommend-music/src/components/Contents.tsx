import React, { useState } from "react";
import SearchPlaylistView from './SearchPlaylist';
import MusicPlotter from './MusicPlotter';
import { Grid, Stack } from '@mui/material';
import ArtistsListView from './Artistslist';

export default function Contents() {
    const [playlistID, setPlaylistID] = useState<string>("37i9dQZF1DXaJxsaI3czLL");
    const [artistID, setArtistID] = useState<string>("1snhtMLeb2DYoMOcVbb8iB")
    return (
        <Stack spacing={1}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                    <SearchPlaylistView setPlaylistID={setPlaylistID}></SearchPlaylistView>
                </Grid>
                <Grid item xs={3}>
                    <ArtistsListView setArtistID={setArtistID}></ArtistsListView>
                </Grid>
                <Grid item xs={6}>
                    <MusicPlotter playlistID={playlistID} artistID={artistID} ></MusicPlotter>
                </Grid>
            </Grid>
        </Stack >

    );
}

