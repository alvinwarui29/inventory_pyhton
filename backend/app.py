from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import Config
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'invetory-management-system'
jwt = JWTManager(app)

db = MySQL(app)


def get_user_by_email(email):
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email=%s ",(email,))
    user = cur.fetchone()
    cur.close()
    cur.close()
    return user

@app.route("/create-user",methods=['POST'])
def create_user():
    user = request.get_json()
    fName =user.get("firstName") 
    lName = user.get("lastName")
    email =user.get("email")
    password=user.get("password")
    
    cur = db.connection.cursor()
    cur.execute(
        "INSERT INTO users(first_name,last_name,email,password) VALUES(%s,%s,%s,%s)",
        (fName,lName,email,password)
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

@app.route("/login-user", methods=['POST'])
def login_user():
    user = request.get_json()
    email = user.get("email")
    password = user.get("password")
    
    user = get_user_by_email(email)
    if user:
        hashed_password = user["password"]
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 400
    else:
        return jsonify({"message": "Invalid email or password"}), 400
    

@app.route("/items", methods=['GET'])
def get_items():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM items")
    rows = cur.fetchall()
    cur.close()
    return jsonify(rows)

@app.route("/get-item/<int:id>", methods=['GET'])
def get_single_item(id):
    try:
        cur = db.connection.cursor()
        cur.execute("SELECT * FROM items WHERE id= %s", (id,))
        row = cur.fetchone()  
        cur.close()

        if row:
            return jsonify(row), 200
            
        else:
            return jsonify({'message': 'Item not found'}), 404

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Failed to retrieve item', 'error': str(e)}), 500


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
  
@app.route("/update-item/<int:id>",methods=['PATCH']) 
@app.route("/update-item/<int:id>", methods=['PATCH'])
def update_item(id):
    try:
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        image_path = data.get('image_path', None) 
        quantity = data.get('quantity')
        cost_price = data.get('costPrice')  
        selling_price = data.get('sellingPrice')  
        supplier = data.get('supplier')
        created_by = data.get('createdBy')

        cur = db.connection.cursor()
        cur.execute("""
            UPDATE items
            SET name = %s, description = %s, image_path = %s, quantity = %s,
                cost_price = %s, selling_price = %s, supplier = %s, created_by = %s
            WHERE id = %s
        """, (name, description, image_path, quantity, cost_price, selling_price, supplier, created_by, id))

        if cur.rowcount == 1:
            db.connection.commit()
            cur.close()
            return jsonify({'message': 'Item updated successfully!'}), 200
        else:
            cur.close()
            return jsonify({'message': 'Item not found'}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Failed to update item'}), 500
    
    
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_email = get_jwt_identity()
    user = get_user_by_email(current_user_email)  
    print("Current User:", user)
    if user:
        return jsonify({
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "email": user["email"]
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
