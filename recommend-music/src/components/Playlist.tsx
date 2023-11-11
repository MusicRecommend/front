import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import List from '@mui/material/List';

import { Playlist, Track, Playlists, Tracks } from "./Types";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { AuthInfoContext } from '../providers/loginProvider';

type Props = {
    setPlaylistID: React.Dispatch<React.SetStateAction<string>>

}

const PlaylistView: React.FC<Props> = ({ setPlaylistID }: Props) => {
    const [tracks, setTracks] = useState<Tracks>({} as Tracks);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    // eslint-disable-next-line
    const [authInfo, _] = useContext(AuthInfoContext);
    const AccessToken = authInfo.token;
    const handleClick = (track: Track) => {
    }
    const fetchPlaylist = async (id: string) => {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: { 'Authorization': `Bearer ${AccessToken}` }
        });
        const data: Playlist = await response.json();
        setTracks(data.tracks)
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Stack spacing={1}>
            <Autocomplete
                onChange={(event, item) => {
                    if (item !== null) {
                        //setSelectedPlayList(item);
                        fetchPlaylist(item.id);
                        setPlaylistID(item.id);
                    }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states"
                options={playlists}
                sx={{ width: 200 }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="プレイリスト" />}
            />
            <List sx={{
                width: '100%',
                maxWidth: 200,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 }
            }}>
                {
                    Array.isArray(tracks.items) ? tracks.items.map((track) => (
                        <PlaylistItem key={track.track.id}
                            track={track.track}
                            handleClick={handleClick}></PlaylistItem>
                    )) : null
                }
            </List>
        </Stack>



    )
}


export default PlaylistView