const BASE_URL = "v3";

const createRoute = (path: string) => `${BASE_URL}${path}`;

export const apiRoutes = {
  users: {
    getStats: createRoute("/714f087e-a917-4771-aa50-6746cfac0e5c"),
    getUsers: createRoute("/2acd43e6-bf0c-49c7-b8fa-1a0e0ce7f321"),
  },
};
