import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './app/app.reducers'
import userReducer from './user/user.reducers'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer
})

export type RootState = ReturnType<any>

export default rootReducer
