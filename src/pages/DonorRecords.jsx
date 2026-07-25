import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import {
    Users,
    Calendar,
    Droplets,
    MapPin,
    Eye,
    Trash2,
    Search
} from "lucide-react";

import DonorDetailsModal from "../components/DonorDetailsModal";
import RegistrationForm from "../components/registrations/RegistrationForm";
export default function DonorRecords() {

    const [donors, setDonors] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [bloodFilter, setBloodFilter] = useState("");

    const [districtFilter, setDistrictFilter] = useState("");

    const [selectedDonor, setSelectedDonor] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingDonor, setEditingDonor] = useState(null);
const [showEditor, setShowEditor] = useState(false);

    async function fetchDonors() {

        try {

            setLoading(true);

            const res = await api.get("/registrations");

            setDonors(res.data);

        } catch (err) {

            console.error(err);

            alert("Unable to load donor records.");

        } finally {

            setLoading(false);

        }

    }

async function deleteDonor(id) {
    const confirmed = window.confirm(
        "Are you sure you want to delete this donor?"
    );

    if (!confirmed) return;

    try {
        await api.delete(`/registrations/${id}`);

        setShowModal(false);
        setSelectedDonor(null);

        fetchDonors();
    } catch (err) {
        console.error(err);
        alert("Unable to delete donor.");
    }
}


function handleEdit(donor) {
    setEditingDonor(donor);
    setShowModal(false);
    setShowEditor(true);
}


    useEffect(() => {

        fetchDonors();

    }, []);

    const filteredDonors = useMemo(() => {

        return donors.filter((donor) => {

            const text = search.toLowerCase();

            const matchesSearch =

                donor.first_name?.toLowerCase().includes(text) ||

                donor.last_name?.toLowerCase().includes(text) ||

                donor.phone?.includes(search);

            const matchesBlood =

                bloodFilter === "" ||

                donor.blood_group === bloodFilter;

            const matchesDistrict =

                districtFilter === "" ||

                donor.district === districtFilter;

            return matchesSearch && matchesBlood && matchesDistrict;

        });

    }, [donors, search, bloodFilter, districtFilter]);

    const totalDonors = donors.length;

    const todayDonors = donors.filter((d) => {

        if (!d.created_at) return false;

        return (

            new Date(d.created_at).toDateString() ===

            new Date().toDateString()

        );

    }).length;

    const bloodCount = {};

    donors.forEach((d) => {

        bloodCount[d.blood_group] =

            (bloodCount[d.blood_group] || 0) + 1;

    });

    let commonBlood = "-";

    let max = 0;

    Object.keys(bloodCount).forEach((key) => {

        if (bloodCount[key] > max) {

            commonBlood = key;

            max = bloodCount[key];

        }

    });

    const districts = [...new Set(donors.map((d) => d.district).filter(Boolean))];
if (showEditor) {
    return (
        <RegistrationForm
            donor={editingDonor}
            editMode={true}
            onBack={() => {
                setShowEditor(false);
                setEditingDonor(null);
                fetchDonors();
            }}
        />
    );
}
    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Donor Records

                </h1>

                <p className="text-gray-500">

                    View and manage donor registrations.

                </p>

            </div>

            {/* Metrics */}

            <div className="grid md:grid-cols-4 gap-5">

                <MetricCard

                    title="Total Donors"

                    value={totalDonors}

                    icon={<Users size={26} />}

                />

                <MetricCard

                    title="Today's Entries"

                    value={todayDonors}

                    icon={<Calendar size={26} />}

                />

                <MetricCard

                    title="Most Common"

                    value={commonBlood}

                    icon={<Droplets size={26} />}

                />

                <MetricCard

                    title="Districts"

                    value={districts.length}

                    icon={<MapPin size={26} />}

                />

            </div>

            {/* Filters */}

            <div className="bg-white rounded-xl border p-5 shadow-sm">

                <div className="grid lg:grid-cols-3 gap-4">

                    <div className="relative">

                        <Search

                            size={18}

                            className="absolute left-3 top-3 text-gray-400"

                        />

                        <input

                            className="w-full border rounded-lg pl-10 pr-4 py-2"

                            placeholder="Search name or phone"

                            value={search}

                            onChange={(e) =>

                                setSearch(e.target.value)

                            }

                        />

                    </div>

                    <select

                        value={bloodFilter}

                        onChange={(e) =>

                            setBloodFilter(e.target.value)

                        }

                        className="border rounded-lg px-4 py-2"

                    >

                        <option value="">All Blood Groups</option>

                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>

                    </select>

                    <select

                        value={districtFilter}

                        onChange={(e) =>

                            setDistrictFilter(e.target.value)

                        }

                        className="border rounded-lg px-4 py-2"

                    >

                        <option value="">

                            All Districts

                        </option>

                        {

                            districts.map((district) => (

                                <option key={district}>

                                    {district}

                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

            {/* Table */}

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left px-5 py-3">

                                Name

                            </th>

                            <th className="text-left px-5 py-3">

                                Phone

                            </th>

                            <th className="text-left px-5 py-3">

                                Blood

                            </th>

                            <th className="text-left px-5 py-3">

                                City

                            </th>

                            <th className="text-left px-5 py-3">

                                District

                            </th>

                            <th className="text-left px-5 py-3">

                                Date

                            </th>

                            <th className="text-center px-5 py-3">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                                (

                                    <tr>

                                        <td

                                            colSpan="7"

                                            className="text-center py-10"

                                        >

                                            Loading...

                                        </td>

                                    </tr>

                                )

                                :

                                filteredDonors.length === 0 ?

                                    (

                                        <tr>

                                            <td

                                                colSpan="7"

                                                className="text-center py-10"

                                            >

                                                No donor records found.

                                            </td>

                                        </tr>

                                    )

                                    :

                                    filteredDonors.map((donor) => (

                                        <tr

                                            key={donor.id}

                                            className="border-t hover:bg-gray-50"

                                        >

                                            <td className="px-5 py-4">

                                                {donor.first_name} {donor.last_name}

                                            </td>

                                            <td className="px-5 py-4">

                                                {donor.phone}

                                            </td>

                                            <td className="px-5 py-4">

                                                {donor.blood_group}

                                            </td>

                                            <td className="px-5 py-4">

                                                {donor.city}

                                            </td>

                                            <td className="px-5 py-4">

                                                {donor.district}

                                            </td>

                                            <td className="px-5 py-4">

                                                {

                                                    donor.created_at ?

                                                        new Date(donor.created_at).toLocaleDateString()

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td className="px-5 py-4">

                                                <div className="flex justify-center gap-3">

                                                    <button

                                                        onClick={() => {

                                                            setSelectedDonor(donor);

                                                            setShowModal(true);

                                                        }}

                                                        className="text-blue-600 hover:text-blue-800"

                                                    >

                                                        <Eye size={18} />

                                                    </button>

<button
    onClick={() => deleteDonor(donor.id)}
    className="text-red-600 hover:text-red-800"
>
    <Trash2 size={18} />
</button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                        }

                    </tbody>

                </table>

            </div>

            

        

<DonorDetailsModal
    donor={selectedDonor}
    open={showModal}
    onClose={() => setShowModal(false)}
    onDelete={(donor) => deleteDonor(donor.id)}
    onEdit={(donor) => handleEdit(donor)}
/>

           

        </div>

    );

}

function MetricCard({ title, value, icon }) {

    return (

        <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div className="text-red-600">

                    {icon}

                </div>

            </div>

        </div>

    );

}
