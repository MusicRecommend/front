import React, { useState } from "react";
import PlaylistView from './Playlist';
import MusicPlots from './MusicPlots';
import { Grid, Stack } from '@mui/material';
import ArtistsListView from './Artistslist';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { LoginFlagProvider } from '../providers/loginProvider';
export default function Contents() {
    const [playlistID, setPlaylistID] = useState<string>("37i9dQZF1DXaJxsaI3czLL");
    const [artistID, setArtistID] = useState<string>("1snhtMLeb2DYoMOcVbb8iB")
    return (
        <Stack spacing={1}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <LoginFlagProvider>
                        <PlaylistView setPlaylistID={setPlaylistID}></PlaylistView>
                    </LoginFlagProvider>
                </Grid>
                <Grid item xs={3}>
                    <ArtistsListView setArtistID={setArtistID}></ArtistsListView>
                </Grid>
                <Grid item xs={6}>
                    <MusicPlots playlistID={playlistID} artistID={artistID} ></MusicPlots>
                </Grid>
            </Grid>
            <Grid>
                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </Grid>
        </Stack >

    );
}

