import {combineReducers} from 'redux';
import counter from './Counter.js'
import accessToken from './AccessToken.js'
import userName from  './UserName.js'

const reducer = combineReducers({
    counter: counter,
    accessToken:accessToken,
    userName:userName
})
export default reducer