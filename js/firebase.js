import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCh7Esje7NR-s2UGY4Bk9bvYUZhg99YxU",
  authDomain: "js-firebase-5751e.firebaseapp.com",
  projectId: "js-firebase-5751e",
  storageBucket: "js-firebase-5751e.appspot.com",
  messagingSenderId: "505857971990",
  appId: "1:505857971990:web:108e485150f76f51b12237",
  measurementId: "G-QQ6HHTL7XJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const btn = document.getElementById("btn");
const logoutBtn = document.getElementById("logoutBtn");
const addDocumentBtn = document.getElementById("addDocumentBtn");
const getDataBtn = document.getElementById("getDataBtn");
const mainDiv = document.getElementById("mainDiv");

const signInWithEmailAndPassword = () => {
  createUserWithEmailAndPassword(auth, "ameen12@gmail.com", "12345678")
    .then(({ userCredential }) => {
      const user = userCredential.user;

      console.log(userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const signInWithGoogle = () => {
  let provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result, "result");
      var credential = result.credential;

      var token = credential.accessToken;
      var user = result.user;
      console.log(result);
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

btn.addEventListener("click", signInWithGoogle);

const getUserIfLogin = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user);
      // ...
    } else {
      console.log("user is not logged in");
    }
  });
};

getUserIfLogin();

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User Successfully logged out");
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

logoutBtn.addEventListener("click", logout);

const addData = async () => {
  const first = prompt("Enter your first name");
  const last = prompt("Enter your last name");
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first,
      last,
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

addDocumentBtn.addEventListener("click", addData);

const getData = async () => {
  const data = [];
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      data.push(
        `<div>${doc.data().first}</div>` + `<b>Total: ${doc.data().last} </b>`
      );
    });

    mainDiv.innerHTML = data.join(" ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

getDataBtn.addEventListener("click", getData);

// const getTodos = async () => {
//   const q = query(collection(db, "todos"));
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     let item = "";
//     querySnapshot.forEach((doc) => {
//       //   cities.push(doc.data().todo);
//       //   const el = document.createElement("li");
//       //   el.innerText = doc.data().todo;
//       //   list.appendChild(el);
//       item += `<li>${doc.data().todo}</li>`;
//     });
//     list.innerHTML = item;
//   });
// };
