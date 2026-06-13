import { useState } from "react";

function VulnerableApp() {

  const [search, setSearch] = useState("");

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Vulnerable Test Application
      </h1>

      {/* XSS */}

      <div className="border p-5 mb-8">

        <h2 className="text-2xl font-bold mb-3">
          Reflected XSS
        </h2>

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border p-2"
          placeholder="Search"
        />

        <div
          dangerouslySetInnerHTML={{
            __html: search
          }}
        />

      </div>

      {/* Fake Login */}

      <div className="border p-5">

        <h2 className="text-2xl font-bold mb-3">
          Login Form
        </h2>

        <form>

          <input
            type="text"
            placeholder="Username"
            className="border p-2 mr-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 mr-2"
          />

          <button
            className="bg-red-500 text-white px-4 py-2"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default VulnerableApp;
