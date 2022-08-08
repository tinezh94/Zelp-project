from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Demo', email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name='Marn', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie', last_name='Bob', email='bobbie@aa.io', password='password')
    christine= User(
        first_name='christine', last_name='zhang', email='june@aa.io', password='password', profile_pic='https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/135831485/original/a7061b76605a268be7fabae8131df13d254a46a4/design-a-unique-cartoon-profile-picture-for-you.jpg')
    victoria = User(
        first_name='victoria', last_name='Lee', email='victoria@aa.io', password='password', profile_pic='https://avatoon.me/wp-content/uploads/2020/07/Cartoon-Pic-Ideas-for-DP-Profile07.png')
    david = User(
        first_name='david', last_name='Harlem', email='david@aa.io', password='password', profile_pic='https://image.shutterstock.com/image-vector/male-face-avatar-on-white-260nw-562359640.jpg')
    karina = User(
        first_name='karina', last_name='woods', email='karina@aa.io', password='password', profile_pic='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80')
    lynn = User(
        first_name='lynn', last_name='kim', email='lynn@aa.io', password='password')
    peter = User(
        first_name='peter', last_name='victor', email='peter@aa.io', password='password', profile_pic='https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg')
    


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(christine)
    db.session.add(victoria)
    db.session.add(david)
    db.session.add(karina)
    db.session.add(lynn)
    db.session.add(peter)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
