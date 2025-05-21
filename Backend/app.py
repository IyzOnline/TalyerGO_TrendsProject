from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import os
from werkzeug.utils import secure_filename
import json 

REACT_PUBLIC_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'talyergo', 'public'))
UPLOAD_FOLDER = os.path.join(REACT_PUBLIC_FOLDER, 'repairShops')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'jfif'}

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'talyergo'
}

def get_db_connection():
    conn = mysql.connector.connect(**DB_CONFIG)
    return conn

@app.route('/insert', methods=['POST'])
def insert_data():
    image_url = None

    if 'image' in request.files:
        image_url = save_uploaded_image(request.files['image'])

    if request.is_json:
        data = request.json
    else:
        data = request.form.to_dict()

    table = data.get('table')
    columns = data.get('columns')  
    values = data.get('values')   

    if not table or not columns or not values:
        return jsonify({'error': 'Missing table, columns, or values'}), 400

    if isinstance(columns, str):
        try:
            columns = json.loads(columns)
        except Exception:
            return jsonify({'error': 'Invalid columns JSON'}), 400

    if isinstance(values, str):
        try:
            values = json.loads(values)
        except Exception:
            return jsonify({'error': 'Invalid values JSON'}), 400

    if image_url:
        columns.append('image')
        values.append(image_url)

    placeholders = ', '.join(['%s'] * len(values))
    query = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({placeholders})"

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        conn.commit()
        return jsonify({'message': 'Data inserted successfully', 'image_url': image_url}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            conn.close()


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_uploaded_image(image_file):
    """
    Save uploaded image file to React public repairShops folder.
    Returns relative URL (e.g. /repairShops/filename.png) if saved successfully, else None.
    """
    if image_file and image_file.filename != '' and allowed_file(image_file.filename):
        filename = secure_filename(image_file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        image_file.save(filepath)
        return f'/repairShops/{filename}'
    return None

@app.route('/update', methods=['POST'])
def update_data():
    image_url = None
    if 'image' in request.files:
        image_url = save_uploaded_image(request.files['image'])

    if request.is_json:
        data = request.json
    else:
        data = request.form.to_dict()

    table = data.get('table')
    updates = data.get('updates') 
    condition = data.get('condition')
    print(updates)
    if not table or not updates or not condition:
        return jsonify({'error': 'Missing table, updates, or condition'}), 400

    if isinstance(updates, str):
        try:
            updates = json.loads(updates)
        except Exception:
            return jsonify({'error': 'Invalid updates JSON'}), 400


    if image_url:
        updates['image'] = image_url


    set_clause = ', '.join([f"{col} = %s" for col in updates.keys()])
    query = f"UPDATE {table} SET {set_clause} WHERE {condition}"
    values = list(updates.values())

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        conn.commit()
        return jsonify({'message': 'Data updated successfully', 'image_url': image_url}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            conn.close()


@app.route('/delete', methods=['DELETE'])
def delete_data():
    data = request.json
    table = data.get('table')
    condition = data.get('condition')

    if not table or not condition:
        return jsonify({'error': 'Missing table or condition'}), 400

    query = f"DELETE FROM {table} WHERE {condition}"
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        return jsonify({'message': 'Data deleted successfully'})
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            conn.close()

@app.route('/select', methods=['POST'])
def select_data():
    data = request.json
    table = data.get('table')
    columns = data.get('columns', '*')
    condition = data.get('condition', '')

    if not table:
        return jsonify({'error': 'Missing table'}), 400

    query = f"SELECT {', '.join(columns) if isinstance(columns, list) else columns} FROM {table}"
    if condition:
        query += f" WHERE {condition}"

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query)
        rows = cursor.fetchall()
        return jsonify(rows)
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            conn.close()

@app.route('/custom', methods=['POST'])
def custom_query():
    data = request.json
    query = data.get('query')

    if not query:
        return jsonify({'error': 'Missing query'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query)
        if query.strip().upper().startswith("SELECT"):
            rows = cursor.fetchall()
            return jsonify(rows)
        else:
            conn.commit()
            return jsonify({'message': 'Query executed successfully'})
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            conn.close()

@app.route('/add_review', methods=['POST'])
def add_review():
    data = request.json
    shop_id = data.get('shop_id')
    user_id = data.get('user_id')
    rating = data.get('rating')
    comment = data.get('comment')

    if not shop_id or not rating or not user_id: 
        return jsonify({'error': 'Missing shop_id, user_id, or rating'}), 400

    conn = None 
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = "INSERT INTO reviews (shop_id, user_id, rating, comment) VALUES (%s, %s, %s, %s)"
        cursor.execute(insert_query, (shop_id, user_id, rating, comment))


        cursor.execute("SELECT rating FROM shops WHERE id = %s", (shop_id,))
        current_rating_json = cursor.fetchone()[0]
        ratings_dict = json.loads(current_rating_json)

        ratings_dict[str(rating)] = ratings_dict.get(str(rating), 0) + 1


        update_shop_query = "UPDATE shops SET rating = %s WHERE id = %s"
        cursor.execute(update_shop_query, (json.dumps(ratings_dict), shop_id))

        conn.commit() 
        return jsonify({'message': 'Review added and shop rating updated successfully'}), 201
    except Error as e:
        if conn:
            conn.rollback() 
        return jsonify({'error': str(e)}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()

@app.route('/get_reviews/<int:shop_id>', methods=['GET'])
def get_reviews(shop_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT
                r.id,
                r.user_id,
                u.username,  -- Fetch username from the users table
                r.rating,
                r.comment,
                r.created_at
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.shop_id = %s
            ORDER BY r.created_at DESC
        """
        cursor.execute(query, (shop_id,))
        reviews = cursor.fetchall()
        return jsonify(reviews), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()

@app.route('/delete_review', methods=['DELETE'])
def delete_review():
    data = request.json
    review_id = data.get('review_id')
    user_id = data.get('user_id') 

    if not review_id or not user_id:
        return jsonify({'error': 'Missing review_id or user_id'}), 400

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT shop_id, rating FROM reviews WHERE id = %s AND user_id = %s", (review_id, user_id))
        review_info = cursor.fetchone()

        if not review_info:
           
            return jsonify({'error': 'Review not found or you are not authorized to delete this review'}), 403 

        shop_id, old_rating = review_info

        cursor.execute("DELETE FROM reviews WHERE id = %s", (review_id,))

        cursor.execute("SELECT rating FROM shops WHERE id = %s", (shop_id,))
        current_shop_rating_json = cursor.fetchone()[0]
        shop_ratings_dict = json.loads(current_shop_rating_json)

        if str(old_rating) in shop_ratings_dict and shop_ratings_dict[str(old_rating)] > 0:
            shop_ratings_dict[str(old_rating)] -= 1

        update_shop_query = "UPDATE shops SET rating = %s WHERE id = %s"
        cursor.execute(update_shop_query, (json.dumps(shop_ratings_dict), shop_id))

        conn.commit()
        return jsonify({'message': 'Review deleted and shop rating updated successfully'}), 200
    except Error as e:
        if conn:
            conn.rollback() 
        return jsonify({'error': str(e)}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()


if __name__ == '__main__':
    app.run(debug=True)