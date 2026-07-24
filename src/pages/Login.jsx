import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const data = response.data;

            localStorage.setItem("token", data.access_token);

            localStorage.setItem("role", data.role);

            localStorage.setItem("name", data.name);

            localStorage.setItem("userId", data.id);

            navigate("/dashboard");

        } catch (err) {

            setError("Invalid Email or Password");

        }

        setLoading(false);

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

                <h2 className="text-3xl font-bold text-center mb-8">
                    Login
                </h2>

                <form onSubmit={handleLogin}>

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        className="w-full border p-3 rounded-lg mb-4"

                        required

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        className="w-full border p-3 rounded-lg mb-6"

                        required

                    />

                    {error && (

                        <p className="text-red-600 mb-4">
                            {error}
                        </p>

                    )}

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"

                    >

                        {loading ? "Logging In..." : "Login"}

                    </button>

                </form>

            </div>

        </div>

    );

}