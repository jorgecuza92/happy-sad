import logo from './logo.svg';
import './components/App.css';
import Application from './components/Application';
import Register from './components/Registration';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
     <h1>Succeed At Failing</h1>
     <Application />
     <Register />
    </div>
  );
}

export default App;
