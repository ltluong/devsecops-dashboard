function TrivyDetails() {

  return (

    <div className="min-h-screen
    bg-[#081229]
    text-white
    p-10">

      <h1 className="text-4xl
      font-bold
      text-green-400
      mb-10">

        Trivy Detail Findings

      </h1>

      <div className="bg-[#0d1b3d]
      border border-green-400
      p-6
      rounded-2xl
      mb-6">

        <p className="text-green-400
        font-bold
        text-2xl">

          OpenSSL CVE

        </p>

        <p className="mt-3
        text-lg">

          Vulnerable OpenSSL package detected.

        </p>

        <p className="text-slate-400
        mt-3">

          Dockerfile

        </p>

      </div>

      <div className="bg-[#0d1b3d]
      border border-yellow-300
      p-6
      rounded-2xl">

        <p className="text-yellow-300
        font-bold
        text-2xl">

          Alpine Linux CVE

        </p>

        <p className="mt-3
        text-lg">

          Container image contains vulnerable package.

        </p>

        <p className="text-slate-400
        mt-3">

          container/image

        </p>

      </div>

    </div>
  );
}

export default TrivyDetails;
