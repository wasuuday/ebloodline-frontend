export default function ContactInfo({ formData, handleChange }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        maxLength={10}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

            </div>

        </div>
    );
}