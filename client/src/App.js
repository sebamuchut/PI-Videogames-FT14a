import './App.css';
import {Route} from 'react-router-dom';
import GameCards from './modules/GameCards';
import LandingPage from './modules/LandingPage';
import DetailPage from './modules/DetailPage';
import PostGame from './modules/PostGame'

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={LandingPage} />
      <Route path='/main' component={GameCards} />
      <Route exact path='/videogames/:id_videogame' render={({match}) => <DetailPage id={match.params.id_videogame} />} />
      <Route path='/post_game' component={PostGame} />
    </div>
  );
}

export default App;
