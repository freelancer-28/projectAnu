const updateProducer = (payload) => {
  return {
    type: "UPDATE_PRODUCER",
    payload,
  };
};

const updateProducerOptions = (payload) => {
  return {
    type: "UPDATE_PRODUCER_OPTIONS",
    payload,
  };
};

export { updateProducer, updateProducerOptions };
