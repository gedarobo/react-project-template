import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import configureStore from "./store/configureStore";
import createHistory from "history/createHashHistory";

import App from "./containers/App";

// 하위 브라우저 지원을 위한 hash history
const history = createHistory();
const store = configureStore();

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} history={history}/>
        </AppContainer>,
        document.getElementById('app')
    )
}

render(App)

// HMR가 설정된 경우 render()를 호출함
if (module.hot) {
    module.hot.accept('./containers/App', () => render(App))
}