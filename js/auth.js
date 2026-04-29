var SESSION_KEY = "membros_session";
var SESSION_DAYS = 30;

function login(phone, pass) {
  var clean = phone.replace(/\D/g, '').replace(/^258/, '');
  if (!clean) return false;
  var session = {
    phone: clean,
    expires: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return true;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  var raw = localStorage.getItem(SESSION_KEY);
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
  var raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw).phone;
  } catch(e) {
    return null;
  }
}
