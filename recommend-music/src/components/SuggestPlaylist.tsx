import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import List from '@mui/material/List';

import { Playlist, Track } from "./Types";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

const options = ['あいみょん', 'test-2'];
type Props = {
    //playlist: Playlist
    //fetchPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
}

const PlaylistView: React.FC<Props> = ({ }) => {
    const [playlist, setPlaylist] = useState<Playlist>();
    const [value, setValue] = React.useState<string | null>(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const handleClick = (track: Track) => {
    }
    useEffect(() => {
        const fetchPlaylist = async () => {
            const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/suggestPlaylist`);
            const data: Playlist = await response.json();
            setPlaylist(data)
        }
        fetchPlaylist();

    }, [])
    return (
        <Stack spacing={1}>

            <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Controllable" />}
            />
            <List sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 }
            }}>
                {
                    playlist && playlist.tracks.items.map((track) => (
                        <PlaylistItem key={track.track.id}
                            track={track.track}
                            handleClick={handleClick}></PlaylistItem>
                    ))
                }
            </List>
        </Stack>



    )
}


export default PlaylistView