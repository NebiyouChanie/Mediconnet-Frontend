import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, UserRound, ShoppingCartIcon, BookOpenText, 
  NotebookPen, BarChart4, StarIcon, ChevronDown, ChevronUp, LocateIcon, LogOut,Hospital, UserCog
} from "lucide-react";
import { useUser } from "@/context/UserContext";
 
// Define menu items for different roles
const roleBasedMenuItems = {
  Admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard /> },
    { 
      name: "Hospitals", path: "/admin/hospital-management", icon: <Hospital />,
      subLinks: [
        { name: "Add Hospital", path: "/admin/hospital-management/add-hospital" },
      ]
    },
    { 
      name: "Hospital Admins", path: "/admin/admin-management", icon: <UserCog />,
      subLinks: [
        { name: "Add Admin", path: "/admin/admin-management/add-admin" },
      ]
    },
  ],
  HospitalAdministrator: [
    { name: "Dashboard", path: "/hospital-admin/dashboard", icon: <LayoutDashboard /> },
    { 
      name: "Staff", path: "/hospital-admin/staff-management", icon: <UserRound />,
      subLinks: [
        { name: "Add Staff", path: "/hospital-admin/add-staff" },
        { name: "Edit/View Staff", path: "/hospital-admin/edit-staff" },
      ]
    },
    { 
      name: "Patient Records", path: "/hospital-admin/patient-records", icon: <BookOpenText />,
      subLinks: [
        { name: "View Records", path: "/hospital-admin/view-records" },
      ]
    },
    { name: "Audit Logs", path: "/hospital-admin/audit-logs", icon: <BarChart4 /> },
  ],

  Receptionist: [
    { name: "Dashboard", path: "/receptionist/dashboard", icon: <LayoutDashboard /> },
    { name: "Reviews", path: "/receptionist/review", icon: <StarIcon /> },
  ]
};


const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  
  const handleMenuClick = (item, event) => {
    if (item.subLinks) {
      event.preventDefault();
      setOpenMenus((prev) => ({ ...prev, [item.name]: !prev[item.name] }));
    }
    navigate(item.path);
  };

   const {userRole}= useUser()
 
  // Get menu items based on user role
  const menuItems = roleBasedMenuItems[userRole] || [];

  return (
    <div className="w-72 h-screen border-r p-5 flex flex-col bg-primary">
      <div className="h-20 mb-8 flex justify-center items-center">
         <p className="text-2xl text-white font-bold font-poppins">
         MediConnet
        </p>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path} 
                onClick={(e) => handleMenuClick(item, e)} 
                className={({ isActive }) =>
                  `py-2 px-2  flex gap-[16px] text-base text-white items-center w-full transition-all ease-in-out duration-200 ${
                    isActive
                      ? "text-primary bg-white/10"
                      : " hover:bg-white/10 v"
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.name}
                {item.subLinks && (
                  <span className="ml-auto">
                    {openMenus[item.name] ? <ChevronUp /> : <ChevronDown />}
                  </span>
                )}
              </NavLink>
              {item.subLinks && (
                <ul className={`my-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${openMenus[item.name] ? "max-h-40" : "max-h-0"}`}>
                  {item.subLinks.map((sub) => (
                    <li key={sub.name} className="ps-10">
                      <NavLink 
                        to={sub.path} 
                        className={({ isActive }) =>
                          `py-1 px-2  flex gap-[16px] text-[16px] text-white font-medium items-center w-full transition-all ease-in-out duration-100 ${
                            isActive
                              ? " bg-white/10  v  border-primary"
                              : "hover:text-white hover:bg-white/10   "
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t">
        <button
           
          className="w-full py-2 px-4 flex items-center gap-2 text-white rounded"
        >
          <LogOut size={18} />
          Logout
        </button>
        <div className="text-sm text-white mt-2 px-4">
          Logged in as: <span className="font-medium capitalize">{userRole}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;