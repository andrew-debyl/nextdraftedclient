import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Portfolios from './pages/Portfolios'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfile from './pages/UserProfile'
import Header from './components/Header'
import ForgotPass from './components/ForgotPass'
import Portfolio from './components/Portfolio'

function App() {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/portfolios" element={<Portfolios/>}/>
          <Route path="/portfolios/:portfolioId" element={<Portfolio/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile/:username" element={<UserProfile/>}/>
          <Route path="/forgotpass" element={<ForgotPass/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App