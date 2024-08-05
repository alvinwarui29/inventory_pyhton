from config import app,db
from flask import jsonify, request

@app.route("/items", methods=['GET'])
def get_items():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM items")
    rows= cur.fetchall()
    cur.close()
    return jsonify(rows)

@app.route("/create/items",methods=['POST'])
def create_item():
    item = request.get_json()
    name = item.get("name")
    description = item.get("description")
    image_path =item.get("imagePath")
    quantity=item.get('quantity')
    cost_price=item.get('costPrice')
    selling_price=item.get('sellingPrice')
    supplier=item.get('supplier')
    created_by=item.get('createBy')
    cur =db.connection.cursor()
    cur.execute
    ('INSERT INTO items(name,description,image_path,quantity,cost_price,selling_price,supplier,created_by) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,)',
     name,description,image_path,quantity,cost_price,selling_price,supplier,created_by
     )
    if cur.rowcount == 1:
        db.connection.commit() 
        message = 'User added successfully!'
        status_code = 201
    else:
        message = 'Failed to add user.'
        status_code = 500  
        
    cur.close()
        
    return jsonify({'message': message}), status_code