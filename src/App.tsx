import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Vehicles from './Vehicles';
import Placeholder from './Placeholder';

function App() {
  return (
    <>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <Typography variant="h4" >Welcome to C-19 Autobody</Typography>
        </Toolbar>
        <div>
          <Link to="/" component={Button}>Home</Link>
          <Link to="/vehicles" component={Button}>Vehicles</Link>
          <Link to="/owners" component={Button}>Owners</Link>
          <Link to="/services" component={Button}>Services</Link>
          <Link to="/parts" component={Button}>Parts</Link>
          <Link to="/workorders" component={Button}>Work Orders</Link>
        </div>
      </AppBar>

      <div>
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/vehicles" component={Vehicles} />
            <Route path="/owners" component={Placeholder} />
            <Route path="/services" component={Placeholder} />
            <Route path="/parts" component={Placeholder} />
            <Route path="/workorders" component={Placeholder} />
          </Switch>
        </main>
      </div>
    </>
  );
}

export default App;