import React from "react";
import { Link } from "react-router-dom";
//import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { useAuthContext } from "../contexts/AuthContext";
import User from "./User";
import Button from "./ui/Button";

import CartStatus from "./CartStatus";
import WishStatus from "./WishStatus";

export default function Navbar() {
  //Auth를 context로 만들어 글로벌하게 사용한다.
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   onUserStateChange((user) => {
  //     //console.log(user);
  //     setUser(user);
  //   });
  // }, []);
  const { user, login, logout } = useAuthContext();

  //유저상태변화 관찰자가 생겨서 로그인, 로그아웃될때마다
  //정보가 변환된 것을 알기때문에 set해줄필요없음
  // const handleLogin = () => {
  //   login().then((user) => setUser(user));
  // };

  // const handleLogout = () => {
  //   logout().then(setUser);
  // };

  return (
    <header className="flex justify-between border-b border-gray-300 py-4 px-6">
      <Link to="/" className="flex items-center text-4xl text-black">
        {/* <FiShoppingBag /> */}
        <h1 className="text-2xl">ORE & FURNI</h1>
      </Link>

      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">SHOP</Link>
        {user && (
          <Link className="relative" to="/wish">
            <WishStatus />
          </Link>
        )}
        {user && (
          <Link className="relative" to="/cart">
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <AiOutlineEdit />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </nav>
    </header>
  );
}
