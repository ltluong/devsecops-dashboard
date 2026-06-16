#!/bin/bash

set +e

PASS=0
FAIL=0

mkdir -p logs

declare -a RESULTS

pass_gate() {
    echo ""
    echo "[PASS] $1"
    RESULTS+=("$1 : PASS")
    PASS=$((PASS+1))
}

fail_gate() {
    echo ""
    echo "[FAIL] $1"
    RESULTS+=("$1 : FAIL")
    FAIL=$((FAIL+1))
}

start_timer() {
    TIMER_START=$(date +%s)
}

stop_timer() {
    TIMER_END=$(date +%s)
    echo "[TIME] $((TIMER_END-TIMER_START)) seconds"
}

##################################################
# GATE 1.1
##################################################

echo ""
echo "=================================================="
echo "GATE 1.1 - CODE QUALITY (SONARQUBE)"
echo "=================================================="

start_timer

echo "[STEP] Checking SonarQube..."

curl -s http://localhost:9000/api/system/status > logs/gate11-sonarqube.log

cat logs/gate11-sonarqube.log

STATUS=$?

stop_timer

if [ $STATUS -eq 0 ]; then
    pass_gate "Gate 1.1"
else
    fail_gate "Gate 1.1"
fi

##################################################
# GATE 1.2
##################################################

echo ""
echo "=================================================="
echo "GATE 1.2 - SAST SECURITY (SEMGREP)"
echo "=================================================="

start_timer

echo "[STEP] Running Semgrep..."

semgrep scan fail-demo --error > logs/gate12-semgrep.log 2>&1

STATUS=$?

cat logs/gate12-semgrep.log

stop_timer

if [ $STATUS -eq 0 ]; then
    pass_gate "Gate 1.2"
else
    fail_gate "Gate 1.2"
fi

##################################################
# GATE 1.3
##################################################

echo ""
echo "=================================================="
echo "GATE 1.3 - SCA DEPENDENCY SECURITY"
echo "=================================================="

start_timer

echo "[STEP] Running Trivy FS..."

trivy fs fail-demo \
--severity HIGH,CRITICAL \
--exit-code 1 \
> logs/gate13-trivyfs.log 2>&1

STATUS=$?

cat logs/gate13-trivyfs.log

stop_timer

if [ $STATUS -eq 0 ]; then
    pass_gate "Gate 1.3"
else
    fail_gate "Gate 1.3"
fi

##################################################
# GATE 1.4
##################################################

echo ""
echo "=================================================="
echo "GATE 1.4 - UNIT TEST COVERAGE"
echo "Coverage >= 80%"
echo "=================================================="

start_timer

cd fail-demo || exit 1

pytest \
-v \
--cov=. \
--cov-report=term \
--cov-fail-under=80 \
> ../logs/gate14-pytest.log 2>&1

STATUS=$?

cd ..

cat logs/gate14-pytest.log

stop_timer

if [ $STATUS -eq 0 ]; then
    pass_gate "Gate 1.4"
else
    fail_gate "Gate 1.4"
fi

##################################################
# GATE 2.1
##################################################

echo ""
echo "=================================================="
echo "GATE 2.1 - CONTAINER SECURITY"
echo "=================================================="

start_timer

echo "[STEP] Docker Build..."

docker build -t fail-demo ./fail-demo \
> logs/gate21-build.log 2>&1

cat logs/gate21-build.log

echo ""
echo "[STEP] Trivy Image Scan..."

trivy image fail-demo \
--severity HIGH,CRITICAL \
--exit-code 1 \
> logs/gate21-trivyimage.log 2>&1

STATUS=$?

cat logs/gate21-trivyimage.log

stop_timer

if [ $STATUS -eq 0 ]; then
    pass_gate "Gate 2.1"
else
    fail_gate "Gate 2.1"
fi

##################################################
# GATE 2.2
##################################################

echo ""
echo "=================================================="
echo "GATE 2.2 - CONFIGURATION SECURITY"
echo "=================================================="

start_timer

echo "[STEP] Trivy Config..."

trivy config fail-demo \
> logs/gate22-config.log 2>&1

STATUS=$?

cat logs/gate22-config.log

stop_timer

if [ $STATUS -eq 0 ]; then
    pass_gate "Gate 2.2"
else
    fail_gate "Gate 2.2"
fi

##################################################
# GATE 3.1
##################################################

echo ""
echo "=================================================="
echo "GATE 3.1 - DAST SECURITY"
echo "=================================================="

start_timer

docker rm -f fail-demo-app >/dev/null 2>&1

echo "[STEP] Starting App..."

docker run -d \
-p 5000:5000 \
--name fail-demo-app \
fail-demo

sleep 15

echo "[STEP] Running OWASP ZAP..."

docker run --rm \
--network host \
ghcr.io/zaproxy/zaproxy:stable \
zap-baseline.py \
-t http://localhost:5000 \
> logs/gate31-zap.log 2>&1

STATUS=$?

cat logs/gate31-zap.log

stop_timer

if [ $STATUS -eq 0 ]; then
    pass_gate "Gate 3.1"
else
    fail_gate "Gate 3.1"
fi

##################################################
# GATE 3.2
##################################################

echo ""
echo "=================================================="
echo "GATE 3.2 - RELEASE DECISION"
echo "=================================================="

if [ "$FAIL" -eq 0 ]; then
    DECISION="GO"
else
    DECISION="NO-GO"
fi

RESULTS+=("Gate 3.2 : $DECISION")

##################################################
# SUMMARY
##################################################

echo ""
echo "=================================================="
echo "DEVSECOPS SUMMARY"
echo "=================================================="

for RESULT in "${RESULTS[@]}"
do
    echo "$RESULT"
done

echo ""
echo "PASS : $PASS"
echo "FAIL : $FAIL"

echo ""
echo "FINAL DECISION : $DECISION"

echo ""
echo "LOGS:"
echo "$(pwd)/logs"

docker rm -f fail-demo-app >/dev/null 2>&1

exit 0
