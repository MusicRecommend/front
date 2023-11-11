import React from 'react';
import './App.css';
import Header from './components/Header';
import { Grid, Stack } from '@mui/material';
import Contents from './components/Contents';
import Top from './components/Top';
import Callback from './components/Callback';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginFlagProvider } from './providers/loginProvider';
import Footer from './components/Footer';
import { createTheme } from '@mui/material/styles';
import { PlayerProvider } from './providers/playerProvider';
import Help from './components/Help';

function App() {
  // const [playlist, setPlaylist] = useState<Playlist>();
  return (
    <div className="App">
      <PlayerProvider>
        <Stack spacing={2}>
          <LoginFlagProvider>
            <Header thema={darkTheme}></Header>
          </LoginFlagProvider>
          <Grid container spacing={1}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Contents></Contents>} />
                  <Route path="/recommend" element={<Contents></Contents>} />
                  <Route path="/help" element={<Help></Help>} />
                  <Route path="/callback" element={<LoginFlagProvider><Callback></Callback></LoginFlagProvider>} />
                </Routes>
              </BrowserRouter>
            </Grid>
            <Grid item xs={1}>
            </Grid>
          </Grid>
          <Footer thema={darkTheme}></Footer>
        </Stack>
      </PlayerProvider>

    </div>
  );
}
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
export default App;
