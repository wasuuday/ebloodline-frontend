import { Link } from "react-router-dom";

export default function Home() {
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow-lg w-[400px] text-center">

                <h1 className="text-4xl font-bold text-red-600">
                    eBloodLine
                </h1>

                <p className="mt-4 text-gray-600">
                    Blood Camp Registration Portal
                </p>

                <Link
                    to="/login"
                    className="mt-8 block bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                    Login
                </Link>

            </div>

        </div>

    );
}