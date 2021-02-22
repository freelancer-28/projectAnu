const updateFileMask = (payload) => {
  return {
    type: "UPDATE_FILE_MASK",
    payload,
  };
};

const updateFileMaskOptions = (payload) => {
  return {
    type: "UPDATE_FILE_MASK_OPTIONS",
    payload,
  };
};

export { updateFileMask, updateFileMaskOptions };