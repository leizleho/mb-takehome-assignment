import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Runs from './components/run/Runs';
import Sequence from './components/sequence/Sequence';

const useStyles = makeStyles({
  App: {
    margin: '24px',
  },
  Nav: {
    display: 'flex',
  },
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.App}>
        <nav className={classes.Nav}>
          <div>
            <Link to="/sequence">Home</Link>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Sequence} />
          <Route path="/sequence" component={Sequence} />
          <Route path="/runs/:sequenceId" component={Runs} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
