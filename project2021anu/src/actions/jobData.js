const updateJobData = (payload) => {
  return {
    type: "UPDATE_JOB_DATA",
    payload,
  };
};

export { updateJobData };