import { useState } from "react";

import issues from "../data/issues";

import IssueCard from "../components/IssueCard";

import IssueModal from "../components/IssueModal";

export default function Findings() {

  const [selectedIssue, setSelectedIssue] =
    useState(null);

  return (

    <div className="min-h-screen bg-gray-950 p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-12">

        Security Findings

      </h1>

      {/* SONAR */}

      <h2 className="text-3xl text-red-400 mb-6">

        SonarQube Findings

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

        {issues
          .filter(issue => issue.tool === "SonarQube")
          .map(issue => (

            <IssueCard
              key={issue.id}
              issue={issue}
              setSelectedIssue={setSelectedIssue}
            />

        ))}

      </div>

      {/* SNYK */}

      <h2 className="text-3xl text-orange-400 mb-6">

        Snyk Findings

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

        {issues
          .filter(issue => issue.tool === "Snyk")
          .map(issue => (

            <IssueCard
              key={issue.id}
              issue={issue}
              setSelectedIssue={setSelectedIssue}
            />

        ))}

      </div>

      {/* TRIVY */}

      <h2 className="text-3xl text-yellow-300 mb-6">

        Trivy Findings

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {issues
          .filter(issue => issue.tool === "Trivy")
          .map(issue => (

            <IssueCard
              key={issue.id}
              issue={issue}
              setSelectedIssue={setSelectedIssue}
            />

        ))}

      </div>

      <IssueModal
        issue={selectedIssue}
        onClose={() =>
          setSelectedIssue(null)
        }
      />

    </div>
  );
}
