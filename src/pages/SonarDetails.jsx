import issues from "../data/issues";

export default function SonarDetails() {

  const sonarIssues =
    issues.filter(
      issue => issue.tool === "SonarQube"
    );

  return (

    <div className="min-h-screen
    bg-gray-950
    p-8">

      <h1 className="text-4xl
      text-red-400
      font-bold
      mb-8">

        SonarQube Findings

      </h1>

      {sonarIssues.map(issue => (

        <div
          key={issue.id}
          className="bg-gray-900
          p-6
          rounded-2xl
          mb-6">

          <h2 className="text-2xl
          text-white
          font-bold">

            {issue.title}

          </h2>

          <p className="text-red-400 mt-2">
            {issue.severity}
          </p>

          <p className="text-gray-300 mt-4">
            {issue.description}
          </p>

          <pre className="bg-black
          text-green-400
          p-4
          rounded-xl
          mt-4">

            {issue.code}

          </pre>

        </div>

      ))}

    </div>
  );
}
