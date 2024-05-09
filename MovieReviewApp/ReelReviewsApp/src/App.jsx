import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProtectedPage from "./components/ProtectedPage";
import Profile from "./pages/Profile";
import Spinner from "./components/Spinner";
import { useSelector } from 'react-redux';
import AdminIndex from "./pages/Admin/adminIndex";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />c
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <AdminIndex />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
