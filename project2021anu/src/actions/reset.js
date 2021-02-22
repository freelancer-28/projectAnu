const reset = (payload) => {
  return {
    type: "RESET_ALL_TO_DEFAULT",
    payload,
  };
};

export { reset };
