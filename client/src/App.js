import './App.css';
import {Route} from 'react-router-dom';
import GameCards from './modules/GameCards';
import LandingPage from './modules/LandingPage';
import DetailPage from './modules/DetailPage'

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={LandingPage} />
      <Route path='/main' component={GameCards} />
      <Route exact path='/videogames/:id_videogame' render={({match}) => <DetailPage id={match.params.id_videogame} />} />
    </div>
  );
}

export default App;
