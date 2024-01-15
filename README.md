# ⭐ Object-Relational Mapping: E-Commerce BackEnd ⭐
    
![Contributor](https://img.shields.io/badge/Contributor-Hanbyeol(Justin)Lee-purple)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/MIT)
![ORMLibrary](https://img.shields.io/badge/ORMLibrary-Sequelize-yellow)
![DataBase](https://img.shields.io/badge/DataBase-MySql2-green)
![Security](https://img.shields.io/badge/Security-Dotenv-magenta)
![RouteApplication](https://img.shields.io/badge/RouteApplication-Express.js-red)

## Outcome

Followings are the outcomes of the challenge 13:

* A walkthrough video demonstrating the functionality of the application </br>
[Walk-Through Video: Webm file](https://drive.google.com/file/d/1DesRcjh71bOVOYdFWXmtrp2ilY5Ni-Oo/view) </br>
[Walk-Through Video: GIF file](https://github.com/justinsta624/MeetyourSVGMaker/blob/main/outcome/231210_Walk-Through-Video_Challenge10_H.LEE.gif)

* The URL of the GitHub repository, with a unique name and a README describing the project </br>
[Repository for this challenge](https://github.com/justinsta624/ORMeCOMBackend)

## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## What to expect for this challenge?

* To build the back end for an e-commerce site by modifying starter code
* To configure a working Express.js API to use Sequelize to interact with a MySQL database
* Your application should use [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect your Express.js API to a MySQL database and the [dotenv](https://www.npmjs.com/package/dotenv) package to use environment variables to store sensitive data.
* Use the `schema.sql` file in the `db` folder to create your database with MySQL shell commands. Use environment variables to store sensitive data like your MySQL username, password, and database name.
* To provide a link to a walkthrough video that demonstrates its functionality and passes all of the tests. </br>
  [Video Submission Guide](https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide)
* Your walkthrough video should also shows the application's GET routes to return all -and- single categories, products, and tags being tested in Insomnia.
* Your walkthrough video should also shows the application's POST, PUT, and DELETE routes for categories, products, and tags being tested in Insomnia.

## Associations

To execute association methods on your Sequelize models to create the following relationships between them:
* `Product` belongs to `Category`, and `Category` has many `Product` models, as a category can have multiple products but a product can only belong to one category.
* `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models. Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.
> **Hint:** Make sure you set up foreign key relationships that match the column we created in the respective models.

## Fill Out the API Routes to Perform RESTful CRUD Operations
Fill out the unfinished routes in `product-routes.js`, `tag-routes.js`, and `category-routes.js` to perform create, read, update, and delete operations using your Sequelize models.
Note that the functionality for creating the many-to-many relationship for products has already been completed for you.
> **Hint**: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what `req.body` will be for POST and PUT routes!

## Seed the Database
After creating the models/routes, run `npm run seed` to seed data to your database so that you can test your routes.
</br>

## Sync Sequelize to the Database on Server Start
Create the code needed in `server.js` to sync the Sequelize models to the MySQL database on server start.
</br>

## Review

You are required to submit the following for review:
* A walkthrough video demonstrating the functionality of the application.
* The URL of the GitHub repository, with a unique name and a README describing the project.

---

