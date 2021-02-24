const updateRoute = (payload) => {
  return {
    type: "UPDATE_ROUTE",
    payload,
  };
};

const updateRouteOptions = (payload) => {
  return {
    type: "UPDATE_ROUTE_OPTIONS",
    payload,
  };
};

export { updateRoute, updateRouteOptions };
