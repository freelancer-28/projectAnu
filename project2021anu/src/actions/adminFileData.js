const updateAdminFileData = (payload) => {
  return {
    type: "UPDATE_ADMIN_FILE_DATA",
    payload,
  };
};

export { updateAdminFileData };