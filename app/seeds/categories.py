from app.models import db, Category

def seed_categories():
    american = Category(category_name='American')
    chinese = Category(category_name='Chinese')
    brunch = Category(category_name='Coffee/Breakfast/Brunch')
    korean = Category(category_name='Korean')
    dessert = Category(category_name='Dessert')
    japanese = Category(category_name='Japanese')
    italian = Category(category_name='Italian')
    viet = Category(category_name='Vietnamese')
    thai = Category(category_name='Thai')
    steak = Category(category_name='Steak House')

    db.session.add(american)
    db.session.add(chinese)
    db.session.add(brunch)
    db.session.add(korean)
    db.session.add(dessert)
    db.session.add(japanese)
    db.session.add(italian)
    db.session.add(viet)
    db.session.add(thai)
    db.session.add(steak)
    db.session.commit()

def undo_categories():
        db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
        db.session.commit()
