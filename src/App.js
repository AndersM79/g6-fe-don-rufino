import { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import firebaseConfig from "./config/firebase";

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ file: App.js ~ line 15 ~ App ~ products", products);
  const [user, loading, error] = useAuthState(auth);
  const accessToken = user && user.accessToken;
  console.log("🚀 ~ file: App.js ~ line 17 ~ App ~ accessToken", accessToken);

  useEffect(() => {
    fetch("http://localhost:3000/products/getByPrice/100", {
      headers: { authorization: `Bearer ${accessToken}` },
    })
      .then((data) => data.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.log("🚀 ~ file: App.js ~ line 22 ~ useEffect ~ error", error);
      });
  }, [accessToken]);

  return (
    <div className='App'>
      <button onClick={() => signInWithPopup(auth, provider)}>
        login con firebase
      </button>
      {products.map((product) => (
        <li>{product.descripcion}</li>
      ))}
    </div>
  );
}

export default App;
