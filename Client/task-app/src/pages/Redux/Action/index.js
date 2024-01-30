export const counter = (phoneNum) => {
    return {
        type: "counter",
        payload: phoneNum
    }
}

export const accessToken = (token) => {
    return {
        type: "accessToken",
        payload: token
    }
}

export const userName = (name) => {
    return {
        type: "userName",
        payload: name
    }
}

export const toggleSelected = (taskName) => {
    return {
        type: 'TOGGLE_SELECTED',
        payload: taskName,
    }
};

export const taskListArray = (data) => {
    return {
        type: 'taskListArray',
        payload: data,
    }
};