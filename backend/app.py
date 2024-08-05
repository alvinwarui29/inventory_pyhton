from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db = MySQL(app)

@app.route("/items", methods=['GET'])
def get_items():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM items")
    rows = cur.fetchall()
    cur.close()
    return jsonify(rows)

@app.route("/create-item", methods=['POST'])
def create_item():
    item = request.get_json()
    name = item.get("name")
    description = item.get("description")
    image_path = item.get("imagePath")
    quantity = item.get('quantity')
    cost_price = item.get('costPrice')
    selling_price = item.get('sellingPrice')
    supplier = item.get('supplier')
    created_by = item.get('createBy')
    
    cur = db.connection.cursor()
    cur.execute(
        'INSERT INTO items(name, description, image_path, quantity, cost_price, selling_price, supplier, created_by) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
        (name, description, image_path, quantity, cost_price, selling_price, supplier, created_by)
    )
    if cur.rowcount == 1:
        db.connection.commit()
        message = 'Item added successfully!'
        status_code = 201
    else:
        message = 'Failed to add item.'
        status_code = 500
        
    cur.close()
        
    return jsonify({'message': message}), status_code
@app.route("/delete-item/<int:id>", methods=['DELETE'])
def delete_item(id):
    try:
        cur= db.connection.cursor()
        cur.execute("DELETE FROM ITEMS WHERE id=%s",(id,))
        if cur.rowcount ==1:
            db.connection.commit()
            message = 'Item deleted successfully!'
            status_code = 200
        else:
            message = 'Item not found.'
            status_code = 404
    except Exception as e:
        print(f"Error: {e}")
        message = 'Failed to delete item.'
        status_code = 500
    finally:
        cur.close()
        
    return jsonify({'message': message}), status_code
  
        
    
if __name__ == '__main__':
    app.run(debug=True)
