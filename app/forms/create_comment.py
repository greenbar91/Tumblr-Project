from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
