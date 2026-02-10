// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContractsPage from "./pages/ContractsPage";
import CreateContractPage from "./pages/CreateContractPage";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<ContractsPage />} />
        <Route path="/contracts/new" element={<CreateContractPage />} />
      </Routes>
    </MainLayout>
    </BrowserRouter>
  );
}