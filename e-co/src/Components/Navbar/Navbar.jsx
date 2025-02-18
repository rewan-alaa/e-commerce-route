import React, { useContext } from 'react';
import Logo from '../../assets/images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext/CartContext';


export default function Navbar() {
  const {token,setToken} = useContext(AuthContext);
  const {numOfCartItems} = useContext(CartContext)
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem('token');
    setToken(null);
    setTimeout(()=>{navigate('/login')},1000);
  }
  return <>
  <nav    className='bg-green-500 flex p-5 items-center'>
    <div>
      <img src={Logo} alt="Logo" />
    </div>
    <div  className="links ms-3">
      {token ? <ul className='flex space-x-3'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="cart">Cart : {numOfCartItems}</Link></li>
        <li><Link to="categories">Categories</Link></li>
        <li><Link to="brands">Brands</Link></li>
        <li><Link to="products">Products</Link></li>
      </ul> : null}
      
    </div>
    <div  className="social ms-auto space-x-3">
      <i  className='fab fa-facebook'></i>
      <i  className='fab fa-linkedin'></i>
      <i  className='fab fa-tiktok'></i>
      <i  className='fab fa-youtube'></i>
    </div>
    <div  className='space-x-3 ms-3'>
      {token ?<button onClick={logout}>Log Out</button> :<><Link to="login">Login</Link>
        <Link to="register">Register</Link></>}
      
      
    </div>
  </nav>
  </>
}