export default function PersonalInfo({ formData, handleChange }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                    </label>

                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group <span className="text-red-500">*</span>
                    </label>

                    <select
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="">Select Blood Group</option>

                        <option>A+</option>
                        <option>A-</option>

                        <option>B+</option>
                        <option>B-</option>

                        <option>AB+</option>
                        <option>AB-</option>

                        <option>O+</option>
                        <option>O-</option>
                    </select>
                </div>

                {/* Occupation */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Occupation <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        placeholder="Student / Engineer / Doctor / Business..."
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

            </div>

        </div>
    );
}