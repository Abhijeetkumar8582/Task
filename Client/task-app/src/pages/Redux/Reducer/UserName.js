const initailValue =''

const userName = (state = initailValue, action) => {
    if (action.type === "userName") {
        return action.payload;
    } else {
        return state;
    }
}

export default userName