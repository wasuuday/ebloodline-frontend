export default function Header() {

    const name = localStorage.getItem("name");

    const role = localStorage.getItem("role");

    return (

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-semibold">

                    Welcome,

                    {" "}

                    {name}

                </h2>

                <p className="text-gray-500 capitalize">

                    {role}

                </p>

            </div>

            <div>

                <span className="text-gray-500">

                    eBloodLine v0.1

                </span>

            </div>

        </header>

    );

}