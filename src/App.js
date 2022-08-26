import "./App.css";
import ResumeUpload from "./Pages/ResumeUpload";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ResumeSearch from "./Pages/ResumeSearch";
import LoginForm from "./Components/LoginForm";
import MyList from "./Pages/MyList";
import SignUp from "./Pages/SignUp";
import RegistraionForm from "./Components/RegistraionForm";
import ManageUser from "./Pages/ManageUser";
import ManageRole from "./Pages/ManageRole";
import CreateUser from "./Pages/CreateUser";
import CreateRole from "./Pages/CreateRole";
import ShowUser from "./Components/ShowUser";
import ResumeUpdate from "./Pages/ResumeUpdate";
import EditUser from "./Pages/EditUser";
import EditRole from "./Pages/EditRole";
import Profile from "./Components/Profile";
import RefinedSearchComponent from "./Components/RefinedSearchComponent";
import RefinedSearch from "./Components/RefinedSearch";


const routes = (
  <Router>
    <Routes>
      <Route path="/my-list" element={<MyList />} />
      <Route path="/resume-search" element={<ResumeSearch />} />
      <Route path="/resume-upload" element={<ResumeUpload />} />
      <Route path="/" element={<LoginForm />} />
     
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/" element={<LoginSignUp />} /> */}
      <Route path="/manage-user" element={<ManageUser />} />
      <Route path="/manage-role" element={<ManageRole />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/create-role" element={<CreateRole />} />
      <Route path="/show-user" element={<ShowUser />} />
      <Route path="/resume-update/:id" element={<ResumeUpdate />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/edit-role/:id" element={<EditRole />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);

function App() {
  return <div className="App">
    {routes}
  {/* <RefinedSearch /> */}
  {/* <RefinedSearchComponent /> */}
  </div>;
}

export default App;
