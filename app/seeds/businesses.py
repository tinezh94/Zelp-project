from app.models import db, Business

def seed_businesses():
    haidilao = Business(
        owner_id=1, 
        name='Haidilao Hot Pot Flushing', 
        description='Over the years, Haidilao has withstood the challenges of the market as well as customers, and has successfully forged a quality hot pot brand which has earned a reputation for itself. Haidilao combines kinds of characteristics of hot pot in many places of China. As a large-scale chain catering enterprise with operations all over the world, Haidilao adheres to integrity in business. It gives the highest priority to continuously improving the quality and safety of its food products, providing more thoughtful services to its customers while delivering healthier, safer and more nutritious food.',
        category='Chinese',
        business_hours='11:30 AM - 11:00 PM',
        website='http://www.haidilao.com',
        phone_number='917-231-8888',
        price_range='$$$',
        created_at='2019-02-23 10:23:48',
        updated_at='2020-02-23 10:23:48',
        address='138-23 39th Ave',
        city='Flushing',
        state='NY',
        zipcode='11354',
        latitude='40.76119499307807',
        longitude='-73.82777500027217'
    )
    private_kitchen = Business(
        owner_id=4, 
        name='Private Kitchen', 
        description='Private Kitchen provides authentic Northeastern and Szechuan Chinese food. It\'s been around the area for over 5 years and it is well known around the neighborhood. Some popular dishes include Mixed Mungbeen Noodles salad, Sweet and sour pork, Stewed Chicken with mushroom, and etc...',
        category='Chinese',
        business_hours='11:30 AM - 10: 30 PM',
        website='https://privatekitchentogo.com',
        phone_number='718-358-6667',
        price_range='$$',
        created_at='2017-05-23 10:23:48',
        updated_at='2020-02-23 10:23:48',
        address='3635 Main St',
        city='Flushing',
        state='NY',
        zipcode='11354',
        latitude='40.76254612249336',
        longitude='-73.83133632911303'
    )
    meetfresh = Business(
        owner_id=4, 
        name='Meet Fresh', 
        description='Meet Fresh was established in 2007 and has been offering the freshest desserts to customers ever since. Utilizing traditional Taiwanese methods and selection of the finest ingredients, we aim to bring authentic local tastes to the international stage.',
        category='Dessert',
        business_hours='12:00 PM - 8: 00 PM',
        website='http://www.meetfresh.us',
        phone_number='929-468-8682',
        price_range='$$',
        created_at='2022-03-23 10:23:48',
        updated_at='2022-04-23 10:23:48',
        address='133-36 37th Ave',
        city='Flushing',
        state='NY',
        zipcode='11354',
        latitude='40.76054630133924',
        longitude='-73.83352395955124'
    )
    youqing = Business(
        owner_id=7, 
        name='Friendship Foods BBQ', 
        description='First started as a Northeast Chinese style BBQ restaurant in New York, then quickly expanded to over 20 franchising store across the US, Friendship BBQ has successfully become a well-known brand in America. As of this year, Friendship BBQ has set its foot in many major cities such as New York, Seattle, Los Angels, Houston, Orlando etc, and there are many more to come.',
        category='Chinese',
        business_hours='1:00 PM - 3:00 AM',
        website='http://friendshipbbq.com',
        phone_number='917-563-7856',
        price_range='$$',
        created_at='2016-08-23 10:23:48',
        updated_at='2017-02-23 10:23:48',
        address='136-76 39th Ave',
        city='Flushing',
        state='NY',
        zipcode='11354',
        latitude='40.76097946731502',
        longitude='-73.8277265460581'
    )
    yubu = Business(
        owner_id=3, 
        name='YUBU', 
        description='Hole in the wall takeout restaurant in East Village NYC. Offering rice filled tofu pocket with your choice of topping. Small place but packed with various Korean flavors. Stop by or order for delivery through your favorite app.',
        category='Korean',
        business_hours='11:00 AM - 8: 00 PM',
        website='http://www.yubu.nyc',
        phone_number='646-891-0116',
        price_range='$',
        created_at='2022-03-23 10:23:48',
        updated_at='2022-02-23 10:23:48',
        address='86 E 7th St',
        city='New York',
        state='NY',
        zipcode='10003',
        latitude='40.72719829106508',
        longitude='-73.98616945955216'
    )
    zen = Business(
        owner_id=4, 
        name='Zen Ramen & Sushi', 
        description='Zen will make you go gaga over our Japanese fusion lunch deals. From 11:30 AM to 4:00 PM, you can choose two rolls for $9, or three rolls for $11, served with miso soup or a classic garden salad. If you\'re feeling extra hungry, upgrade to our lunch bento box option, which includes a kitchen entree such as Salmon Teriyaki, etc, served with Edamame, shrimp shumai, miso soup, Or a salad, and rice. You will definitely come hungry and leave extra satisfied. Plz check our website for more detail Plus check out our 4pm-8pm Mix Drink & Sushi happy hours, you will be surprised. Thank you for your support',
        category='Japanese',
        business_hours='11:30 AM - 10:00 PM',
        website='http://www.zenramensushi.com',
        phone_number='646-870-7509',
        price_range='$$',
        created_at='2015-10-23 10:23:48',
        updated_at='2022-02-23 10:23:48',
        address='150 W 36th street',
        city='New York',
        state='NY',
        zipcode='10018',
        latitude='40.75191800306945',
        longitude='-73.98902994605841'
    )
    keens = Business(
        owner_id=5, 
        name='Keens Steakhouse', 
        description='Keens Steakhouse owns the largest collection of churchwarden pipes in the world. The tradition of checking one\'s pipe at the inn had its origins in 17th century Merrie Old England where travelers kept their clay at their favorite inn - the thin stemmed pipe being too fragile to be carried in purse or saddlebag. Pipe smoking was known since Elizabethan times to be beneficial for dissipating "evil homourse of the brain." Keens\'s pipe tradition began in the early 20th century.',
        category='Steak House',
        business_hours='12:00 PM - 8: 00 PM',
        website='http://www.keens.com',
        phone_number='212-947-3636',
        price_range='$$$$',
        created_at='2013-03-03 10:23:48',
        updated_at='2015-02-23 10:23:48',
        address='72 W 36th St',
        city='New York',
        state='NY',
        zipcode='10018',
        latitude='40.7509811437043',
        longitude='-73.9865040172858'
    )
    bangkok = Business(
        owner_id=3, 
        name='When in Bangkok', 
        description='Vastly popular Thai street food is the one thing that one must try when visiting Bangkok. Taking its name, “When in Bangkok” means that we will transport you to experience local Thai cuisine as if you were in Bangkok. The inspiration behind the establishment was nothing more than the intent to bring authentic Thai fare to the street of New York. When in Bangkok is for those who seek a skillful cooking and extraordinary dining experience with a tropical bungalow décor which will provide you a relaxed atmosphere during your visits. With an experienced team from Malii Thai Kitchen and Malii Gramercy in Manhattan, we strive to provide you with an enjoyable dining experience.',
        category='Thai',
        business_hours='11:30 AM - 10:00 PM',
        website='http://www.wib-nyc.com',
        phone_number='929-362-2000',
        price_range='$$',
        created_at='2022-03-23 10:23:48',
        updated_at='2022-04-23 10:23:48',
        address='161-16 Northern Blvd',
        city='Flushing',
        state='NY',
        zipcode='11358',
        latitude='40.762368478794585',
        longitude='-73.80417447119466'
    )
    obao = Business(
        owner_id=5, 
        name='OBAO', 
        description='Foods sold in the local street markets in South East Asia has not only become respected cuisines in the global culinary arena, but can be credited for bridging the gap between people who would normally have no commonalities. The young and old as well as the rich and poor all come together to share in these favorites found in all corners of the cities. These comfort foods transcend all social barriers and bridge the gap between all people through the love of food.',
        category='Vietnamese',
        business_hours='11:30 AM - 11:00 PM',
        website='http://www.obaony.com',
        phone_number='212-245-8880',
        price_range='$$',
        created_at='2015-10-12 10:23:48',
        updated_at='2022-02-23 10:23:48',
        address='647 9th Ave',
        city='New York',
        state='NY',
        zipcode='10036',
        latitude='40.757759371105216',
        longitude='-73.96852264793343'
    )
    marthas = Business(
        owner_id=5, 
        name='Martha\'s Country Bakery', 
        description='Martha\'s Bakery was founded with the goal of providing our customers with classic American baked goods in a warm, friendly atmosphere. By baking all our products on-site, we fill our stores with the delicious smells of fresh cakes and pies to bring back that delightful, warm feeling every time of the year. Each day, we bake everything from scratch using the finest ingredients.',
        category='Dessert',
        business_hours='7:00 AM - 12:00 AM',
        website='http://www.marthascountrybaker…',
        phone_number='718-225-5200',
        price_range='$$',
        created_at='2015-10-12 10:23:48',
        updated_at='2020-02-23 10:23:48',
        address='41-06 Bell Blvd ',
        city='Bayside',
        state='NY',
        zipcode='11361',
        latitude='40.76360806821171',
        longitude='-73.77109984605812'
    )
    friedman = Business(
        owner_id=3, 
        name='Friedman\'s', 
        description='Friedman\'s specializes in regional American food with most of the proteins, dairy, produce, and baked goods sourced from New York State purveyors. 95% of the menu can be made entirely gluten-free and we go to great lengths to ensure there is no cross contamination by having separate fryers, knives, cutting boards, prep area, grill space, etc.',
        category='Coffee/Breakfast/Brunch	',
        business_hours='8:30 AM - 9:00 PM',
        website='http://www.friedmansrestaurant…',
        phone_number='212-971-9400',
        price_range='$$',
        created_at='2015-10-12 10:23:48',
        updated_at='2022-02-23 10:23:48',
        address='132 W 31st St',
        city='New York',
        state='NY',
        zipcode='10001',
        latitude='40.75138807959353',
        longitude='-73.99157230954783'
    )
    afternoon = Business(
        owner_id=5, 
        name='Afternoon - Flushing', 
        description='Meet Fresh was established in 2007 and has been offering the freshest desserts to customers ever since. Utilizing traditional Taiwanese methods and selection of the finest ingredients, we aim to bring authentic local tastes to the international stage.',
        category='Dessert',
        business_hours='7:00 AM - 9:00 PM',
        website='https://afternoonplace.com',
        phone_number='914-881-3707',
        price_range='$',
        created_at='2021-02-12 10:23:48',
        updated_at='2022-02-23 10:23:48',
        address='136-95 Roosevelt Ave',
        city='Flushing',
        state='NY',
        zipcode='11354',
        latitude='40.76071460913646',
        longitude='-73.82679990187985'
    )
    

    db.session.add(haidilao)
    db.session.add(private_kitchen)
    db.session.add(meetfresh)
    db.session.add(youqing)
    db.session.add(yubu)
    db.session.add(zen)
    db.session.add(keens)
    db.session.add(bangkok)
    db.session.add(obao)
    db.session.add(marthas)
    db.session.add(friedman)
    db.session.add(afternoon)
    db.session.commit()

def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
