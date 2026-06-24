export default function IssueModal({
  issue,
  onClose
}) {

  if (!issue) return null;

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-gray-900 w-[900px] rounded-2xl p-8">

        <div className="flex justify-between items-center">

          <h2 className="text-3xl font-bold text-white">

            {issue.title}

          </h2>

          <button
            onClick={onClose}
            className="text-white text-3xl"
          >

            ✕

          </button>

        </div>

        <div className="mt-5">

          <p className="text-red-400">

            {issue.severity}

          </p>

          <p className="text-gray-300 mt-4">

            {issue.description}

          </p>

          <pre className="bg-black text-green-400 p-4 rounded-xl mt-4 overflow-x-auto">

            {issue.code}

          </pre>

        </div>

      </div>

    </div>
  );
}
