import React from 'react';
// import { store, persistor } from './store';
// import { Provider } from 'react-redux'
import RouteNavigation from './src/navigation/Index';
//import { PersistGate } from 'redux-persist/lib/integration/react';

const App = () => {
    // return <Provider store={store}>
    //     <PersistGate persistor={persistor}>
    //         <RouteNavigation />
    //     </PersistGate>
    // </Provider>
    return (
      <RouteNavigation />
    )
}

export default App;