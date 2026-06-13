from flask import Flask, request

app = Flask(__name__)

PASSWORD = "admin123"

@app.route("/")
def home():

    return """
    <h1>DevSecOps FAIL Demo</h1>

    <form action="/search">
        <input name="q">
        <button>Search</button>
    </form>
    """

@app.route("/search")
def search():

    q = request.args.get("q")

    eval(q)

    return f"Result: {q}"

app.run(
    host="0.0.0.0",
    port=5000
)
