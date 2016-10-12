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

    # returns dictionary from an object
    @classmethod
    def get_serialized_object(cls):
        board_list = []
        for element in cls.select():
            board_list.append(model_to_dict(element))
        return board_list


class Board(BaseModel):
    title = CharField()
    body = CharField()


class Card(BaseModel):
    title = CharField()
    body = CharField()
    board_id = ForeignKeyField(Board, related_name="parentboard")
