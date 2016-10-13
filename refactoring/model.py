from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model


# Configure your database connection here
# database name = should be your username on your laptop
# database user = should be your username on your laptop
db = PostgresqlDatabase('dbname', user='dbuser')


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()
    body = CharField()

    def get_dict_from_object(self):
        return model_to_dict(self)

    # returns dictionary from a table
    @classmethod
    def get_dict_from_table(cls):
        board_list = []
        for element in cls.select():
            board_list.append(model_to_dict(element))
        board_dict = {"boards": board_list}
        return board_dict


class Card(BaseModel):
    title = CharField()
    body = CharField()
    board_id = ForeignKeyField(Board, related_name="parentboard")

    def get_dict_from_object(self):
        return model_to_dict(self)

    # returns dictionary from a table
    @classmethod
    def get_dict_from_table(cls, board_id):
        card_dict = {"board_id": board_id, "cards": []}
        cards_by_board = cls.select(cls.id, cls.title, cls.body).where(cls.board_id == board_id)
        for i in range(len(cards_by_board)):
            card_dict["cards"].append(model_to_dict(cards_by_board[i]))
            del card_dict["cards"][i]["board_id"]
        return card_dict
