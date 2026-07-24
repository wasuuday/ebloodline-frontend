export default function Dashboard() {

    const role = localStorage.getItem("role");

    return (

        <div>

            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>

            <p className="mt-2 text-gray-500">

                Welcome to eBloodLine

            </p>

            <div className="grid grid-cols-4 gap-6 mt-8">

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-gray-500">

                        Total Registrations

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        0

                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-gray-500">

                        Today's Entries

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        0

                    </p>

                </div>

                {role === "admin" && (

                    <>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Data Entrants

                            </h2>

                            <p className="text-4xl font-bold mt-3">

                                0

                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Storage Used

                            </h2>

                            <p className="text-4xl font-bold mt-3">

                                0 MB

                            </p>

                        </div>

                    </>

                )}

            </div>

        </div>

    );

}