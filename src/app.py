"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy


# Crear la aplicación Flask
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración de la clave secreta para JWT
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')

# Inicializar la extensión de SQLAlchemy
db.init_app(app)

# Inicializar la extensión de Migrate
migrate = Migrate(app, db)

# Inicializar la extensión de JWT
jwt = JWTManager(app)

# Agregar las rutas de la API con el prefijo "api"
app.register_blueprint(api, url_prefix='/api')

@app.route('/')
def sitemap():
    return generate_sitemap(app)

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
