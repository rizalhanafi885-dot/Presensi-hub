/* ================= FIREBASE ================= */
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ================= MENU & TAB ================= */
window.openTab = function (id, el) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".menu-item").forEach(m => m.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
  el?.classList.add("active");
};

document.addEventListener("DOMContentLoaded", () => {
  const first = document.querySelector(".menu-item");
  if (first) openTab("profil", first);
});

/* ===== AUTH CHECK ===== */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  loadAkademik();
  loadCashFlow();
});

/* ===== DATA AKADEMIK ===== */
window.tambah = async function () {
  const mk = document.getElementById("mk").value;
  const semester = document.getElementById("semester").value;
  const dosen = document.getElementById("dosen").value;
  const nilai = document.getElementById("nilai").value;
  const sks = document.getElementById("sks").value;

  if (!mk || !semester || !dosen || !nilai || !sks) {
    alert("Lengkapi semua data");
    return;
  }

  try {
    await addDoc(collection(db, "users", auth.currentUser.uid, "akademik"), {
      mk,
      semester,
      dosen,
      nilai: nilai.toUpperCase(),
      sks: Number(sks)
    });

    document.getElementById("mk").value = "";
    document.getElementById("semester").value = "";
    document.getElementById("dosen").value = "";
    document.getElementById("nilai").value = "";
    document.getElementById("sks").value = "";

    loadAkademik();
  } catch (error) {
    alert("Error menambah data: " + error.message);
  }
};

async function loadAkademik() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  try {
    const snap = await getDocs(collection(db, "users", auth.currentUser.uid, "akademik"));
    let no = 1;
    snap.forEach(docSnap => {
      const d = docSnap.data();
      tbody.innerHTML += `
        <tr>
          <td>${no++}</td>
          <td>${d.mk}</td>
          <td>${d.semester}</td>
          <td>${d.dosen}</td>
          <td>${d.nilai}</td>
          <td>${d.sks}</td>
          <td>
            <button onclick="hapusData('${docSnap.id}')">🗑</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Error loading akademik:", error);
  }
}

window.hapusData = async function (id) {
  if (!confirm("Hapus data?")) return;

  try {
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "akademik", id));
    loadAkademik();
  } catch (error) {
    alert("Error menghapus data: " + error.message);
  }
};

/* ===== CASH FLOW ===== */
window.tambahCashFlow = async function () {
  const tanggal = document.getElementById("tanggal").value;
  const deskripsi = document.getElementById("deskripsi").value;
  const jumlah = document.getElementById("jumlah").value;
  const tipe = document.getElementById("tipe").value;

  if (!tanggal || !deskripsi || !jumlah) {
    alert("Lengkapi semua data");
    return;
  }

  try {
    await addDoc(collection(db, "users", auth.currentUser.uid, "cashflow"), {
      tanggal,
      deskripsi,
      jumlah: Number(jumlah),
      tipe
    });

    document.getElementById("tanggal").value = "";
    document.getElementById("deskripsi").value = "";
    document.getElementById("jumlah").value = "";

    loadCashFlow();
  } catch (error) {
    alert("Error menambah cash flow: " + error.message);
  }
};

async function loadCashFlow() {
  const tbody = document.getElementById("tbodyCashFlow");
  const totalMasukEl = document.getElementById("totalPemasukan");
  const totalKeluarEl = document.getElementById("totalPengeluaran");
  const saldoEl = document.getElementById("saldo");

  tbody.innerHTML = "";
  let masuk = 0, keluar = 0;

  try {
    const snap = await getDocs(collection(db, "users", auth.currentUser.uid, "cashflow"));
    let no = 1;
    snap.forEach(docSnap => {
      const d = docSnap.data();
      d.tipe === "pemasukan" ? masuk += d.jumlah : keluar += d.jumlah;

      tbody.innerHTML += `
        <tr>
          <td>${no++}</td>
          <td>${d.tanggal}</td>
          <td>${d.deskripsi}</td>
          <td>${d.jumlah.toLocaleString()}</td>
          <td>${d.tipe}</td>
          <td>
            <button onclick="hapusCashFlow('${docSnap.id}')">🗑</button>
          </td>
        </tr>
      `;
    });

    totalMasukEl.innerText = masuk.toLocaleString();
    totalKeluarEl.innerText = keluar.toLocaleString();
    saldoEl.innerText = (masuk - keluar).toLocaleString();
  } catch (error) {
    console.error("Error loading cashflow:", error);
  }
}

window.hapusCashFlow = async function (id) {
  if (!confirm("Hapus data?")) return;

  try {
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "cashflow", id));
    loadCashFlow();
  } catch (error) {
    alert("Error menghapus cash flow: " + error.message);
  }
};

/* ================= LOGOUT ================= */
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
