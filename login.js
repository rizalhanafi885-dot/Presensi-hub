import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) {
    alert("Email dan password wajib diisi");
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(() => {
      alert("Email atau password salah");
    });
}
window.login = login;
