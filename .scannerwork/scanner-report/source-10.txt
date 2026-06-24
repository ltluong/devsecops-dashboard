const issues = [

  // =========================
  // SONARQUBE
  // =========================

  {
    id: 1,
    tool: "SonarQube",
    title: "SQL Injection",
    severity: "Critical",
    file: "src/controllers/user.js",

    description:
      "Unsanitized SQL query may allow attackers to execute arbitrary SQL commands.",

    recommendation:
      "Use parameterized queries or ORM prepared statements.",

    code: `
const query =
"SELECT * FROM users WHERE id = " + userInput;
`
  },

  {
    id: 2,
    tool: "SonarQube",
    title: "Hardcoded Credentials",
    severity: "Major",
    file: "src/config/db.js",

    description:
      "Database password is hardcoded inside source code.",

    recommendation:
      "Store secrets in environment variables or secret manager.",

    code: `
const password = "admin123";
`
  },

  {
    id: 3,
    tool: "SonarQube",
    title: "Cross-Site Scripting (XSS)",
    severity: "Critical",
    file: "src/pages/Profile.jsx",

    description:
      "User input rendered without sanitization may lead to XSS attacks.",

    recommendation:
      "Sanitize HTML output before rendering.",

    code: `
<div dangerouslySetInnerHTML={{__html:userInput}} />
`
  },

  // =========================
  // SNYK
  // =========================

  {
    id: 4,
    tool: "Snyk",
    title: "lodash Prototype Pollution",
    severity: "High",
    file: "package.json",

    description:
      "Vulnerable lodash version detected with Prototype Pollution CVE.",

    recommendation:
      "Upgrade lodash to latest secure version.",

    code: `
"lodash": "4.17.15"
`
  },

  {
    id: 5,
    tool: "Snyk",
    title: "axios SSRF Vulnerability",
    severity: "Critical",
    file: "package.json",

    description:
      "Axios vulnerable to Server-Side Request Forgery.",

    recommendation:
      "Update axios dependency immediately.",

    code: `
"axios": "0.21.0"
`
  },

  {
    id: 6,
    tool: "Snyk",
    title: "Express Denial of Service",
    severity: "Medium",
    file: "package.json",

    description:
      "Express package vulnerable to DoS attacks.",

    recommendation:
      "Upgrade express to patched version.",

    code: `
"express": "4.16.0"
`
  },

  // =========================
  // TRIVY
  // =========================

  {
    id: 7,
    tool: "Trivy",
    title: "OpenSSL CVE-2025-1234",
    severity: "High",
    file: "Docker Image Layer",

    description:
      "Container image contains vulnerable OpenSSL package.",

    recommendation:
      "Rebuild image using patched base image.",

    code: `
openssl 1.1.1 vulnerable version detected
`
  },

  {
    id: 8,
    tool: "Trivy",
    title: "Alpine Linux CVE",
    severity: "Medium",
    file: "alpine-base",

    description:
      "Outdated Alpine Linux package detected.",

    recommendation:
      "Update Alpine packages and rebuild container image.",

    code: `
apk add alpine=3.15
`
  },

  {
    id: 9,
    tool: "Trivy",
    title: "Node.js Runtime Vulnerability",
    severity: "High",
    file: "node:18-alpine",

    description:
      "Node.js runtime package contains known CVEs.",

    recommendation:
      "Use latest secure Node.js image.",

    code: `
FROM node:18-alpine
`
  }

];

export default issues;
