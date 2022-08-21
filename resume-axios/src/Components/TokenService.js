
class TokenService {
  getLocalAccessToken() {
    const accessToken = localStorage.getItem("token_type")+" "+localStorage.getItem("token");
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
}
export default new TokenService();