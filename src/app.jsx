import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Footer from './components/Footer';
import TShirt from './components/Design/TShirt';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Orderpage from './components/Orders/OrderPage';
import Payment from './components/Orders/Payment';
import Profile from "./components/UserProfile/Profile";


function App() {
 

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/design' element={<TShirt/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/order' element={<Orderpage/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/profile' element={<Profile/>}/>
       
   </Routes>
   <Footer/>
</Router>
  )
}

export default App