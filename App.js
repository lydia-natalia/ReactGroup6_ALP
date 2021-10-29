import React from 'react';
import { store } from './src/store';
import { Provider } from 'react-redux'
import RouteNavigation from './src/navigation/Index';
//import { PersistGate } from 'redux-persist/lib/integration/react';

const App = () => {
    return (
      <Provider store={store}>
        <RouteNavigation />
      </Provider>
    )
    // return (
    //   <RouteNavigation />
    // )
}

export default App;