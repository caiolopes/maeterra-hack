const isLogged = () => {
  return localStorage.getItem('user');
}

const setLogin = (email) => {
  localStorage.setItem('user', email);
}

const signOut = () => {
  localStorage.clear();
}

export { setLogin, isLogged, signOut };
