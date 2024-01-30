import {combineReducers} from 'redux';
import counter from './Counter.js'
import accessToken from './AccessToken.js'
import userName from  './UserName.js'
import selectCheckBox from './selectCheckBox.js'
import taskListArray from './taskListArray.js'

const reducer = combineReducers({
    counter: counter,
    accessToken:accessToken,
    selectCheckBox:selectCheckBox,
    userName:userName,
    taskListArray:taskListArray
    
})
export default reducer