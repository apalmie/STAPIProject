import '../css/App.css';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SeasonSearch from './Seasons/SeasonSearch';
import CharacterBio from './Characters/CharacterBio';
import EpisodeData from './Episodes/EpisodeData';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/series' component={SeasonSearch} />
          <Route path='/character/:uid' component={CharacterBio} />
          <Route path='/:charId/episode/:uid' component={EpisodeData}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;