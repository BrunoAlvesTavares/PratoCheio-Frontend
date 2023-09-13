export const TOKEN_KEY = '@Prae-Token';
export const CURRENT_USER = '@current-User';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER));

export const isAllowed = (accessLevel) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return false
  }

  if (typeof accessLevel === 'string') {
    return currentUser.accessLevel === accessLevel;
  } else {
    return accessLevel.includes(currentUser.accessLevel);
  }
};

export const hasModules = (modules) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return false
  }

  if (typeof modules === 'string') {
    return currentUser.modules.some(r => modules === r);
  } else {
    return currentUser.modules.some(r => modules.indexOf(r) >= 0);
  }
};

export const login = (token, currentUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER);
};