import { Link } from "react-router-dom";

export default function Dashboard() {

  return (

    <div className="min-h-screen
    bg-gray-950
    p-8">

      <h1 className="text-4xl
      font-bold
      text-white
      mb-8">

        DevSecOps Dashboard

      </h1>

      {/* Summary */}

      <div className="grid
      grid-cols-1
      md:grid-cols-3
      gap-6">

        {/* SonarQube */}

        <div className="bg-gray-900
        p-6
        rounded-2xl">

          <h2 className="text-red-400
          text-2xl
          font-bold">

            SonarQube

          </h2>

          <p className="text-white mt-4">
            2 Critical Issues
          </p>

          <Link
            to="/sonarqube-details">

            <button
              className="mt-5
              bg-red-600
              hover:bg-red-700
              px-4 py-2
              rounded-lg
              text-white">

              View Details

            </button>

          </Link>

        </div>

        {/* Snyk */}

        <div className="bg-gray-900
        p-6
        rounded-2xl">

          <h2 className="text-orange-400
          text-2xl
          font-bold">

            Snyk

          </h2>

          <p className="text-white mt-4">
            3 Vulnerabilities
          </p>

          <Link
            to="/snyk-details">

            <button
              className="mt-5
              bg-orange-600
              hover:bg-orange-700
              px-4 py-2
              rounded-lg
              text-white">

              View Details

            </button>

          </Link>

        </div>

        {/* Trivy */}

        <div className="bg-gray-900
        p-6
        rounded-2xl">

          <h2 className="text-yellow-400
          text-2xl
          font-bold">

            Trivy

          </h2>

          <p className="text-white mt-4">
            4 Container CVEs
          </p>

          <Link
            to="/trivy-details">

            <button
              className="mt-5
              bg-yellow-600
              hover:bg-yellow-700
              px-4 py-2
              rounded-lg
              text-white">

              View Details

            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}
