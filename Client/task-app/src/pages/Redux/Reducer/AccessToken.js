const initailValue =''

const accessToken = (state = initailValue, action) => {
    if (action.type === "accessToken") {
        return action.payload;
    } else {
        return state;
    }
}

export default accessToken