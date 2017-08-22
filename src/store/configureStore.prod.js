import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk";

const configureStore = () => {
    const store = createStore(rootReducer,
        applyMiddleware(thunkMiddleware)
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export default configureStore