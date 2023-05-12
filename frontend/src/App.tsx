import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/UserProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Test from "./pages/Test";

function App() {
  const { username } = useContext(UserContext);
  console.log("username :", username);

  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Routes>
          {!!username ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
