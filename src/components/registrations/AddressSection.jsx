export default function AddressSection({
    formData,
    handleChange,
    loadingAddress
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Address Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Address Line 1 */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1 <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="address_line1"
                        value={formData.address_line1}
                        onChange={handleChange}
                        placeholder="House No, Street, Area"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                {/* Address Line 2 */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2
                    </label>

                    <input
                        type="text"
                        name="address_line2"
                        value={formData.address_line2}
                        onChange={handleChange}
                        placeholder="Landmark (Optional)"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                {/* PIN */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        placeholder="444601"
                        maxLength={6}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 outline-none"
                    />
                </div>

                {/* Taluka */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Taluka
                    </label>

                    <input
                        type="text"
                        name="taluka"
                        value={formData.taluka}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 outline-none"
                    />
                </div>

                {/* District */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        District
                    </label>

                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 outline-none"
                    />
                </div>

                {/* State */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                    </label>

                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 outline-none"
                    />
                </div>

            </div>

        </div>
    );
}
