import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import List from '@mui/material/List';

import { Playlist, Track, Playlists, Tracks } from "./Types";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

type Props = {
    setPlaylistID: React.Dispatch<React.SetStateAction<string>>
}

const SearchPlaylistView: React.FC<Props> = ({ setPlaylistID }: Props) => {
    // eslint-disable-next-line
    const [tracks, setTracks] = useState<Tracks>({} as Tracks);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [searchPlaylistName, setSearchPlaylistName] = useState<string>("");

    // eslint-disable-next-line
    const handleClick = (track: Track) => {
    }
    useEffect(() => {
        const fetchPlaylists = async () => {
            const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/v1/search?type=playlists&q=${searchPlaylistName}`);
            const playlists: Playlists = await response.json();
            setPlaylists(playlists.items);
        }
        fetchPlaylists();
    }, [searchPlaylistName])
    return (
        <Stack spacing={1}>
            <TextField id="outlined-basic" label="プレイリスト検索欄" variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchPlaylistName(event.target.value);
                }}
            />
            <Autocomplete
                onChange={(event, item) => {
                    if (item !== null) {
                        //setSelectedPlayList(item);
                        setPlaylistID(item.id);
                    }
                }}
                id="controllable-states-demo"
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


export default SearchPlaylistView