import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
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
const store = getFirestore();

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

//realtime에 저장 query사용불가
// export async function addNewProduct(product, image) {
//   const id = uuidv4();
//   return set(ref(db, `products/${id}`), {
//     ...product,
//     id,
//     price: parseInt(product.price),
//     image,
//     options: product.options.split(","),
//   });
// }

//store에 저장 query사용=> filter사용
export async function addNewProduct(product, image) {
  const id = uuidv4();
  await setDoc(doc(store, "products", id), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(","),
  });
}

//realtime 사용
// export async function getProducts() {
//   return get(ref(db, "products"))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const products = Object.values(snapshot.val());
//         return products;
//       }
//       return [];
//     })
//     .catch(console.error);
// }

//firestore사용 합쳤다.
export async function getProducts(selected, filter) {
  let products = [];

  if (!selected && !filter) {
    const querySnapshot = await getDocs(collection(store, "products"));
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });
    return products;
  } else if (!selected && filter) {
    const q = query(
      collection(store, "products"),
      where("price", ">", filter[0]),
      where("price", "<", filter[1])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      products.push(doc.data());
    });
    return products;
  } else if (selected && filter) {
    const q = query(
      collection(store, "products"),
      where("category", "==", selected),
      where("price", ">", filter[0]),
      where("price", "<", filter[1])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      products.push(doc.data());
    });
    return products;
  }
}

//firestore에서 query를 사용해서 카테고리, 필터한 데이터를 가져옴
// export async function getCategoryProducts(selected, filter) {
//   let products = [];
//   const q = query(
//     collection(store, "products"),
//     where("category", "==", selected),
//     where("price", ">", filter[0]),
//     where("price", "<", filter[1])
//   );
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     //console.log(doc.data());
//     products.push(doc.data());
//   });
//   return products;
// }

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
