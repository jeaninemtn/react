import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";



function App() {
  return (
    <div className="flex flex-col size-full p-4 space-y-4">
      <Navbar />
      <div className="content flex justify-center items-center grow">
        <Outlet />
      </div>
    </div>
  )
};

export default App;