export const routeConfig = {
  landing: {
    root: "/",
    endpoint: {
      home: "/",
      download: "/download",
      team: "/team",
      contact: "/contact",
    },
  },

  admin: {
    root: "/main",
    login: "/admin-login",
    endpoint: {
      assignment: "main",
      analyst: "/main/analyst",
      user_management: "/main/user-management",
      staff_management: "/main/staff-management",
    },
  },

  auth: {
    root: "/auth",
    endpoint: {
      not_found: "/not-found",
    },
  },

  reportview: {
    root: "/report-view",
    endpoint: {},
  },
};
