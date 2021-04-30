const updateAdminRawData = (payload) => {
  return {
    type: "UPDATE_ADMIN_RAW_DATA",
    payload,
  };
};

export { updateAdminRawData };