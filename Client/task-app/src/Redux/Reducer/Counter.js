const initailValue ='123'

const counter = (state = initailValue, action) => {
    if (action.type === "counter") {
        return action.payload;
    } else {
        return state;
    }
}

export default counter