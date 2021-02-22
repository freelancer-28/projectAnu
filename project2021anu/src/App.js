import logo from './logo.svg';
import './App.css';
import DashBoard from './Components/DashBoard'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer'
import logger from 'redux-logger'

function App() {

  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(logger),
    // other store enhancers if any
  ));
  
  return (
    <Provider store={store}>
      <div className="App">
        <DashBoard/>
      </div>
    </Provider>
  );
}

export default App;
