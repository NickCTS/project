from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    posts = db.relationship('Post', backref='user', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comments = db.relationship('Comment', backref='post', lazy=True)
    tags = db.relationship('Tag', secondary='post_tags', lazy='subquery',
                           backref=db.backref('posts', lazy=True))

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    post_tags = db.relationship('PostTag', back_populates='tag')

class PostTag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    user_comment = db.Column(db.String(100))
    post = db.relationship('Post', backref=db.backref('post_tags', lazy=True))
    tag = db.relationship('Tag', back_populates='post_tags')

# Routes

# Create a post
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    post = Post(title=data['title'], content=data['content'], user_id=data['user_id'])
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created', 'post': {'id': post.id, 'title': post.title}})

# Get all posts
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([{'id': post.id, 'title': post.title, 'content': post.content} for post in posts])

# Update a post
@app.route('/posts/<int:id>', methods=['PUT'])
def update_post(id):
    data = request.get_json()
    post = Post.query.get_or_404(id)
    
    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    db.session.commit()
    
    return jsonify({'message': 'Post updated', 'post': {'id': post.id, 'title': post.title}})

# Delete a post
@app.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    
    return jsonify({'message': 'Post deleted'})

# Create a user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(username=data['username'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created', 'user': {'id': user.id, 'username': user.username}})

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username} for user in users])

# Create a comment
@app.route('/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    comment = Comment(content=data['content'], post_id=data['post_id'])
    db.session.add(comment)
    db.session.commit()
    return jsonify({'message': 'Comment created', 'comment': {'id': comment.id, 'content': comment.content}})

# Get all comments for a post
@app.route('/posts/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    comments = Comment.query.filter_by(post_id=post_id).all()
    return jsonify([{'id': comment.id, 'content': comment.content} for comment in comments])

# Create a tag
@app.route('/tags', methods=['POST'])
def create_tag():
    data = request.get_json()
    tag = Tag(name=data['name'])
    db.session.add(tag)
    db.session.commit()
    return jsonify({'message': 'Tag created', 'tag': {'id': tag.id, 'name': tag.name}})

# Get all tags
@app.route('/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    return jsonify([{'id': tag.id, 'name': tag.name} for tag in tags])

# Create a comment
@app.route('/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    comment = Comment(content=data['content'], post_id=data['post_id'])
    db.session.add(comment)
    db.session.commit()
    return jsonify({'message': 'Comment created', 'comment': {'id': comment.id, 'content': comment.content}})

# Get all comments for a post
@app.route('/posts/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    comments = Comment.query.filter_by(post_id=post_id).all()
    return jsonify([{'id': comment.id, 'content': comment.content} for comment in comments])
