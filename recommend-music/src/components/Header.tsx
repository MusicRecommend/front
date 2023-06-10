import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthInfoContext, AuthContext } from '../providers/loginProvider';
type Props = {
}
const Header: React.FC<Props> = () => {
  const [authInfo, setAuthInfo] = useContext(AuthInfoContext);
  console.log("rendered")
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&scope=streaming+user-read-private+user-top-read+user-read-email&redirect_uri=${process.env.REACT_APP_HOST}/callback`
  function logout() {
    localStorage.clear();
    setAuthInfo({} as AuthContext);
    const spotifyLogoutWindow = window.open('https://www.spotify.com/logout/', 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    setTimeout(() => spotifyLogoutWindow?.close(), 2000)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" href={'/recommend'}>Top</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            Music Recommend
          </Typography>
          {authInfo.isLogin ?
            <Button color="inherit" onClick={logout}>Logout</Button> :
            <Button color="inherit" href={loginUrl} >Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;