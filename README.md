# MoW-Capstone

# Summary
Monster of the Week is a tabletop roleplaying game (RPG) where each player controls a 'hunter' searching for and fighting monsters in a universe not unlike Buffy or the X-files.  

[Hunters of the Week](https://fast-dawn-42573.herokuapp.com/ "Link")is a site where players can create and maintain their hunters. A user can create a profile for themself and from there create as many hunters as they like, adjusting their stats as they wish.  This sort of thing exists for other RPG's, but I couldn't find anything similar for Monster of the Week.

# Tech used
HTML, CSS, Javascript, jQuery, Bootstrap, Mocha, Chai, Node, Express, Mongo, Mongoose, EJS

The Database is hosted on MLab, and the site on Heroku.

# How it works

From the main page a user can either create a new user profile, or login if they're a preexisting user.

![main page](https://user-images.githubusercontent.com/32402365/37695554-7b401fd6-2c8d-11e8-99b0-41a2733c56a5.JPG)

![new-user](https://user-images.githubusercontent.com/32402365/37695580-ad68b8ce-2c8d-11e8-857d-897502945103.JPG)

Once logged in, a user is taken to their home page, where they create and update their characters

![user-page](https://user-images.githubusercontent.com/32402365/37695616-d89ccb98-2c8d-11e8-9539-c3f93063ca47.JPG)
![char-page](https://user-images.githubusercontent.com/32402365/37695536-600d04ae-2c8d-11e8-92de-87b55b429ca4.JPG)

All the basic CRUD opperations are available for both characters and users.  The site requires JWT authorization to access certain pages.  Such as users editing any of their data.


