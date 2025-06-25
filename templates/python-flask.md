# Flask Best Practices

## Project Structure

### Directory Organization
```
project_root/
├── app/
│   ├── __init__.py
│   ├── models.py
│   ├── views.py
│   ├── forms.py
│   ├── utils.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py
│   ├── templates/
│   └── static/
├── tests/
│   ├── conftest.py
│   └── test_*.py
├── migrations/
├── config.py
├── requirements.txt
└── run.py
```

## Application Factory Pattern

### Creating the App
```python
# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

def create_app(config_name='development'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    
    # Register blueprints
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')
    
    return app
```

## Blueprints

### Blueprint Structure
```python
# app/main/__init__.py
from flask import Blueprint

main = Blueprint('main', __name__)

from . import views, errors
```

### Blueprint Routes
```python
# app/main/views.py
from flask import render_template, request
from . import main

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/user/<username>')
def user_profile(username):
    user = User.query.filter_by(username=username).first_or_404()
    return render_template('user.html', user=user)
```

## Configuration Management

### Config Classes
```python
# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard-to-guess'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///dev.db'
    
class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
```

## Database Models

### SQLAlchemy Models
```python
# app/models.py
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(120), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
```

## Form Handling

### Flask-WTF Forms
```python
# app/forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Log In')
```

## Error Handling

### Custom Error Handlers
```python
# app/errors.py
from flask import render_template
from . import db

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500
```

## API Development

### RESTful Routes
```python
# app/api/routes.py
from flask import jsonify, request
from . import api
from ..models import User

@api.route('/users')
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@api.route('/users/<int:id>')
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())
```

## Security Best Practices

### Authentication
```python
from flask_login import login_required, current_user

@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html', user=current_user)
```

### CSRF Protection
```python
# Automatically enabled with Flask-WTF
# In templates: {{ form.hidden_tag() }}
```

### Input Validation
```python
from flask import abort

@app.route('/api/data', methods=['POST'])
def create_data():
    data = request.get_json()
    if not data or 'name' not in data:
        abort(400, 'Missing required fields')
    # Process validated data
```

## Testing

### Pytest Configuration
```python
# tests/conftest.py
import pytest
from app import create_app, db

@pytest.fixture
def app():
    app = create_app('testing')
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()
```

### Test Example
```python
# tests/test_routes.py
def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Welcome' in response.data
```

## Performance Optimization

### Caching
```python
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/expensive')
@cache.cached(timeout=300)
def expensive_operation():
    # Expensive computation
    return result
```

## Best Practices Summary

### Do's
- ✅ Use application factory pattern
- ✅ Organize with blueprints
- ✅ Store config in environment variables
- ✅ Use Flask-WTF for forms
- ✅ Implement proper error handling
- ✅ Write comprehensive tests

### Don'ts
- ❌ Don't use global variables for state
- ❌ Avoid hardcoding configuration
- ❌ Don't store sensitive data in sessions
- ❌ Avoid tight coupling between components
- ❌ Don't ignore CSRF protection