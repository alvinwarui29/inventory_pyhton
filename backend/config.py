from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
class Config:
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'inventory_python'
    MYSQL_CURSORCLASS = 'DictCursor'

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db = MySQL(app)


if __name__ == '__main__':
    app.run(debug=True)
