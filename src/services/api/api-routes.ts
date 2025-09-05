const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createRoute = (path: string) => `${BASE_URL}${path}`;

export const apiRoutes = {
  users: {
    getStats: createRoute("/407b-277a-40ab-90b0"),
    getUsers: createRoute("/92e3-120e-4f41-9f45"),
  },
};
