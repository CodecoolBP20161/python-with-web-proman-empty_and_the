from model import *

db.connect()

db.drop_tables([Board, Card], safe=True, cascade=True)
db.create_tables([Board, Card], safe=True)

for i in range(10):
    board = Board.create(title="board" + str(i), body="boardbody" + str(i))
    card = Card.create(title="card" + str(i), body="cardbody" + str(i), board_id=board)
