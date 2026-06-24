export default function IssueCard({
  issue,
  setSelectedIssue
}) {

  return (

    <div className="bg-gray-900 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold text-white">

        {issue.title}

      </h2>

      <p className="text-red-400 mt-3">

        {issue.severity}

      </p>

      <p className="text-gray-400 mt-3">

        {issue.file}

      </p>

      <button
        onClick={() => setSelectedIssue(issue)}
        className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >

        View Detail Finding

      </button>

    </div>
  );
}
