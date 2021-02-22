
const addFile = (state = null, action) => {
  switch (action.type) {
    case "ADD_FILE":
      console.log('---------ADD_FILE------------');
      // console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};

// const producerOptions = (state = defaultValue, action) => {
//   switch (action.type) {
//     case "UPDATE_PRODUCER_OPTIONS":
//       console.log('---------UPDATE_PRODUCER_OPTIONS------------');
//       // console.log(action.payload)
//       return action.payload;
//     case "RESET_ALL_TO_DEFAULT":
//       return defaultValue;
//     default:
//       return state;
//   }
// };

// const selectProducer = (state) => state.producer;
// const selectProducerOptions = (state) => state.producerOptions;

export { addFile };