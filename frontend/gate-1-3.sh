#!/bin/bash

HIGH=$(jq '
[
.Results[]?.Vulnerabilities[]?
| select(
    .Severity=="HIGH"
    or
    .Severity=="CRITICAL"
)
]
| length
' trivy-results.json)

echo "High/Critical CVEs: $HIGH"

if [ "$HIGH" -gt 0 ]; then
    echo "GATE 1.3 FAILED"
    exit 1
fi

echo "GATE 1.3 PASSED"
