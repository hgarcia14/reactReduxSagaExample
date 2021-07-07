import React, { Component } from 'react';
import Routes from './routes/Routes';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import WindowFocusHandler from './components/WindowFocusHandler';

// setup fake backend
//import { configureFakeBackend } from './helpers';

// Themes

// default
import './assets/scss/theme.scss';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';


// configure fake backend
//configureFakeBackend();

/**
 * Main app component
 */
class App extends Component {

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <WindowFocusHandler />
        <Routes></Routes>
      </DndProvider>
    );
  }
}

export default App;
