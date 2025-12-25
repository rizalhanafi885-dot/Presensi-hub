import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

function register() {
  if (password.value !== password2.value) {
    alert("Password tidak sama"); return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (res) => {
      await setDoc(doc(db, "users", res.user.uid), {
        nama: nama.value,
        npm: npm.value,
        alamat: alamat.value,
        tglLahir: tglLahir.value,
        pendidikan: { smp: smp.value, sma: sma.value }
      });
      window.location.href = "index.html";
    })
    .catch(e => alert(e.message));
}

window.register = register;
