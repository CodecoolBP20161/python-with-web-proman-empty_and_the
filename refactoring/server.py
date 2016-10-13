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
    if request.method == 'POST':
        title = request.form["title"]
        body = request.form["body"]
        board = Board.create(title=title, body=body)
        return jsonify(board.get_dict_from_object())


@app.route('/api/boards/<board_id>', methods=['GET', 'DELETE'])
def board(board_id):
    if request.method == 'GET':
        try:
            board = Board.select().where(Board.id == board_id).get()
            board_dict = board.get_dict_from_object()
        except:
            board_dict = {}
        finally:
            return jsonify(board_dict)
    if request.method == 'DELETE':
        card = Card.delete().where(Card.board_id == board_id).execute()
        board = Board.delete().where(Board.id == board_id).execute()


@app.route('/api/boards/<board_id>/cards', methods=['GET', 'POST'])
def all_cards(board_id):
    if request.method == 'GET':
        cards = Card.get_dict_from_table(board_id)
        return jsonify(cards)
    if request.method == 'POST':
        title = request.form["title"]
        body = request.form["body"]
        card = Card.create(title=title, body=body, board_id=board_id)
        return jsonify(card.get_dict_from_object())


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
