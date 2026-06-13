
import { useEffect, useState } from "react";

export default function GatesDashboard() {
  const [result, setResult] = useState(null);

useEffect(() => {
  fetch("http://127.0.0.1:8001/pipeline-result")
    .then((res) => res.json())
    .then((data) => setResult(data))
    .catch((err) => console.error(err));
}, []);
      if (!result) {
    return <div>Loading...</div>;
  }

  const gates = [
    { id: "1.1", name: "SonarQube", status: result.sonarqube },
    { id: "1.2", name: "Semgrep", status: result.semgrep },
    { id: "1.3", name: "Trivy FS", status: result.trivy_fs },
    { id: "1.4", name: "Coverage", status: result.coverage },
    { id: "2.1", name: "Trivy Image", status: result.trivy_image },
    { id: "2.2", name: "Checkov", status: result.checkov },
    { id: "3.1", name: "OWASP ZAP", status: result.zap },
    { id: "3.2", name: "Release Gate", status: result.release_decision },
  ];

  return (
    <div className="bg-[#071633] rounded-2xl p-6 mt-8">
      <h2 className="text-cyan-300 text-3xl font-bold text-center mb-8">
        Security Quality Gates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {gates.map((gate) => (
          <div
            key={gate.id}
            className="bg-[#10203d] rounded-xl p-4 shadow"
          >
            <h3 className="text-cyan-300 font-bold">
              Gate {gate.id}
            </h3>

            <p>{gate.name}</p>

            <p className="text-green-400 font-bold mt-2">
              {gate.status}
            </p>
          </div>
        ))}      </div>
    </div>
  );
}
