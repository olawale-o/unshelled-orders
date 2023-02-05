import { Outlet } from "react-router-dom";
import AccountProvider from "./provider/AccountProvider";

function App() {
  return (
    <div className="App">
      <AccountProvider>
        <Outlet />
      </AccountProvider>
    </div>
  );
}

export default App;
