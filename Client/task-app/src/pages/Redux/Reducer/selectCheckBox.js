// reducers.js
const initailValue = {
    selectedDelete: []
}

const selectCheckBox = (state = initailValue, action) => {
    switch (action.type) {
        case 'TOGGLE_SELECTED':
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

export default selectCheckBox;
