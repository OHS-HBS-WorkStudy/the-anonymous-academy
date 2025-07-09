import './CSS/Main.css';

import Manager from './Manager';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import theme from './theme';


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Manager/>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;