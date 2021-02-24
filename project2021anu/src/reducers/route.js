const defaultValue = []

const route = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_ROUTE":
      console.log('---------UPDATE_ROUTE------------');
      // console.log(action.payload)
      return action.payload;
    case "RESET_ALL_TO_DEFAULT":
      return null;
    default:
      return state;
  }
};

const routeOptions = (state = defaultValue, action) => {
  switch (action.type) {
    case "UPDATE_ROUTE_OPTIONS":
      console.log('---------UPDATE_ROUTE_OPTIONS------------');
      // console.log(action.payload)
      return action.payload;
    case "RESET_ALL_TO_DEFAULT":
      return defaultValue;
    default:
      return state;
  }
};

const selectRoute = (state) => state.route;
const selectRouteOptions = (state) => state.routeOptions;

export { route, routeOptions, selectRoute, selectRouteOptions };