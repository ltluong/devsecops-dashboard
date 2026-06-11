ERRORS=$(jq '[.runs[].results[] | select(.level=="error")] | length' sast-report.sarif)

echo "Critical Findings: $ERRORS"

if [ "$ERRORS" -gt 0 ]; then
    echo "GATE 1.2 FAILED"
    exit 1
else
    echo "GATE 1.2 PASSED"
fi
