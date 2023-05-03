import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PollIcon from '@mui/icons-material/Poll';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminCreate from './components/admin/AdminCreate';
import AdminForm from './components/admin/AdminForm';
import { NavLink } from 'react-router-dom';
import LoginAdmin from './components/admin/LoginAdmin';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar" style={{ backgroundColor: "#e3f2fd", marginBottom: "10px" }}>
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <PollIcon sx={{ marginRight: "10px", fontSize: "34px" }}></PollIcon>
              Poll App
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>} />
          <Route path='/admin' element={<LoginAdmin></LoginAdmin>}></Route>
          <Route path='/admin/home' element={<AdminPage></AdminPage>}></Route>
          <Route path='/admin/edit/:id' element={<AdminForm></AdminForm>}></Route>
          <Route path='/admin/create' element={<AdminCreate></AdminCreate>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
