import {
    LayoutDashboard,
    UserPlus,
    Users,
    BarChart3,
    FileSpreadsheet,
    LogOut
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const menu = [

        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard"
        },

        {
            name: "New Registration",
            icon: UserPlus,
            path: "/dashboard/register"
        }

    ];

    if (role === "admin") {

        menu.push(

            {
                name: "Manage Users",
                icon: Users,
                path: "/dashboard/users"
            },

            {
                name: "Analytics",
                icon: BarChart3,
                path: "/dashboard/analytics"
            },

            {
                name: "Export",
                icon: FileSpreadsheet,
                path: "/dashboard/export"
            }

        );

    }

    function logout() {

        localStorage.clear();

        navigate("/login");

    }

    return (

        <aside className="w-72 bg-gray-900 text-white flex flex-col">

            <div className="p-6">

                <h1 className="text-3xl font-bold text-red-500">

                    eBloodLine

                </h1>

            </div>

            <nav className="flex-1">

                {menu.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-3 px-6 py-4 transition

                                ${isActive

                                    ? "bg-red-600"

                                    : "hover:bg-gray-800"

                                }`

                            }

                        >

                            <Icon size={20} />

                            {item.name}

                        </NavLink>

                    );

                })}

            </nav>

            <button

                onClick={logout}

                className="flex items-center gap-3 px-6 py-5 hover:bg-red-600"

            >

                <LogOut size={20} />

                Logout

            </button>

        </aside>

    );

}