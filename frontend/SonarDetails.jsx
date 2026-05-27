{/* SQL Injection */}

<div className="bg-slate-900
p-6
rounded-3xl
border border-red-500">

  <div className="flex
  justify-between
  items-center">

    <h3 className="text-3xl
    font-bold
    text-red-400">

      SQL Injection

    </h3>

    <span className="bg-red-600
    text-white
    px-4 py-2
    rounded-xl
    font-bold">

      Critical

    </span>

  </div>

  <div className="mt-6
  space-y-4">

    <div className="bg-slate-800
    p-4
    rounded-2xl">

      <p className="text-gray-400">
        Affected File
      </p>

      <p className="text-white
      text-lg
      mt-1">

        src/controllers/user.js

      </p>

    </div>

    <div className="bg-slate-800
    p-4
    rounded-2xl">

      <p className="text-gray-400">
        Vulnerability Description
      </p>

      <p className="text-gray-300
      mt-2">

        Unsanitized SQL queries may allow attackers
        to manipulate database commands and access
        sensitive data.

      </p>

    </div>

    <div className="bg-slate-800
    p-4
    rounded-2xl">

      <p className="text-gray-400">
        Security Risk
      </p>

      <ul className="list-disc
      list-inside
      text-gray-300
      mt-2
      space-y-1">

        <li>
          Unauthorized database access
        </li>

        <li>
          Sensitive data leakage
        </li>

        <li>
          Authentication bypass
        </li>

        <li>
          Data manipulation risk
        </li>

      </ul>

    </div>

    <div className="bg-black
    p-4
    rounded-2xl
    overflow-x-auto">

      <p className="text-red-400
      mb-3
      font-bold">

        Vulnerable Code

      </p>

      <pre className="text-green-400">

{`const query =
"SELECT * FROM users WHERE id = " + userInput;
`}

      </pre>

    </div>

    <div className="bg-slate-800
    p-4
    rounded-2xl">

      <p className="text-green-400
      font-bold
      mb-2">

        Recommended Fix

      </p>

      <p className="text-gray-300">

        Use parameterized queries or prepared statements
        to prevent SQL Injection attacks.

      </p>

    </div>

  </div>

</div>
