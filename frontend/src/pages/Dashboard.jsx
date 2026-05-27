import { Link } from "react-router-dom";

export default function Dashboard() {

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-950 to-slate-900 p-8">

      {/* HEADER */}

      <h1 className="text-6xl font-bold text-center text-cyan-300 mb-12 drop-shadow-lg">

        DevSecOps Dashboard

      </h1>

      {/* DASHBOARD GRID */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* SONARQUBE */}

        <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700">

          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-8">

            SonarQube Summary

          </h2>

          <div className="space-y-4 text-center text-2xl">

            <p className="text-white">
              Total Issues: 100
            </p>

            <p className="text-red-400">
              Critical: 49
            </p>

            <p className="text-orange-400">
              Major: 24
            </p>

            <p className="text-yellow-300">
              Minor: 27
            </p>

            <p className="text-white">
              Code Smells: 91
            </p>

            <p className="text-white">
              Bugs: 9
            </p>

            <p className="text-white">
              Vulnerabilities: 0
            </p>

          </div>

          {/* BUTTON */}

          <div className="flex justify-center">

            <Link to="/sonarqube-details">

              <button
                className="mt-8
                bg-red-600
                hover:bg-red-700
                text-white
                px-6 py-3
                rounded-xl
                text-lg
                font-bold
                shadow-lg">

                View Detailed Findings

              </button>

            </Link>

          </div>

        </div>

        {/* SNYK */}

        <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700">

          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-8">

            Snyk Vulnerabilities

          </h2>

          <div className="space-y-4 text-center text-2xl">

            <p className="text-red-400">
              Critical: 24
            </p>

            <p className="text-orange-400">
              High: 124
            </p>

            <p className="text-yellow-300">
              Medium: 231
            </p>

            <p className="text-green-400">
              Low: 0
            </p>

            <p className="text-white">
              Total: 379
            </p>

          </div>

          {/* BUTTON */}

          <div className="flex justify-center">

            <Link to="/snyk-details">

              <button
                className="mt-8
                bg-orange-600
                hover:bg-orange-700
                text-white
                px-6 py-3
                rounded-xl
                text-lg
                font-bold
                shadow-lg">

                View Detailed Findings

              </button>

            </Link>

          </div>

        </div>

        {/* TRIVY */}

        <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700">

          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-8">

            Trivy Vulnerabilities

          </h2>

          <div className="space-y-4 text-center text-2xl">

            <p className="text-red-400">
              Critical: 0
            </p>

            <p className="text-orange-400">
              High: 6
            </p>

            <p className="text-yellow-300">
              Medium: 16
            </p>

            <p className="text-green-400">
              Low: 1
            </p>

            <p className="text-white">
              Total: 23
            </p>

          </div>

          {/* BUTTON */}

          <div className="flex justify-center">

            <Link to="/trivy-details">

              <button
                className="mt-8
                bg-yellow-600
                hover:bg-yellow-700
                text-white
                px-6 py-3
                rounded-xl
                text-lg
                font-bold
                shadow-lg">

                View Detailed Findings

              </button>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}
