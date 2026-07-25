import { useState } from "react";
import api from "../services/api";

import * as XLSX from "xlsx";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function ExportData(){

    const [loading,setLoading] = useState(false);


    async function fetchData(){

        try{

            setLoading(true);

            const res = await api.get("/registrations");

            return res.data;


        }catch(err){

            console.error(err);

            alert("Unable to fetch donor data.");

            return [];

        }
        finally{

            setLoading(false);

        }

    }



    async function exportExcel(){

        const donors = await fetchData();


        if(!donors.length)
            return;


        const worksheet = XLSX.utils.json_to_sheet(
            donors.map(d => ({

                Name:
                `${d.first_name} ${d.last_name || ""}`,

                Phone:d.phone,

                Email:d.email,

                Blood_Group:d.blood_group,

                DOB:d.dob,

                Occupation:d.occupation,

                City:d.city,

                District:d.district,

                State:d.state,

                PIN:d.zipcode,

                Registered:
                new Date(d.created_at)
                .toLocaleDateString()

            }))
        );


        const workbook =
        XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Donors"
        );


        XLSX.writeFile(
            workbook,
            "Donor_Records.xlsx"
        );

    }





    async function exportPDF(){

        const donors = await fetchData();


        if(!donors.length)
            return;


        const doc = new jsPDF();


        doc.text(
            "eBloodLine Donor Records",
            14,
            15
        );


        const rows = donors.map(d => [

            `${d.first_name} ${d.last_name || ""}`,
            d.phone,
            d.blood_group,
            d.city,
            d.district

        ]);


        autoTable(doc,{

            head:[

                [
                    "Name",
                    "Phone",
                    "Blood",
                    "City",
                    "District"
                ]

            ],

            body:rows,

            startY:25

        });


        doc.save(
            "Donor_Records.pdf"
        );

    }



return (

<div className="space-y-6">


<h1 className="text-3xl font-bold">
Export Donor Data
</h1>


<p className="text-gray-500">
Download donor records in Excel or PDF format.
</p>



<div className="bg-white border rounded-xl p-6 flex gap-4">


<button

onClick={exportExcel}

className="
px-6 py-3
bg-green-600
text-white
rounded-lg
"

>

Export Excel

</button>



<button

onClick={exportPDF}

className="
px-6 py-3
bg-red-600
text-white
rounded-lg
"

>

Export PDF

</button>


</div>


{
loading &&
<p>
Preparing export...
</p>
}


</div>

)

}
