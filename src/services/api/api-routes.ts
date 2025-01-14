const BASE_URL = "v3";

const createRoute = (path: string) => `${BASE_URL}${path}`;
const createDynamicRoute = (path: string) => (id: string | string[]) =>
  `${BASE_URL}${path.replace(":id", id.toString())}`;

export const apiRoutes = {
  
  users: {
    getDetails: createRoute("/users"),
    getUsers: createDynamicRoute("/:id"),
  },
};
