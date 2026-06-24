import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_pipeline_result():
    response = client.get("/pipeline-result")

    assert response.status_code == 200
    assert isinstance(response.json(), dict)
