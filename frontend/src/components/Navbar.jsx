import { NavLink } from "react-router-dom"
import {MdCategory, MdContacts, MdContactSupport, MdHomeFilled, MdShop2, MdShoppingBag, MdShopTwo, MdTrackChanges} from "react-icons/md"

const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink to={'/'} className={({isActive}) => isActive ? "active_link" : ""}><div className="flexCenter gap-x-1">< MdHomeFilled/>Home</div></NavLink>
      <NavLink to={'/product'} className={({isActive}) => isActive ? "active_link" : ""}><div className="flexCenter gap-x-1">< MdCategory/>Products</div></NavLink>
      <NavLink to={'/aboutus'} className={({isActive}) => isActive ? "active_link" : ""}><div className="flexCenter gap-x-1">< MdContacts/>About Us</div></NavLink>
    </nav>
  )
}

export default Navbar