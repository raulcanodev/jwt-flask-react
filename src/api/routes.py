"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API from others domains diferent to the flask server
CORS(api)


###################### Raul ###########################

# Create a route to authenticate your users and return JWT Token
# The create_access_token() function is used to actually generate the JWT
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()

    # if user is None:
    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

    # access_token = create_access_token(identity=email)
    # return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_email = get_jwt_identity()
    
    user = User.query.filter_by(email=current_email).first()

    if user is not None:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"msg":"Bad email or password"}), 401


@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print(email, password)

    #Verificar si el email y la contraseña estan presentes en el post
    if not email or not password:
        return jsonify({'message':'Email and password are required'}), 400
    
    # Verificar si el email ya esta en uso
    if User.query.filter_by(email=email).first():
        print('El email ya existe')
        return jsonify({'message':'Email already exist'}), 400

    # Crear un nuevo usuario en la base de datos
    new_user = User(email=email, password=password, is_active=True)

    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 200

@api.route('/verify_token')
@jwt_required
def verify():
    current_email = get_jwt_identity()

    user = User.query.filter_by(email=current_email).first()

    if user is None:
        return jsonify({"error":"No existe este user"}), 401
    
    return jsonify({"user" : user.serialize()}), 200

######################################################


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "This message came from the backend, well done 💪"
    }

    return jsonify(response_body), 200
