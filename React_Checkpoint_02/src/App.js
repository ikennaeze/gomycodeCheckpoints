import logo from './logo.svg';
import './App.css';
import PlayerList from './PlayerList';

function App() {
  return (
    <>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
    <PlayerList></PlayerList>
    </div>
    </>
  );
}

export default App;
