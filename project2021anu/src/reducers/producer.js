const defaultValue = []

const producer = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCER":
      console.log('---------UPDATE_PRODUCER------------');
      // console.log(action.payload)
      return action.payload;
    case "RESET_ALL_TO_DEFAULT":
      return null;
    default:
      return state;
  }
};

const producerOptions = (state = defaultValue, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCER_OPTIONS":
      console.log('---------UPDATE_PRODUCER_OPTIONS------------');
      // console.log(action.payload)
      return action.payload;
    case "RESET_ALL_TO_DEFAULT":
      return defaultValue;
    default:
      return state;
  }
};

const frequencyIdsOptions = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_FREQUENCY_IDS_OPTIONS":
      console.log('---------UPDATE_FREQUENCY_IDS_OPTIONS------------');
      // console.log(action.payload)
      return action.payload;
    case "RESET_ALL_TO_DEFAULT":
      return {};
    default:
      return state;
  }
};

const selectProducer = (state) => state.producer;
const selectProducerOptions = (state) => state.producerOptions;
const selectFrequencyIdsOptions = (state) => state.frequencyIdsOptions;

export { producer, producerOptions, frequencyIdsOptions, selectProducer, selectProducerOptions, selectFrequencyIdsOptions };