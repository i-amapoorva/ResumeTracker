class TokenService {
  getLocalAccessToken() {
    const accessToken =
      localStorage.getItem("token_type") + " " + localStorage.getItem("token");
    // const accessToken = "Bearer ysandakjsnjsdkmkwj";
    return accessToken;
  }
  updateLocalAccessToken(token) {
    // let accessToken = "Bearer "+token;
    localStorage.setItem("token", token);
    localStorage.setItem("token_type", "Bearer");
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }
  removeUser() {
    localStorage.removeItem("user");
  }
  clearStorage() {
    localStorage.clear();
  }

  getPermission() {
    return JSON.parse(localStorage.getItem("permissions"));
  }
  setPermission(permission) {
    console.log(JSON.stringify(permission));
    var name = [];
    for (var i = 0; i < permission.length; i++) {
      name.push(permission[i].name);
    }
    console.log(name);
    localStorage.setItem("permissions", JSON.stringify(name));
  }

  setRole(role) {
    console.log(JSON.stringify(role));
    localStorage.setItem("role", JSON.stringify(role));
  }
  getRole() {
    return JSON.parse(localStorage.getItem("role"));
  }
}
export default new TokenService();
