const defaultValue = []

const fileData = (state = defaultValue, action) => {
  switch (action.type) {
    case "UPDATE_FILE_DATA":
      return action.payload;
    case "RESET_ALL_TO_DEFAULT":
      return defaultValue;
    default:
      return state;
  }
};

const selectFileData = (state) => state.fileData;

export { fileData, selectFileData };
