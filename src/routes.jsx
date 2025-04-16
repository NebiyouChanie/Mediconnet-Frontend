import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

// System Admin pages
import AddAdmin from "./pages/admin/AddAdmin";
import AddHospital from "./pages/admin/AddHospital";
import AdminManagement from "./pages/admin/AdminManagement";
import HospitalDetail from "./pages/admin/HospitalDetail";
import HospitalManagement from "./pages/admin/HospitalManagement";
import AdminDashboard from "./pages/admin/Dashboard";

// Hospital Admin pages
import HospitalAdminDashboard from "./pages/hospitalAdmin/Dashboard";
import AddNewStaff from "./pages/hospitalAdmin/AddNewStaff";
import EditViewStaff from "./pages/hospitalAdmin/EditViewStaff";
import PatientRecord from "./pages/hospitalAdmin/PatientRecord";
import RecordAuditLogs from "./pages/hospitalAdmin/RecordAuditLogs";
import StaffManagement from "./pages/hospitalAdmin/StaffManagement";
import ViewRecords from "./pages/hospitalAdmin/ViewRecords";

// Receptionist pages
import ReceptionistDashboard from "./pages/receptionist/Dashboard";
import ReceptionistReviews from "./pages/receptionist/Review";

const AppRoutes = ({ userRole }) => {
  return (
    <Routes>
      {/* Admin Routes */}
      {userRole === "Admin" && (
        <>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/hospital-management" element={<HospitalManagement />} />
          <Route path="/admin/hospital-management/add-hospital" element={<AddHospital />} />
          <Route path="/admin/hospital-detail" element={<HospitalDetail />} />
          <Route path="/admin/admin-management/add-admin" element={<AddAdmin />} />
          <Route path="/admin/admin-management" element={<AdminManagement />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        </>
      )}
      
      {/* Hospital Admin Routes */}
      {userRole === "HospitalAdministrator" && (
        <>
          <Route path="/hospital-admin/dashboard" element={<HospitalAdminDashboard />} />
          <Route path="/hospital-admin/add-staff" element={<AddNewStaff />} />
          <Route path="/hospital-admin/edit-staff" element={<EditViewStaff />} />
          <Route path="/hospital-admin/patient-records" element={<PatientRecord />} />
          <Route path="/hospital-admin/audit-logs" element={<RecordAuditLogs />} />
          <Route path="/hospital-admin/staff-management" element={<StaffManagement />} />
          <Route path="/hospital-admin/view-records" element={<ViewRecords />} />
          <Route path="/hospital-admin" element={<Navigate to="/admin/dashboard" />} />
        </>
      )}

      {/* Receptionist Routes */}
      {userRole === "Receptionist" && (
        <>
          <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
          <Route path="/receptionist/review" element={<ReceptionistReviews />} />
          <Route path="/receptionist" element={<Navigate to="/receptionist/dashboard" />} />
        </>
      )}

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
