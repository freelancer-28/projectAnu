const updateFileData = (payload) => {
  return {
    type: "UPDATE_FILE_DATA",
    payload,
  };
};

export { updateFileData };
