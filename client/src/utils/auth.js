const TOKEN_NAME = 'AUTH_TOKEN';

export function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function setToken(val) {
  return localStorage.setItem(TOKEN_NAME, val);
}

export function rmToken() {
  return localStorage.removeItem(TOKEN_NAME);
}
