import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoute from "routes/AppRoute";
import { logout } from "store/userSlice";
import "./App.less";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(logout());
    };
  });

  return (
    <div className="App">
      <AppRoute />
    </div>
  );
}

export default App;
