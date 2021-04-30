const adminRawData = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_ADMIN_RAW_DATA":
      return action.payload;
    default:
      return state;
  }
};

const selectAdminRawData = (state) => state.adminRawData;

export { adminRawData, selectAdminRawData };