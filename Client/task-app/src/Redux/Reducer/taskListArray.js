
const initailValue = {
    taskList_Array: []
}

const taskListArray = (state = initailValue, action) => {
    switch (action.type) {
        case 'taskListArray':
            if (state.selectedDelete.includes(action.payload)) {
                return {
                    ...state,
                    selectedDelete: state.selectedDelete.filter((element) => element !== action.payload)
                };
            } else {
                return {
                    ...state,
                    selectedDelete: [...state.selectedDelete, action.payload]
                };
            }
        default:
            return state;
    }
};

export default taskListArray;
