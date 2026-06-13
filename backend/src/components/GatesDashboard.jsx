import { useEffect, useState } from "react";

export default function GatesDashboard() {

  const [result, setResult] =
    useState(null);

  useEffect(() => {

    fetch(
      "http://127.0.0.1:8000/pipeline-result"
    )
      .then((res) => res.json())
      .then((data) => setResult(data));

  }, []);

  if (!result)
    return <p>Loading...</p>;

  const gates = [

    {
      id: "1.1",
      name: "SonarQube",
      status: result.sonarqube
    },

    {
      id: "1.2",
      name: "Semgrep",
      status: result.semgrep
    },

    {
      id: "1.3",
      name: "Trivy FS",
      status: result.trivy_fs
    },

    {
      id: "1.4",
      name: "Coverage",
      status: result.coverage
    },

    {
      id: "2.1",
      name: "Trivy Image",
      status: result.trivy_image
    },

    {
      id: "2.2",
      name: "Checkov",
      status: result.checkov
    },

    {
      id: "3.1",
      name: "OWASP ZAP",
      status: result.zap
    },

    {
      id: "3.2",
      name: "Release Gate",
      status:
        result.release_decision
    }

  ];

  const getColor = (status) => {

    if (
      status === "PASS" ||
      status === "GO"
    )
      return "text-green-400";

    return "text-red-400";
  };

  return (

    <div
      className="
      bg-[#071633]
      mt-10
      p-6
      rounded-2xl
      shadow-xl">

      <h2
        className="
        text-cyan-300
        text-3xl
        font-bold
        mb-8
        text-center">

        Security Quality Gates

      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-5">

        {gates.map((gate) => (

          <div
            key={gate.id}
            className="
            bg-[#10203d]
            rounded-xl
            p-5
            shadow-lg">

            <h3
              className="
              text-cyan-300
              font-bold">

              Gate {gate.id}

            </h3>

            <p className="mt-2">
              {gate.name}
            </p>

            <div
              className={`
              mt-5
              text-2xl
              font-bold
              ${getColor(
                gate.status
              )}
            `}>

              {gate.status}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
