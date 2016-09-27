from flask import *


app = Flask(__name__)
app.config.update(dict(SECRET_KEY='development key'))


@app.route('/')
def root():
    return render_template('home.html')

app.run(debug=True)
