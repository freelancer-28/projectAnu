const adminFileData = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_ADMIN_FILE_DATA":
      return action.payload;
    default:
      return state;
  }
};

const selectAdminFileData = (state) => state.adminFileData;

export { adminFileData, selectAdminFileData };