import { X, Pencil, Trash2, Phone, Mail, Calendar, MapPin, Droplets, Briefcase } from "lucide-react";

export default function DonorDetailsModal({
    donor,
    open,
    onClose,
    onEdit,
    onDelete
}) {

    if (!open || !donor) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

                {/* Header */}

                <div className="flex justify-between items-center border-b p-6">

                    <div>

                        <h2 className="text-2xl font-bold">

                            Donor Details

                        </h2>

                        <p className="text-gray-500">

                            View complete donor information.

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="hover:bg-gray-100 rounded-full p-2"
                    >
                        <X size={22}/>
                    </button>

                </div>

                {/* Body */}

                <div className="grid lg:grid-cols-3 gap-8 p-8">

                    {/* Left */}

                    <div className="flex flex-col items-center">

                        {

                            donor.photo_url ?

                            (

                                <img

                                    src={donor.photo_url}

                                    alt="Donor"

                                    className="w-60 h-60 rounded-xl object-cover border shadow"

                                />

                            )

                            :

                            (

                                <div className="w-60 h-60 rounded-xl bg-gray-200 flex items-center justify-center">

                                    No Photo

                                </div>

                            )

                        }

                        <h3 className="text-2xl font-bold mt-5">

                            {donor.first_name} {donor.last_name}

                        </h3>

                        <p className="text-red-600 font-semibold mt-2">

                            {donor.blood_group}

                        </p>

                    </div>

                    {/* Right */}

                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">

                        <InfoCard
                            icon={<Phone size={18}/>}
                            title="Phone"
                            value={donor.phone}
                        />

                        <InfoCard
                            icon={<Mail size={18}/>}
                            title="Email"
                            value={donor.email || "-"}
                        />

                        <InfoCard
                            icon={<Calendar size={18}/>}
                            title="Date of Birth"
                            value={donor.dob}
                        />

                        <InfoCard
                            icon={<Briefcase size={18}/>}
                            title="Occupation"
                            value={donor.occupation}
                        />

                        <InfoCard
                            icon={<Droplets size={18}/>}
                            title="Blood Group"
                            value={donor.blood_group}
                        />

                        <InfoCard
                            icon={<MapPin size={18}/>}
                            title="PIN Code"
                            value={donor.zipcode}
                        />

                        <div className="md:col-span-2">

                            <div className="border rounded-xl p-5">

                                <h3 className="font-semibold mb-3">

                                    Address

                                </h3>

                                <p>

                                    {donor.address_line1}

                                </p>

                                <p>

                                    {donor.address_line2}

                                </p>

                                <p className="mt-2">

                                    {donor.city},

                                    {" "}
                                    {donor.taluka},

                                    {" "}
                                    {donor.district},

                                    {" "}
                                    {donor.state}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t p-6 flex justify-end gap-4">

                    <button

                        onClick={() => onDelete(donor)}

                        className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"

                    >

                        <Trash2 size={18}/>

                        Delete

                    </button>

                    <button

                        onClick={() => onEdit(donor)}

                        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"

                    >

                        <Pencil size={18}/>

                        Edit

                    </button>

                </div>

            </div>

        </div>

    );

}

function InfoCard({icon,title,value}){

    return(

        <div className="border rounded-xl p-5">

            <div className="flex items-center gap-2 text-red-600">

                {icon}

                <span className="font-semibold">

                    {title}

                </span>

            </div>

            <p className="mt-3 text-gray-700">

                {value || "-"}

            </p>

        </div>

    )

}
