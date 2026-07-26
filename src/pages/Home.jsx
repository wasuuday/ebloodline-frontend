import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-slate-900">

            {/* Navigation */}
            <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-slate-100 bg-white/90 backdrop-blur">

                <div className="flex items-center gap-4">

                    <img
                        src={logo}
                        alt="eBloodLine Logo"
                        className="w-14 h-14 rounded-xl object-contain shadow-sm"
                    />

                    <div>
                        <h1 className="text-2xl font-bold text-red-700 tracking-tight">
                            eBloodLine
                        </h1>

                        <p className="text-xs text-slate-500">
                            Blood Camp Registration Portal
                        </p>
                    </div>

                </div>


                <Link
                    to="/login"
                    className="hidden sm:block px-7 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg shadow-red-200 hover:bg-red-700 transition"
                >
                    Login
                </Link>

            </header>



            {/* Hero Section */}
            <section className="relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-white -z-10" />


                <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">


                    {/* Left Content */}
                    <div>


                        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">

                            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>

                            Saving Lives Through Technology

                        </div>



                        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">

                            Connecting

                            <span className="text-red-600">
                                {" "}Donors
                            </span>

                            ,

                            <br />

                            Saving

                            <span className="text-red-600">
                                {" "}Lives
                            </span>

                        </h2>



                        <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-xl">

                            To digitally connect blood donors and recipients
                            in real-time, making blood donation easy, fast,
                            and accessible. Through compassion, technology,
                            and community, we ensure that help reaches those
                            who need it most — when every second counts.

                        </p>



                        <div className="mt-10 flex flex-col sm:flex-row gap-4">


                            <Link
                                to="/login"
                                className="px-10 py-4 bg-red-600 text-white rounded-xl font-semibold text-center shadow-xl shadow-red-200 hover:bg-red-700 transition"
                            >
                                Access Portal
                            </Link>


                            <button
                                className="px-10 py-4 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                                Learn More
                            </button>


                        </div>


                    </div>




                    {/* Right Medical Card */}
                    <div className="relative">


                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10">


                            <div className="flex items-center justify-center">

                                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">

                                    <span className="text-5xl">
                                        🩸
                                    </span>

                                </div>

                            </div>



                            <h3 className="mt-8 text-center text-2xl font-bold">
                                Every Drop Matters
                            </h3>



                            <p className="mt-4 text-center text-slate-600 leading-relaxed">

                                A smarter connection between donors,
                                healthcare providers, and people in need.

                            </p>



                            <div className="mt-8 grid grid-cols-2 gap-4">


                                <div className="bg-red-50 rounded-xl p-5 text-center">

                                    <p className="text-3xl font-bold text-red-600">
                                        Fast
                                    </p>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Response
                                    </p>

                                </div>



                                <div className="bg-slate-50 rounded-xl p-5 text-center">

                                    <p className="text-3xl font-bold text-slate-800">
                                        Real
                                    </p>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Connections
                                    </p>

                                </div>


                            </div>


                        </div>


                    </div>


                </div>

            </section>





            {/* Mission Vision Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">


                <div className="grid md:grid-cols-2 gap-8">


                    {/* Mission */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition">


                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-6">

                            <span className="text-2xl">
                                🎯
                            </span>

                        </div>


                        <h3 className="text-2xl font-bold mb-4">
                            Our Mission
                        </h3>


                        <p className="text-slate-600 leading-relaxed">

                            To digitally connect blood donors and recipients
                            in real-time, making blood donation easy, fast,
                            and accessible. Through compassion, technology,
                            and community, we ensure that help reaches those
                            who need it most.

                        </p>


                    </div>





                    {/* Vision */}
                    <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg">


                        <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center mb-6">

                            <span className="text-2xl">
                                🌎
                            </span>

                        </div>



                        <h3 className="text-2xl font-bold mb-4">
                            Our Vision
                        </h3>


                        <p className="text-slate-300 leading-relaxed">

                            Connecting lives through blood.
                            <br />
                            Saving lives through unity.

                        </p>


                    </div>


                </div>


            </section>





            {/* Footer */}
            <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-500">

                <p>
                    © {new Date().getFullYear()} eBloodLine
                </p>

                <p className="mt-2">
                    Connecting donors. Saving lives.
                </p>

            </footer>


        </div>
    );
}
