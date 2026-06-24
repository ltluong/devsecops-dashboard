function SnykDetails() {

  return (

    <div className="min-h-screen
    bg-[#081229]
    text-white
    p-10">

      <h1 className="text-4xl
      font-bold
      text-pink-400
      mb-10">

        Snyk Detail Findings

      </h1>

      <div className="bg-[#0d1b3d]
      border border-pink-500
      p-6
      rounded-2xl
      mb-6">

        <p className="text-pink-400
        font-bold
        text-2xl">

          Prototype Pollution

        </p>

        <p className="mt-3
        text-lg">

          Vulnerable dependency detected.

        </p>

        <p className="text-slate-400
        mt-3">

          package.json

        </p>

      </div>

      <div className="bg-[#0d1b3d]
      border border-red-400
      p-6
      rounded-2xl">

        <p className="text-red-400
        font-bold
        text-2xl">

          Remote Code Execution

        </p>

        <p className="mt-3
        text-lg">

          Malicious package execution vulnerability.

        </p>

        <p className="text-slate-400
        mt-3">

          node_modules/library.js

        </p>

      </div>

    </div>
  );
}

export default SnykDetails;
