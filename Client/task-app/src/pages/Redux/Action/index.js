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
