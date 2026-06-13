#!/bin/bash

HIGH=$(jq '
[
.site[].alerts[]
|
select(
.riskcode=="3"
or
.riskcode=="4"
)
]
| length
' zap-report.json)

echo "High/Critical: $HIGH"

if [ "$HIGH" -gt 0 ]; then
  echo "Gate 3.1 FAILED"
  exit 1
fi

echo "Gate 3.1 PASSED"
