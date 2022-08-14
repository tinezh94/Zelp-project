# Zelp

Live Link: [Zelp](https://zelp-project.herokuapp.com/)

Zelp is a pixel-perfect clone of the well-known crowd-sourced reviews publishing App Yelp. The users of Zelp are capable of performing create, read, edit, and delete activities for businesses and reviews. Users are also able to upload and delete images for businesses. 

## Technologies Used
  * Python
  * SQLAlchemy 
  * Flask
  * Postgres
  * React
  * JavaScript
  * AWS
  * CSS
  * HTML

## Project Planning

  * [Database Schema](https://github.com/tinezh94/Zelp-project/wiki/Database-Schema)
  * [MVP Feature List](https://github.com/tinezh94/Zelp-project/wiki/MVP-Feature-List)
  * [User Stories](https://github.com/tinezh94/Zelp-project/wiki/User-Stories)
  * [Wireframes](https://github.com/tinezh94/Zelp-project/wiki/Wireframes)

## Functionalities

### Homepage



### Log In

<img width="1495" alt="Screen Shot 2022-08-11 at 2 14 35 PM" src="https://user-images.githubusercontent.com/99835281/184210233-d67f57ec-929c-4ecb-902b-ac05e0ffb887.png">

### Sign Up

<img width="1478" alt="Screen Shot 2022-08-11 at 2 14 56 PM" src="https://user-images.githubusercontent.com/99835281/184210286-100ed025-3100-4393-afac-06a2226c20a2.png">

### Homepage

![Screen_Recording_2022-08-11_at_2_58_37_PM_AdobeExpress](https://user-images.githubusercontent.com/99835281/184218456-a8a0c191-49db-4366-9c49-6db380cd4f90.gif)


### Business Page

![Screen_Recording_2022-08-11_at_3_00_44_PM_AdobeExpress](https://user-images.githubusercontent.com/99835281/184218847-e09a5cf0-fe75-4f3a-8e74-76a30c611b0f.gif)


### Create Business

![Screen_Recording_2022-08-11_at_3_02_11_PM_AdobeExpress](https://user-images.githubusercontent.com/99835281/184219093-a842e23e-476b-49e6-87d4-efda08570ca2.gif)

### Write Reviews

![Screen_Recording_2022-08-11_at_3_03_28_PM_AdobeExpress](https://user-images.githubusercontent.com/99835281/184219408-a2b22d65-23d3-455d-820f-833d0d138c02.gif)


### Upload Image

![Screen_Recording_2022-08-11_at_3_06_28_PM_AdobeExpress](https://user-images.githubusercontent.com/99835281/184219887-7d6389c3-c12c-40b0-baa2-b0b954fff2f9.gif)


### Profile Page

![Screen_Recording_2022-08-11_at_3_07_34_PM_AdobeExpress](https://user-images.githubusercontent.com/99835281/184220022-12b7070a-e130-40fe-a681-a0c1d5816ad4.gif)


## Future To Do List

  * Enable uploading photos while writing reviews
  * Add more seeder data

## Technical Difficulties

<img width="494" alt="Screen Shot 2022-08-11 at 2 33 26 PM" src="https://user-images.githubusercontent.com/99835281/184213775-56ef9c02-e4c8-4d9b-9b57-9e7ec747adfa.png">


One thing that I was having trouble with using AWS. I stuck on how to fetch to the backend route and adding the file to the database. I had to do some research on watch some tutorials to successfully implement AWS in this project.


### Install Instructions

1. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

2. Create a **.env** file based on the example with proper settings for your
   development environment
3. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

4. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
