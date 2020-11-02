from flask import Flask, render_template, url_for, send_from_directory, request
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)

@app.route('/')
def home():
    query_string = request.query_string
    if query_string is not None:
        print(query_string)
        if query_string == b'frame':
            print('hi')
            return render_template('static_page.html')
        else:
            return render_template('home.html')
    else:
        return render_template('home.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/assets/<path:path>')
def send_talavera(path):
    return send_from_directory('assets', path)

@app.route('/assets/<path:path>')
def send_images(path):
    return send_from_directory('assets', path)

if __name__ == '__main__':
    app.run(debug=False)