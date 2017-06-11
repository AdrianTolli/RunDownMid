import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../app/App';
import lolreducer from '../app/redux/lolreducer';
import { BrowserRouter } from 'react-router-dom';

let store = createStore(lolreducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <Component  />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
}

render(App);

if (module.hot) {
  module.hot.accept('../app/App', () => { render(App) })
}