from flask import *


app = Flask(__name__)
app.config.update(dict(SECRET_KEY='development key'))


@app.route('/')
def root():
    return render_template('home.html')


@app.route('/api/', methods=['GET', 'POST'])
def handle_database():
    return


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
