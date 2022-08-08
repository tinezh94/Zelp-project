from app.models import db, Review

def seed_reviews():
    review1 = Review(
        user_id=1,
        business_id=1,
        rating=5,
        review_content='I went there this past Sunday for my daughter\'s 18th Birthday. She heard of this place and wanted to go with friends. We have never done Hot Pot before and we\'re very excited and also lost LOL Thankfully, we had our wonderful server Ada that was very informational, catering and helpful. Thank you, Ada for all your help and wonderful service. We had a great time here and she had a great as well. We Deff will be going back here again.',
        created_at='2021-02-12 10:23:48',
        updated_at='2022-02-23 10:23:48'
    )
    review2 = Review(
        user_id=1,
        business_id=2,
        rating=5,
        review_content='My friend from the Dongbei region (NE China) approved of the food. Service fast. Taste was great. Will be back. We got the cold noodles, really tasty with fresh julienned vegetables. We also got the one with meat that you wrap in tofu wrappers, which I never had before. It was good! Next time I want to come back with a bigger group to try more dishes.',
        created_at='2020-02-12 10:23:48',
        updated_at='2020-02-12 10:23:48'
    )
    review3 = Review(
        user_id=2,
        business_id=3,
        rating=5,
        review_content='Finally I found time to try it out with friends. It certainly didn\'t disappoint me. We ordered mango shaved ice and tried their jasmine green milk tea with mini Q. It\'s very Q bounce. It is so cool to eat shaved ice in the summer with besties and it is also very refreshing. The portion is very large and the fruit is very fresh. I think if I\'m eating alone, I might not able to finish it. The mango shaved ice is delicious! ',
        created_at='2022-06-12 10:23:48',
        updated_at='2022-06-12 10:23:48'
    )
    review4 = Review(
        user_id=5,
        business_id=4,
        rating=3,
        review_content='Squid legs were ok, like most other dishes very oily but no other major complaints. Tofu skin was very oily period. Wagyu beef tasted like shoe leather with chili, chili pepper , oil and cumin.',
        created_at='2022-08-05 10:23:48',
        updated_at='2022-08-05 10:23:48'
    )
    review5 = Review(
        user_id=7,
        business_id=5,
        rating=4,
        review_content='I absolutely loved the tofu pockets. This one has been on my list ever since I moved to NYC a few years ago! I finally had the chance to try it this weekend and it met  all my expectations except I thought the tuna would be raw sushi tuna but it\'s actually cooked tuna. Everything else was splendid. My favorite was the salmon.',
        created_at='2021-02-12 10:23:48',
        updated_at='2021-02-23 10:23:48'
    )
    review6 = Review(
        user_id=7,
        business_id=6,
        rating=4,
        review_content='My family and I went here for dinner on a Saturday night. It was so tasty. We ordered several ramens, drinks and appetizers. They have Happy Hour daily 4 p.m. - 8 p.m. The ramen broth was amazing!!! This was the best ramen that I have had in a long time.',
        created_at='2021-02-12 10:23:48',
        updated_at='2022-02-23 10:23:48'
    )
    review7 = Review(
        user_id=8,
        business_id=7,
        rating=3,
        review_content='I\'ve been to a few steakhouses in the city and was really excited when I chose Keen\'s for a special birthday dinner, but I was a little disappointed...',
        created_at='2022-02-12 10:23:48',
        updated_at='2022-02-23 10:23:48'
    )
    review8 = Review(
        user_id=8,
        business_id=8,
        rating=3,
        review_content='This place is aesthetically pleasing. I love the decor and the plants throughout the restaurants. It\'s a two level place an the downstairs was a bit busy. We were seated upstairs where upon being sat down I saw 3 tiny ants crawling on the table. I didn\'t want to make the scene so I kindly just waved the waitress over and pointed to the problem. As a plant mommy myself I know plants do bring some pests so I chose to overlook it. We didn\'t run into another insect for the duration of our dinner.',
        created_at='2022-06-12 10:23:48',
        updated_at='2022-06-23 10:23:48'
    )
    review9 = Review(
        user_id=7,
        business_id=9,
        rating=3,
        review_content='Food was seriously so mediocre. I was so unimpressed. Wasted my meal in NYC!!',
        created_at='2022-07-12 10:23:48',
        updated_at='2022-07-12 10:23:48'
    )
    review10 = Review(
        user_id=9,
        business_id=10,
        rating=5,
        review_content='It\'s really hard to come here with one thing in mind that you\'d like to buy because it feels like the desert options are endless. There are a bunch of these around the greater New York City area and as far as taste and service it\'s been consistent across the board.',
        created_at='2021-02-12 10:23:47',
        updated_at='2022-02-23 10:23:48'
    )
    review11 = Review(
        user_id=1,
        business_id=11,
        rating=4,
        review_content='This place was a great place to have brunch while visiting NY. We ate here every morning, so yummy with everything they served us. There\'s no reservation needed and I love that because most places don\'t take walk in. The staffs were friendly and attentive to our needs, and they are always busy as hell.',
        created_at='2022-06-12 10:23:48',
        updated_at='2022-06-23 10:23:48'
    )
    review12 = Review(
        user_id=4,
        business_id=12,
        rating=5,
        review_content='First time trying croffle, it\'s such a yummy dessert and actually way more fulfilling than I thought! Trying their mochi donut next.',
        created_at='2022-07-16 10:23:48',
        updated_at='2022-07-16 10:23:48'
    )
    review13 = Review(
        user_id=1,
        business_id=2,
        rating=5,
        review_content='Great restaurant with great selections of menu. This place is a like a Diamond in the rough. Lamb Rib is a MUST try. Surprisingly...very friendly and attentive service as well!',
        created_at='20212-02-12 10:23:45',
        updated_at='2022-02-23 10:23:48'
    )
    review14 = Review(
        user_id=4,
        business_id=12,
        rating=5,
        review_content='I really liked I went with my mom and brother we ordered the chocolate croffle and it was delicious I would definitely go again',
        created_at='2021-02-12 10:23:04',
        updated_at='2022-02-23 10:23:48'
    )
    review15 = Review(
        user_id=4,
        business_id=3,
        rating=5,
        review_content='Got the red bean shaved ice for takeout and it was just as good as I remember from the Manhattan location. Delicate crunchy shaved ice and generous amount of toppings: red bean, melon jelly, and ice cream. I recommend mixing it up in a large bowl because the syrup they use to flavor the ice tends to settle toward the bottom of the takeout bowl. Hoping to try the mango shaved ice next time!',
        created_at='2022-04-12 10:23:48',
        updated_at='2022-04-23 10:23:48'
    )
    review16 = Review(
        user_id=6,
        business_id=1,
        rating=3,
        review_content='I\'m at hai di lao again. this time with only family. We had a great time. Ate lots of food and fruits. We ordered mostly fatty beef, veggies, beef balls, shrimp, dancing noodles etc. the items were pricy but it didn\'t matter since we all had a good time and we had a very attentive waiter and great service! We love the ice cream and the unlimited fruit station. They had cherries, pineapples, cantaloupes and other sweet desserts! It\'s def worth trying!',
        created_at='2021-02-12 10:23:47',
        updated_at='2022-02-23 10:23:48'
    )
    review17 = Review(
        user_id=8,
        business_id=5,
        rating=3,
        review_content='These yubu\'s are a little disappointing as a Korean native tastebuds. This is a great way for others to try the culture. But since these are something that I grew up eating there wasn\'t anything that was special for me. Also the prices for each is on the higher end.',
        created_at='2022-02-12 10:23:42',
        updated_at='2022-02-23 10:23:48'
    )
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()