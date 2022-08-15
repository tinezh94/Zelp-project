from app.models import db, Bizphoto

def seed_bizphotos():
    haidilao_photo1 = Bizphoto(
        user_id=1,
        business_id=1,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/sSDWCFmzukeeBLHxz8ghMg/o.jpg'
    )
    haidilao_photo2 = Bizphoto(
        user_id=1,
        business_id=1,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/9BNcEF9QvwnFKp9HIrnv_A/o.jpg'
    )
    haidilao_photo3 = Bizphoto(
        user_id=1,
        business_id=1,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Cq2f6H8PfDJco2njDOkeGA/o.jpg'
    )
    haidilao_photo4 = Bizphoto(
        user_id=1,
        business_id=1,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/WiGBUxZsBHYIMiUMQTTH7Q/o.jpg'
    )
    haidilao_photo5 = Bizphoto(
        user_id=1,
        business_id=1,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/3Hs5kGBSU-MsrW4MZivvsA/o.jpg'
    )
    private_kitchen_photo1 = Bizphoto(
        user_id=4,
        business_id=2,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/j8knRCypMavaBHs_wrnCbw/o.jpg'
    )
    private_kitchen_photo2 = Bizphoto(
        user_id=4,
        business_id=2,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Bk-3wr26LQ6MLOGp2O5pyA/o.jpg'
    )
    private_kitchen_photo3 = Bizphoto(
        user_id=4,
        business_id=2,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/DEvEmyLqCq-IvVqEAjQbig/o.jpg'
    )
    private_kitchen_photo4 = Bizphoto(
        user_id=4,
        business_id=2,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/qcFmBYKo2m1-bN7OdpjBGQ/o.jpg'
    )
    private_kitchen_photo5 = Bizphoto(
        user_id=4,
        business_id=2,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/zgeGMf5Zbw6kbr_nMcwE1g/o.jpg'
    )
    meetfresh_photo1 = Bizphoto(
        user_id=4,
        business_id=3,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/1HL81uykhrulIkzCxHe4sw/o.jpg'
    )
    meetfresh_photo2 = Bizphoto(
        user_id=4,
        business_id=3,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/vhL5J-NoHOWmANLy8cUSuw/o.jpg'
    )
    meetfresh_photo3 = Bizphoto(
        user_id=4,
        business_id=3,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/oRCgxnHbJ0yZRRzLfNRHNw/o.jpg'
    )
    meetfresh_photo4 = Bizphoto(
        user_id=4,
        business_id=3,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Vss-pbaZzAVzt4-Dbkkj6A/o.jpg'
    )
    meetfresh_photo5 = Bizphoto(
        user_id=4,
        business_id=3,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/UJLCoBdkLE4IfCAiFw40aw/o.jpg'
    )
    youqing_photo1 = Bizphoto(
        user_id=7,
        business_id=4,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/qDJzcX_UETrGzBpYxO4cyQ/o.jpg'
    )
    youqing_photo2 = Bizphoto(
        user_id=7,
        business_id=4,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/VIstWmGZevoF60nXUjICCA/o.jpg'
    )
    youqing_photo3 = Bizphoto(
        user_id=7,
        business_id=4,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/idthGfyepZA7WhCd-fDK-g/o.jpg'
    )
    youqing_photo4 = Bizphoto(
        user_id=7,
        business_id=4,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/SDCggSIH5MuCqi73bxsXzw/o.jpg'
    )
    youqing_photo5 = Bizphoto(
        user_id=7,
        business_id=4,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/gr1lidi-WwnT2Lz9hxJ9rQ/o.jpg'
    )
    yubu_photo1 = Bizphoto(
        user_id=3,
        business_id=5,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/daCi1WqfzAMy2SZil2NZbg/o.jpg'
    )
    yubu_photo2 = Bizphoto(
        user_id=3,
        business_id=5,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/syfOQmVIHH4RuL1c_sKrXA/o.jpg'
    )
    yubu_photo3 = Bizphoto(
        user_id=3,
        business_id=5,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/NuYMW2hoXUZ4LsS96WM4uQ/o.jpg'
    )
    yubu_photo4 = Bizphoto(
        user_id=3,
        business_id=5,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/bllDyyIM5TSKXFn6H_1Nrg/o.jpg'
    )
    yubu_photo5 = Bizphoto(
        user_id=3,
        business_id=5,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/ozqcL666AocepI5qorMmNA/o.jpg'
    )
    zen_photo1 = Bizphoto(
        user_id=4,
        business_id=6,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/bkGHbeyTSAUUbW6S6l5x_A/o.jpg'
    )
    zen_photo2 = Bizphoto(
        user_id=4,
        business_id=6,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/s7O33xulhHGK-o41uWBthA/o.jpg'
    )
    zen_photo3 = Bizphoto(
        user_id=4,
        business_id=6,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/83VvFdB6jsIjaqdOG2lGJQ/o.jpg'
    )
    zen_photo4 = Bizphoto(
        user_id=4,
        business_id=6,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/65_L-Mk5qVPI_K773ymqQg/o.jpg'
    )
    zen_photo5 = Bizphoto(
        user_id=4,
        business_id=6,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/JryWvc0r_WXCGx6kd2wtRg/o.jpg'
    )
    keens_photo1 = Bizphoto(
        user_id=5,
        business_id=7,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/4aZmVaA2EUXrgWkA5xq-NA/o.jpg'
    )
    keens_photo2 = Bizphoto(
        user_id=5,
        business_id=7,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/N0Ud7gu1ZW5elk98IO5l2w/o.jpg'
    )
    keens_photo3 = Bizphoto(
        user_id=5,
        business_id=7,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/6-8Q6g6y_CzfO-03JkZNTA/o.jpg'
    )
    keens_photo4 = Bizphoto(
        user_id=5,
        business_id=7,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/rpVVq4hWWbEGsfYg71fGSw/o.jpg'
    )
    keens_photo5 = Bizphoto(
        user_id=5,
        business_id=7,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/btxz5WeQnNhuGn1YSw30dw/o.jpg'
    )
    bangkok_photo1 = Bizphoto(
        user_id=3,
        business_id=8,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/XaK_hH2AweWN71m80WHkBQ/o.jpg'
    )
    bangkok_photo2 = Bizphoto(
        user_id=3,
        business_id=8,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/pWwu5JHwbxuZoD5jIuFRlw/o.jpg'
    )
    bangkok_photo3 = Bizphoto(
        user_id=3,
        business_id=8,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/BASW3h_xQhpZ6Ql60PoGxg/o.jpg'
    )
    bangkok_photo4 = Bizphoto(
        user_id=3,
        business_id=8,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/90UN8rVg10Vmu4iWMVoRmQ/o.jpg'
    )
    bangkok_photo5 = Bizphoto(
        user_id=3,
        business_id=8,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/agKEM9Vu-cf7-62aEUpLJg/o.jpg'
    )
    obao_photo1 = Bizphoto(
        user_id=5,
        business_id=9,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/VXTYlCeWMmdsfQJq3CKbPA/o.jpg'
    )
    obao_photo2 = Bizphoto(
        user_id=5,
        business_id=9,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/ppX9tIS0XN3Woh3zE3XgwQ/o.jpg'
    )
    obao_photo3 = Bizphoto(
        user_id=5,
        business_id=9,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/zqo8DIUfEedePxugXdcp6g/o.jpg'
    )
    obao_photo4 = Bizphoto(
        user_id=5,
        business_id=9,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/907HnX9wGZ-pCbZ7KYKjzg/o.jpg'
    )
    obao_photo5 = Bizphoto(
        user_id=5,
        business_id=9,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/ozwC-g_Ist3zpXgsDqo_rA/o.jpg'
    )
    marthas_photo1 = Bizphoto(
        user_id=5,
        business_id=10,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/LnP7lqSZU3yjvoyVhOYhxQ/o.jpg'
    )
    marthas_photo2 = Bizphoto(
        user_id=5,
        business_id=10,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/vHDmseC6tU2DtI95DcRQww/o.jpg'
    )
    marthas_photo3 = Bizphoto(
        user_id=5,
        business_id=10,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Yk8VK4BIa80B0vwJf30ZZQ/o.jpg'
    )
    marthas_photo4 = Bizphoto(
        user_id=5,
        business_id=10,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/vkBB5BUwoQfT9jOWa0UarA/o.jpg'
    )
    marthas_photo5 = Bizphoto(
        user_id=5,
        business_id=10,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/fKKb2ebVwu2QyV23ApUZLg/o.jpg'
    )
    friedman_photo1 = Bizphoto(
        user_id=3,
        business_id=11,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/JbaqPlimXZu-Lis5oB3u9w/o.jpg'
    )
    friedman_photo2 = Bizphoto(
        user_id=3,
        business_id=11,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/oVctx3sVd5jF_vBVAjybUg/o.jpg'
    )
    friedman_photo3 = Bizphoto(
        user_id=3,
        business_id=11,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/k31uJerys5aRLoVYrEiM_g/o.jpg'
    )
    friedman_photo4 = Bizphoto(
        user_id=3,
        business_id=11,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/2gwCVHDUm4zKt5faSrLaGA/o.jpg'
    )
    friedman_photo5 = Bizphoto(
        user_id=3,
        business_id=11,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/MahufkzsG02GqKcuHosT4Q/o.jpg'
    )
    afternoon_photo1 = Bizphoto(
        user_id=5,
        business_id=12,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/rLRZkHjdImu0-xIM5CCJDw/o.jpg'
    )
    afternoon_photo2 = Bizphoto(
        user_id=5,
        business_id=12,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/B9LZYlNM4_3ROHT59DVQNQ/o.jpg'
    )
    afternoon_photo3 = Bizphoto(
        user_id=5,
        business_id=12,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/d1v_5-8jUKgbLaepdau4hQ/o.jpg'
    )
    afternoon_photo4 = Bizphoto(
        user_id=5,
        business_id=12,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/AfzfO_zAONr2Y7U_z3Tpjw/o.jpg'
    )
    afternoon_photo5 = Bizphoto(
        user_id=5,
        business_id=12,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/wwu4qflfTjTjl3FW4MWjYQ/o.jpg'
    )
    db.session.add(haidilao_photo1)
    db.session.add(haidilao_photo2)
    db.session.add(haidilao_photo3)
    db.session.add(haidilao_photo4)
    db.session.add(haidilao_photo5)
    db.session.add(private_kitchen_photo1)
    db.session.add(private_kitchen_photo2)
    db.session.add(private_kitchen_photo3)
    db.session.add(private_kitchen_photo4)
    db.session.add(private_kitchen_photo5)
    db.session.add(meetfresh_photo1)
    db.session.add(meetfresh_photo2)
    db.session.add(meetfresh_photo3)
    db.session.add(meetfresh_photo4)
    db.session.add(meetfresh_photo5)
    db.session.add(youqing_photo1)
    db.session.add(youqing_photo2)
    db.session.add(youqing_photo3)
    db.session.add(youqing_photo4)
    db.session.add(youqing_photo5)
    db.session.add(yubu_photo1)
    db.session.add(yubu_photo2)
    db.session.add(yubu_photo3)
    db.session.add(yubu_photo4)
    db.session.add(yubu_photo5)
    db.session.add(zen_photo1)
    db.session.add(zen_photo2)
    db.session.add(zen_photo3)
    db.session.add(zen_photo4)
    db.session.add(zen_photo5)
    db.session.add(keens_photo1)
    db.session.add(keens_photo2)
    db.session.add(keens_photo3)
    db.session.add(keens_photo4)
    db.session.add(keens_photo5)
    db.session.add(bangkok_photo1)
    db.session.add(bangkok_photo2)
    db.session.add(bangkok_photo3)
    db.session.add(bangkok_photo4)
    db.session.add(bangkok_photo5)
    db.session.add(obao_photo1)
    db.session.add(obao_photo2)
    db.session.add(obao_photo3)
    db.session.add(obao_photo4)
    db.session.add(obao_photo5)
    db.session.add(marthas_photo1)
    db.session.add(marthas_photo2)
    db.session.add(marthas_photo3)
    db.session.add(marthas_photo4)
    db.session.add(marthas_photo5)
    db.session.add(friedman_photo1)
    db.session.add(friedman_photo2)
    db.session.add(friedman_photo3)
    db.session.add(friedman_photo4)
    db.session.add(friedman_photo5)
    db.session.add(afternoon_photo1)
    db.session.add(afternoon_photo2)
    db.session.add(afternoon_photo3)
    db.session.add(afternoon_photo4)
    db.session.add(afternoon_photo5)
    db.session.commit()

def undo_bizphotos():
    db.session.execute('TRUNCATE business_photos RESTART IDENTITY CASCADE;')
    db.session.commit()