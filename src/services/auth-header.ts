export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;

  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.token.access_token) {
    return { "Content-type": "application/json", Authorization: 'Bearer ' + user.token.access_token };
  } else {
    return { "Content-type": "application/json", Authorization: '' };
  }
}
