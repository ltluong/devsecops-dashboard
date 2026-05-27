from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "DevSecOps Dashboard API"}

@app.get("/sonarqube")
def sonarqube():

    with open("../data/sonar-report/issues.json") as f:
        data = json.load(f)

    issues = data.get("issues", [])

    summary = {
        "total": len(issues),
        "critical": len([i for i in issues if i.get("severity") == "CRITICAL"]),
        "major": len([i for i in issues if i.get("severity") == "MAJOR"]),
        "minor": len([i for i in issues if i.get("severity") == "MINOR"]),
        "bugs": len([i for i in issues if i.get("type") == "BUG"]),
        "vulnerabilities": len([i for i in issues if i.get("type") == "VULNERABILITY"]),
        "code_smells": len([i for i in issues if i.get("type") == "CODE_SMELL"]),
    }

    return summary
@app.get("/snyk")
def get_snyk():

    with open("../data/snyk-report.json") as f:
        data = json.load(f)

    critical = 0
    high = 0
    medium = 0
    low = 0

    # Nếu JSON là list
    if isinstance(data, list):

        for project in data:

            vulns = project.get("vulnerabilities", [])

            for v in vulns:

                severity = v.get("severity", "").lower()

                if severity == "critical":
                    critical += 1

                elif severity == "high":
                    high += 1

                elif severity == "medium":
                    medium += 1

                elif severity == "low":
                    low += 1

    # Nếu JSON là object
    else:

        vulns = data.get("vulnerabilities", [])

        for v in vulns:

            severity = v.get("severity", "").lower()

            if severity == "critical":
                critical += 1

            elif severity == "high":
                high += 1

            elif severity == "medium":
                medium += 1

            elif severity == "low":
                low += 1

    return {
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
        "total": critical + high + medium + low
    }

@app.get("/trivy")
def trivy():

    with open("../data/trivy-report.json") as f:
        data = json.load(f)

    results = data.get("Results", [])

    critical = 0
    high = 0
    medium = 0
    low = 0

    for result in results:

        vulns = result.get("Vulnerabilities", [])

        for v in vulns:

            severity = v.get("Severity")

            if severity == "CRITICAL":
                critical += 1

            elif severity == "HIGH":
                high += 1

            elif severity == "MEDIUM":
                medium += 1

            elif severity == "LOW":
                low += 1

    return {
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
        "total": critical + high + medium + low
    }
