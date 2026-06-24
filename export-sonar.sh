#!/bin/bash

SONAR_URL="http://localhost:9000"
PROJECT="frontend"
TOKEN="your_token"

curl -s -u $TOKEN: \
"$SONAR_URL/api/measures/component?component=$PROJECT&metricKeys=bugs,vulnerabilities,code_smells,coverage" \
> sonar-report.json

echo "Export complete"
