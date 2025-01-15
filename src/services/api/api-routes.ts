const BASE_URL = "v3";

const createRoute = (path: string) => `${BASE_URL}${path}`;

export const apiRoutes = {
  users: {
    getStats: createRoute("/981756f3-f40f-468d-91bc-fd1abd0a923f"),
    getUsers: createRoute("/3a2eb568-4bac-4710-aa6e-6d37c5d2eecb"),
  },
};
