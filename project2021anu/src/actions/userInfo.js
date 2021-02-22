const updateUserInfo = (payload) => {
  return {
    type: "UPDATE_USER_INFO",
    payload,
  };
};



export { updateUserInfo };