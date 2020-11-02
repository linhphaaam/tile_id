from flask import Flask, render_template, url_for, send_from_directory
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/assets/<path:path>')
def send_talavera(path):
    return send_from_directory('assets', path)

if __name__ == '__main__':
    app.run(debug=False)