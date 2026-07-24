import { X, Save, Pencil } from "lucide-react";

export default function PreviewModal({
    isOpen,
    onClose,
    onEdit,
    onSave,
    formData,
    photo,
    loading
}) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

                {/* Header */}

                <div className="flex justify-between items-center border-b px-8 py-5">

                    <h2 className="text-2xl font-bold text-gray-800">
                        Registration Preview
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Body */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">

                    {/* LEFT */}

                    <div className="lg:col-span-2 space-y-8">

                        {/* Personal */}

                        <div>

                            <h3 className="font-semibold text-lg border-b pb-2 mb-4">
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4">

                                <Info
                                    label="First Name"
                                    value={formData.first_name}
                                />

                                <Info
                                    label="Last Name"
                                    value={formData.last_name}
                                />

                                <Info
                                    label="Date of Birth"
                                    value={formData.dob}
                                />

                                <Info
                                    label="Blood Group"
                                    value={formData.blood_group}
                                />

                                <Info
                                    label="Occupation"
                                    value={formData.occupation}
                                />

                            </div>

                        </div>

                        {/* Contact */}

                        <div>

                            <h3 className="font-semibold text-lg border-b pb-2 mb-4">
                                Contact Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4">

                                <Info
                                    label="Email"
                                    value={formData.email}
                                />

                                <Info
                                    label="Phone"
                                    value={formData.phone}
                                />

                            </div>

                        </div>

                        {/* Address */}

                        <div>

                            <h3 className="font-semibold text-lg border-b pb-2 mb-4">
                                Address
                            </h3>

                            <div className="grid grid-cols-2 gap-4">

                                <Info
                                    label="Address Line 1"
                                    value={formData.address_line1}
                                />

                                <Info
                                    label="Address Line 2"
                                    value={formData.address_line2}
                                />

                                <Info
                                    label="PIN"
                                    value={formData.zipcode}
                                />

                                <Info
                                    label="City"
                                    value={formData.city}
                                />

                                <Info
                                    label="Taluka"
                                    value={formData.taluka}
                                />

                                <Info
                                    label="District"
                                    value={formData.district}
                                />

                                <Info
                                    label="State"
                                    value={formData.state}
                                />

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div>

                        <h3 className="font-semibold text-lg border-b pb-2 mb-4">
                            Donor Photo
                        </h3>

                        {
                            photo ? (

                                <img
                                    src={photo.preview}
                                    alt="Donor"
                                    className="w-full rounded-xl border shadow"
                                />

                            ) : (

                                <div className="h-80 rounded-xl border flex items-center justify-center text-gray-400">

                                    No Photo

                                </div>

                            )
                        }

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t px-8 py-5 flex justify-end gap-4">

                    <button

                        onClick={onEdit}

                        className="flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-gray-100"

                    >

                        <Pencil size={18} />

                        Edit

                    </button>

                    <button

                        onClick={onSave}

                        disabled={loading}

                        className="flex items-center gap-2 px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"

                    >

                        <Save size={18} />

                        {

                            loading

                                ? "Saving..."

                                : "Save Registration"

                        }

                    </button>

                </div>

            </div>

        </div>
    );

}

function Info({ label, value }) {

    return (

        <div>

            <p className="text-sm text-gray-500">

                {label}

            </p>

            <p className="font-medium">

                {value || "-"}

            </p>

        </div>

    );

}