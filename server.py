from flask import *


app = Flask(__name__)
app.config.update(dict(SECRET_KEY='development key'))


@app.route('/')
def root():
    return render_template('home.html')


@app.route('/boards/<board_id>')
def cards(board_id):
    return render_template('cards.html', board_id=board_id)

app.run(debug=True)
