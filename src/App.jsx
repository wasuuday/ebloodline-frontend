import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewRegistration from "./pages/NewRegistration";
import DonorRecords from "./pages/DonorRecords";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ExportData from "./pages/ExportData";


function App() {
    return (
<BrowserRouter>

    <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            }
        >

            <Route
                index
                element={<Dashboard />}
            />

            <Route
                path="register"
                element={<NewRegistration />}
            />
            <Route
    path="/dashboard/donorrecords"
    element={<DonorRecords />}
/>
            <Route
    path="export"
    element={<ExportData />}
/>

        </Route>

    </Routes>

</BrowserRouter>
    );
}

export default App;
