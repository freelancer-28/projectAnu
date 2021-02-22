const defaultValue = []

const fileMask = (state = defaultValue, action) => {
    switch (action.type) {
        case "UPDATE_FILE_MASK":
            return action.payload;
        case "RESET_ALL_TO_DEFAULT":
            return defaultValue;
        default:
            return state;
    }
};

const fileMaskOptions = (state = defaultValue, action) => {
    switch (action.type) {
        case "UPDATE_FILE_MASK_OPTIONS":
            return action.payload;
        case "RESET_ALL_TO_DEFAULT":
            return defaultValue;
        default:
            return state;
    }
};

const selectFileMask = (state) => state.fileMask;
const selectFileMaskOptions = (state) => state.fileMaskOptions;

export { fileMask, selectFileMask, fileMaskOptions, selectFileMaskOptions };