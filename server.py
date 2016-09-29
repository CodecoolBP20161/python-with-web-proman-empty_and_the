from flask import *


app = Flask(__name__)
app.config.update(dict(SECRET_KEY='development key'))


@app.route('/')
def root():
    return render_template('home.html')


@app.route('/cards/<board_id>')
def cards(board_id):
    return render_template('cards.html')

app.run(debug=True)
