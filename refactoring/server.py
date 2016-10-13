from flask import *
from model import Board, Card


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/boards', methods=['GET', 'POST'])
def all_boards():
    if request.method == 'GET':
        boards = Board.get_dict_from_table()
        return jsonify(boards)


@app.route('/api/boards/<board_id>', methods=['GET', 'POST'])
def board(board_id):
    if request.method == 'GET':
        try:
            board = Board.select().where(Board.id == board_id).get()
            board_dict = board.get_dict_from_object()
        except:
            board_dict = {}
        finally:
            return jsonify(board_dict)


@app.route('/api/boards/<board_id>/cards', methods=['GET', 'POST'])
def all_cards(board_id):
    if request.method == 'GET':
        cards = Card.get_dict_from_table(board_id)
        return jsonify(cards)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
