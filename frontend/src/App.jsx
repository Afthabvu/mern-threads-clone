import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";

function App() {
  const currentUser = useRecoilValue(userAtom);
  

  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={currentUser ? <HomePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={!currentUser ? <AuthPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/update"
          element={currentUser ? <UpdateProfilePage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/:username"
          element={
            currentUser ? (
              <>
                <UserPage />
               <CreatePost/>
              </>
            ) : (
              <UserPage />
            )
          }
        />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
      {currentUser && <LogoutButton />}
      {/* {user && <CreatePost />} */}
    </Container>
  );
}

export default App;
