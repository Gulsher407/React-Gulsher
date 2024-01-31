import "./App.css";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import UsercontextProvider from "./context/UsercontextProvider";

function App() {
  return (
    <UsercontextProvider>
      <h1 className=" text-3xl">  Hello welcome here</h1>
      <Login/>
      <Profile/>
    </UsercontextProvider>
  );
}

export default App;
