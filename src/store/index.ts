import { legacy_createStore as createStore, combineReducers, Store, compose } from 'redux'
import { applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import global from './modules/app'
import menu from './modules/menu'
import tabs from './modules/tabs'
import auth from './modules/auth'
import breadcrumb from './modules/breadcrumb'

const reducer = combineReducers({
  global,
  menu,
  tabs,
  auth,
  breadcrumb
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleWares = applyMiddleware(reduxThunk, reduxPromise)
const store: Store = createStore(reducer, composeEnhancers(middleWares))

export { store }
