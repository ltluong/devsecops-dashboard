import { useState } from "react";

const issues = [

  {
    id: 1,
    title: "SQL Injection",
    severity: "Critical",
    file: "src/controllers/user.js",
    description:
      "Unsanitized SQL query detected inside login API.",
    vulnerableCode:
      'const query = "SELECT * FROM users WHERE id=" + userInput;',
    remediation:
      "Use parameterized queries or ORM prepared statements."
  },

  {
    id: 2,
    title: "Hardcoded Credentials",
    severity: "Major",
    file: "src/config/db.js",
    description:
      "Password detected inside source code.",
    vulnerableCode:
      'password = "admin123"',
    remediation:
      "Move secrets to environment variables."
  },

  {
    id: 3,
    title: "Cross-Site Scripting (XSS)",
    severity: "Critical",
    file: "src/pages/Profile.jsx",
    description:
      "Unsafe HTML rendering detected.",
    vulnerableCode:
      "dangerouslySetInnerHTML={{__html:userInput}}",
    remediation:
      "Sanitize user-controlled HTML content."
  }

];

export default function SonarDetails() {

  const [selectedIssue, setSelectedIssue] =
    useState(null);

  return (

    <div className="min-h-screen
    bg-gray-950
    p-10">

      <h1 className="text-5xl
      font-bold
      text-red-400
      mb-10">

        SonarQube Findings

      </h1>

      <div className="grid
      grid-cols-1
      md:grid-cols-2
      gap-6">

        {issues.map(issue => (

          <div
            key={issue.id}

            className="bg-white
            rounded-xl
            shadow-lg
            overflow-hidden">

            <div className="p-6">

              <div className="flex
              justify-between
              items-center">

                <h2 className="text-2xl
                font-bold
                text-red-500">

                  {issue.title}

                </h2>

                <span className="bg-red-500
                text-white
                px-3 py-1
                rounded-lg
                text-sm">

                  {issue.severity}

                </span>

              </div>

              <p className="mt-5
              text-black">

                {issue.description}

              </p>

              <p className="mt-4
              text-gray-600">

                📄 {issue.file}

              </p>

            </div>

            <div className="bg-gray-100
            p-4
            border-t">

              <button
                onClick={() =>
                  setSelectedIssue(issue)
                }

                className="bg-red-500
                hover:bg-red-600
                text-white
                px-5 py-2
                rounded-lg">

                View Issue Details

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {selectedIssue && (

        <div className="fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-50">

          <div className="bg-white
          w-[800px]
          rounded-3xl
          p-8">

            <h2 className="text-4xl
            font-bold
            text-red-500
            mb-6">

              {selectedIssue.title}

            </h2>

            <div className="space-y-6">

              <div>

                <p className="font-bold text-lg">

                  Severity

                </p>

                <p className="text-red-500">

                  {selectedIssue.severity}

                </p>

              </div>

              <div>

                <p className="font-bold text-lg">

                  File

                </p>

                <p>

                  {selectedIssue.file}

                </p>

              </div>

              <div>

                <p className="font-bold text-lg">

                  Description

                </p>

                <p>

                  {selectedIssue.description}

                </p>

              </div>

              <div>

                <p className="font-bold text-lg mb-3">

                  Vulnerable Code

                </p>

                <pre className="bg-black
                text-green-400
                p-4
                rounded-xl
                overflow-x-auto">

{selectedIssue.vulnerableCode}

                </pre>

              </div>

              <div>

                <p className="font-bold text-lg">

                  Recommended Fix

                </p>

                <p>

                  {selectedIssue.remediation}

                </p>

              </div>

            </div>

            <button
              onClick={() =>
                setSelectedIssue(null)
              }

              className="mt-8
              bg-red-500
              hover:bg-red-600
              text-white
              px-6 py-3
              rounded-xl">

              Close

            </button>

          </div>

        </div>

      )}

    </div>
  );
}
