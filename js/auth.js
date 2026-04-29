var USERS = [
  { user: "cliente1", pass: "gonosororo2026" }
];

var SESSION_KEY = "membros_session";
var SESSION_DAYS = 30;

function login(user, pass, remember) {
  var found = USERS.find(function(u) { return u.user === user && u.pass === pass; });
  if (!found) return false;
  var session = {
    user: user,
    expires: remember ? Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 : null
  };
  if (remember) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return true;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  var raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  if (!raw) return false;
  try {
    var session = JSON.parse(raw);
    if (session.expires && Date.now() > session.expires) {
      logout();
      return false;
    }
    return true;
  } catch(e) {
    return false;
  }
}

function getUser() {
  var raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw).user;
  } catch(e) {
    return null;
  }
}
