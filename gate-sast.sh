#!/bin/bash

ERRORS=$(jq '[.runs[].results[] |
select(.level=="error")] | length' \
sast-report.sarif)

echo "High/Critical findings: $ERRORS"

if [ "$ERRORS" -gt 0 ]; then
    echo "GATE 1.2 FAILED"
    exit 1
fi

echo "GATE 1.2 PASSED"
