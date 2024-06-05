from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

class CommentForm():
    comment = TextAreaField('comment', validators=[DataRequired()])
    