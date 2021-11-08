const jobApplications = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_JOB_APPLICATIONS":
      return action.payload;
    default:
      return state;
  }
};

const selectJobApplications = (state) => state.jobApplications;

export { jobApplications, selectJobApplications };