#!/bin/bash

echo "=========="
echo "GATE 1.1"
echo "=========="

semgrep scan fail-demo
if [ $? -ne 0 ]; then
  echo "FAIL 1.1"
  exit 1
fi

echo "=========="
echo "GATE 1.2"
echo "=========="

trivy fs fail-demo \
--severity HIGH,CRITICAL

if [ $? -ne 0 ]; then
  echo "FAIL 1.2"
  exit 1
fi

echo "=========="
echo "GATE 1.3"
echo "=========="

gitleaks detect \
--source fail-demo

if [ $? -ne 0 ]; then
  echo "FAIL 1.3"
  exit 1
fi

echo "=========="
echo "GATE 1.4"
echo "=========="

cd fail-demo

pytest \
--cov=. \
--cov-fail-under=80

if [ $? -ne 0 ]; then
  echo "FAIL 1.4"
  exit 1
fi

cd ..

echo "=========="
echo "GATE 2.1"
echo "=========="

docker build \
-t fail-demo \
./fail-demo

trivy image \
fail-demo

if [ $? -ne 0 ]; then
  echo "FAIL 2.1"
  exit 1
fi

echo "=========="
echo "GATE 2.2"
echo "=========="

trivy config fail-demo

if [ $? -ne 0 ]; then
  echo "FAIL 2.2"
  exit 1
fi

echo "=========="
echo "GATE 3.1"
echo "=========="

docker run -d \
-p 5000:5000 \
--name fail-demo-app \
fail-demo

docker run \
--network host \
ghcr.io/zaproxy/zaproxy:stable \
zap-baseline.py \
-t http://localhost:5000

if [ $? -ne 0 ]; then
  echo "FAIL 3.1"
  exit 1
fi

echo "=========="
echo "GATE 3.2"
echo "=========="

echo "GO"
