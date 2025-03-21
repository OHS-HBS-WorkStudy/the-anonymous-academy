import logo from './logo.svg';
import './App.css';
import Manager from './Manager';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Manager/>
    </BrowserRouter>
  );
}

export default App;
