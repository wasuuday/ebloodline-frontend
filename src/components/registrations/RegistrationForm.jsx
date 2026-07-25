import { useState, useEffect } from "react";
import api from "../../services/api";

import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import AddressSection from "./AddressSection";
import CameraCapture from "./CameraCapture";
import PreviewModal from "./PreviewModal";

import { Eye, Save } from "lucide-react";

const initialForm = {
    first_name: "",
    last_name: "",
    dob: "",
    blood_group: "",
    occupation: "",

    email: "",
    phone: "",

    address_line1: "",
    address_line2: "",

    zipcode: "",
    city: "",
    taluka: "",
    district: "",
    state: ""
};



export default function RegistrationForm({

    donor = null,

    editMode = false,

    onBack = null

}) {

    const [formData, setFormData] = useState(initialForm);

useEffect(() => {

    if (!donor) return;

    setFormData({

        first_name: donor.first_name || "",
        last_name: donor.last_name || "",
        dob: donor.dob || "",
        blood_group: donor.blood_group || "",
        occupation: donor.occupation || "",

        email: donor.email || "",
        phone: donor.phone || "",

        address_line1: donor.address_line1 || "",
        address_line2: donor.address_line2 || "",

        zipcode: donor.zipcode || "",
        city: donor.city || "",
        taluka: donor.taluka || "",
        district: donor.district || "",
        state: donor.state || ""

    });

}, [donor]);

    const [photo, setPhoto] = useState(null);

    const [showPreview, setShowPreview] = useState(false);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    const [loadingAddress, setLoadingAddress] = useState(false);

async function fetchAddress(pin) {

    if (!/^\d{6}$/.test(pin)) return;

    setLoadingAddress(true);

    try {

        const res = await axios.get(
            `https://api.postalpincode.in/pincode/${pin}`
        );

        if (
            res.data[0].Status !== "Success" ||
            !res.data[0].PostOffice
        ) {

            setFormData(prev => ({
                ...prev,
                city: "",
                taluka: "",
                district: "",
                state: ""
            }));

            return;
        }

        const office = res.data[0].PostOffice[0];

        setFormData(prev => ({
            ...prev,
            city: office.Name || "",
            taluka: office.Block || "",
            district: office.District || "",
            state: office.State || ""
        }));

    } catch (err) {

        console.error("PIN lookup failed", err);

    } finally {

        setLoadingAddress(false);

    }
}

function handleChange(e) {

    const { name, value } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]: value
    }));

    if (name === "zipcode") {

        if (/^\d{6}$/.test(value)) {

            fetchAddress(value);

        }

    }

}
    function validateForm() {

        if (!formData.first_name.trim())
            return "First Name is required.";

        if (!formData.dob)
            return "Date of Birth is required.";

        if (!formData.phone.trim())
            return "Phone Number is required.";

        if (!formData.blood_group)
            return "Blood Group is required.";

        if (!formData.occupation.trim())
            return "Occupation is required.";

        if (!formData.address_line1.trim())
            return "Address Line 1 is required.";

        if (!formData.zipcode.trim())
            return "PIN Code is required.";

if (!editMode && !photo)
    return "Please capture donor photograph.";

        return null;

    }

    function openPreview() {

        const error = validateForm();

        if (error) {

            alert(error);

            return;

        }

        setShowPreview(true);

    }

async function handleSave() {

    const error = validateForm();

    if (error) {
        alert(error);
        return;
    }

    try {

        setSaving(true);

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

if (photo?.file) {
    data.append("photo", photo.file);
}

if (editMode) {

    await api.put(

        `/registrations/${donor.id}`,

        data,

        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }

    );

} else {

    await api.post(

        "/registrations",

        data,

        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }

    );

}

if (editMode) {
    alert("Donor updated successfully.");

    setShowPreview(false);

    if (onBack) {
        onBack();
    }

    return;
}

setMessage("Registration Saved Successfully.");
setShowPreview(false);
setFormData(initialForm);
setPhoto(null);

setTimeout(() => {
    setMessage("");
}, 3000);

        setTimeout(() => {
            setMessage("");
        }, 3000);

    } catch (err) {

        console.error(err);
        alert("Failed to save registration.");

    } finally {

        setSaving(false);

    }
}

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <div>

<h1 className="text-3xl font-bold">

    {editMode ? "Edit Donor" : "New Donor Registration"}

</h1>

                    <p className="text-gray-500 mt-1">

                        Register a blood donor.

                    </p>

                </div>

            </div>

            {
                message && (

                    <div className="bg-green-100 border border-green-400 text-green-700 rounded-lg p-4">

                        {message}

                    </div>

                )
            }

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                <div className="xl:col-span-2 space-y-6">

                    <PersonalInfo

                        formData={formData}

                        handleChange={handleChange}

                    />

                    <ContactInfo

                        formData={formData}

                        handleChange={handleChange}

                    />

<AddressSection
    formData={formData}
    handleChange={handleChange}
    loadingAddress={loadingAddress}
/>

                </div>

                <div>

                    <CameraCapture

                        photo={photo}

                        setPhoto={setPhoto}

                    />

                </div>

            </div>

            <div className="bg-white rounded-xl border shadow-sm p-5 flex justify-end gap-4">

                <button

                    type="button"

                    onClick={openPreview}

                    className="px-8 py-3 rounded-lg bg-gray-800 hover:bg-black text-white flex items-center gap-2"

                >

                    <Eye size={18} />

                    Preview

                </button>

                <button

                    type="button"

                    onClick={handleSave}

                    disabled={saving}

                    className="px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"

                >

                    <Save size={18} />

                    {
saving
    ? "Saving..."
    : editMode
        ? "Update Donor"
        : "Quick Save"

                    }

                </button>

            </div>

            <PreviewModal                 isOpen={showPreview}

                onClose={() => setShowPreview(false)}

                onEdit={() => setShowPreview(false)}

                onSave={handleSave}

                loading={saving}

                formData={formData}

                photo={photo}

            />

        </div>

    );

}
