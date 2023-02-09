import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();

//상태변환관찰자가 생겨서 굳이 return할필요가 없어졌다. 비동기 함수 만들필요없다.
// export async function login() {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     return user;
//   } catch (error) {
//     console.log(console.error);
//   }
// }

// export async function logout() {
//   return signOut(auth).then(() => null);
// }

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    //1.사용자가 있는 경우에 (로그인한 경우)
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  //2. 사용자가 어드민 권한을 갖고 있는지 확인
  //3. {...user, isAdmin: true/false}
  return get(ref(db, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        //console.log(isAdmin);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, image) {
  const id = uuidv4();
  return set(ref(db, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(","),
  });
}

export async function getProducts() {
  return get(ref(db, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = Object.values(snapshot.val());
        return products;
      }
      return [];
    })
    .catch(console.error);
}

export async function addOrUpdateCart(userId, product) {
  return set(ref(db, `/cart/${userId}/${product.id}`), product);
}

export async function getCart(userId) {
  return get(ref(db, `/cart/${userId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const cartItems = Object.values(snapshot.val());
        return cartItems;
      }
      return [];
    })
    .catch(console.error);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(db, `cart/${userId}/${productId}`));
}

export async function addOrUpdateWish(userId, product) {
  return set(ref(db, `/wish/${userId}/${product.id}`), product);
}

export async function getWish(userId) {
  return get(ref(db, `/wish/${userId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const wishItems = Object.values(snapshot.val());
        return wishItems;
      }
      return [];
    })
    .catch(console.error);
}

export async function removeFromWish(userId, productId) {
  return remove(ref(db, `wish/${userId}/${productId}`));
}
