const jobData = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_JOB_DATA":
      return action.payload;
    default:
      return state;
  }
};

const selectJobData = (state) => state.jobData;

export { jobData, selectJobData };