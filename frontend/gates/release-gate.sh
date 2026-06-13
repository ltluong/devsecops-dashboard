#!/bin/bash

echo "================================="
echo "DEVSECOPS RELEASE GATE"
echo "================================="

SONAR=$(cat sonar.status)
SEMGREP=$(cat semgrep.status)
TRIVYFS=$(cat trivyfs.status)
COVERAGE=$(cat coverage.status)
TRIVYIMAGE=$(cat trivyimage.status)
CHECKOV=$(cat checkov.status)
ZAP=$(cat zap.status)

echo "SonarQube   : $SONAR"
echo "Semgrep     : $SEMGREP"
echo "Trivy FS    : $TRIVYFS"
echo "Coverage    : $COVERAGE"
echo "Trivy Image : $TRIVYIMAGE"
echo "Checkov     : $CHECKOV"
echo "OWASP ZAP   : $ZAP"

echo "================================="

if [ "$SONAR" != "PASS" ]; then
echo "NO-GO"
exit 1
fi

if [ "$SEMGREP" != "PASS" ]; then
echo "NO-GO"
exit 1
fi

if [ "$TRIVYFS" != "PASS" ]; then
echo "NO-GO"
exit 1
fi

if [ "$COVERAGE" != "PASS" ]; then
echo "NO-GO"
exit 1
fi

if [ "$TRIVYIMAGE" != "PASS" ]; then
echo "NO-GO"
exit 1
fi

if [ "$CHECKOV" != "PASS" ]; then
echo "NO-GO"
exit 1
fi

if [ "$ZAP" != "PASS" ]; then
echo "NO-GO"
exit 1
fi

echo "================================="
echo "FINAL DECISION: GO"
echo "================================="
exit 0
