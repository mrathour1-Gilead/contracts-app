import Records from "./pages/Records";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { fetchUserInfo } from "./slices/authSlice";
// import LoginFinal from "./pages/Login";
import Loader from "./components/utils/Loader";
import MainLayout from "./layout/MainLayout";
import { useLocation } from "react-router-dom";

const App = () => {
  // const { userFetched, loginLoader, user } = useSelector(
  //   (state: any) => state.authSlice
  // );
  const location = useLocation();

  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlParams.entries());



  const renderChildren = () => {
    return <Records />;
  };

  // useEffect(() => {
  //   if (!params?.reset_token) {
  //     dispatch(fetchUserInfo());
  //   }
  // }, [dispatch, params?.reset_token]);

  return <MainLayout>{renderChildren()}</MainLayout>;
};

export default App;
