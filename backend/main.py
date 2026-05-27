from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import subprocess
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RepoRequest(BaseModel):
    repo_url: str

@app.post("/scan")
def scan_repo(data: RepoRequest):

    try:

        repo_url = data.repo_url

        project_path = "/tmp/project"

        project_key = "github-project"

        # XÓA PROJECT CŨ

        if os.path.exists(project_path):
            shutil.rmtree(project_path)

        # =========================
        # CLONE GITHUB
        # =========================

        clone = subprocess.run(
            [
                "git",
                "clone",
                repo_url,
                project_path
            ],
            capture_output=True,
            text=True
        )

        print(clone.stdout)
        print(clone.stderr)

        if clone.returncode != 0:

            return {
                "error": clone.stderr
            }

        # =========================
        # SONARQUBE SCAN
        # =========================

        sonar = subprocess.run(
            [
                "sonar-scanner",

                f"-Dsonar.projectKey={project_key}",

                f"-Dsonar.sources={project_path}",

                "-Dsonar.host.url=http://localhost:9000",

                "-Dsonar.login=admin",

                "-Dsonar.password=admin"
            ],
            capture_output=True,
            text=True
        )

        print(sonar.stdout)
        print(sonar.stderr)

        # CHỜ SONARQUBE PHÂN TÍCH

        time.sleep(10)

        # =========================
        # GET SONAR METRICS
        # =========================

        metrics_url = (
            "http://localhost:9000/api/measures/component"
            f"?component={project_key}"
            "&metricKeys=bugs,vulnerabilities,"
            "code_smells,security_hotspots,"
            "duplicated_lines_density,coverage"
        )

        metrics_response = requests.get(
            metrics_url,
            auth=("admin", "admin")
        )

        metrics_data = metrics_response.json()

        print(metrics_data)

        measures = metrics_data["component"]["measures"]

        result = {}

        for item in measures:

            metric = item["metric"]

            value = item["value"]

            result[metric] = value

        # =========================
        # GET ISSUES
        # =========================

        issues_url = (
            "http://localhost:9000/api/issues/search"
            f"?componentKeys={project_key}"
        )

        issues_response = requests.get(
            issues_url,
            auth=("admin", "admin")
        )

        issues_data = issues_response.json()

        print(issues_data)

        issues = []

        critical = 0
        major = 0
        minor = 0

        for issue in issues_data.get("issues", []):

            severity = issue.get("severity")

            if severity == "CRITICAL":
                critical += 1

            elif severity == "MAJOR":
                major += 1

            else:
                minor += 1

            issues.append({

                "message":
                issue.get("message"),

                "severity":
                severity,

                "file":
                issue.get("component")
            })

        return {

            "sonarqube": {

                "bugs":
                result.get("bugs", 0),

                "vulnerabilities":
                result.get("vulnerabilities", 0),

                "code_smells":
                result.get("code_smells", 0),

                "security_hotspots":
                result.get("security_hotspots", 0),

                "coverage":
                result.get("coverage", 0),

                "duplicated_lines_density":
                result.get(
                    "duplicated_lines_density",
                    0
                ),

                "critical":
                critical,

                "major":
                major,

                "minor":
                minor,

                "issues":
                issues
            }
        }

    except Exception as e:

        return {
            "error": str(e)
        }
