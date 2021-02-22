const submitFile = (payload) => {
  return {
    type: "ADD_FILE",
    payload,
  };
};

export { submitFile };
