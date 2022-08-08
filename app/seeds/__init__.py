from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .businesses import seed_businesses, undo_businesses
from .reviews import seed_reviews, undo_reviews
from .bizphotos import seed_bizphotos, undo_bizphotos

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_businesses()
    seed_reviews()
    seed_bizphotos()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_businesses()
    undo_reviews()
    undo_bizphotos()
    # Add other undo functions here
