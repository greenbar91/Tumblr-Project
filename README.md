# Rumblr

Post your next adventure on [Rumblr](https://tumblr-project.onrender.com/)!

![](https://i.imgur.com/BgmyTZ8.png)
by Jacob Dietz, Asazay Luvaiku and ThiPhucThinh Huynh

Welcome to Rumblr, your new go-to spot for sharing your thoughts, photos, and quirky cat gifs! Dive into a world where creativity meets community, and every post is a chance to shine.

# Overview
Rumblr is a Tumblr clone that highlights the very best of social media and staying connected with your friends, community and the world. It's designed to capture the essence of Tumblr's core features, allowing users to create, share, and interact with posts and comments, like/unline posts, and  follow other users. Think of it as a playground for user-generated content and social interaction, all wrapped up in a sleek, responsive web app.

With Rumblr, users can:

* Create and share Posts: Write text posts and share photos (coming soon).
  ![](https://i.imgur.com/BrBPHNJ.png)
* Follow other Users: Stay updated with posts from the users you follow.
   ![](https://i.imgur.com/FydLezf.png)
* Like and Comment: Engage with posts by liking them or adding comments.
   ![](https://i.imgur.com/wfxkHcR.png)
* Built using Python and Javascript, this app showcases a solid backend to handle user data, authentication/validation, and route management, along with a dynamic frontend for an intuitive user experience.


# Index

- [API Documentation](https://github.com/greenbar91/Tumblr-Project/wiki/API-Routes)
- [Database Schema](https://github.com/greenbar91/Tumblr-Project/wiki/Database-Schema)
- [Frontend Routes and Components](https://github.com/greenbar91/Tumblr-Project/wiki/Frontend-Routes)
- [MVP Feature List](https://github.com/greenbar91/Tumblr-Project/wiki/MVP-Feature-List)
- [User Stories](https://github.com/greenbar91/Tumblr-Project/wiki/User-Stories)
- [Redux state](https://github.com/greenbar91/Tumblr-Project/wiki/Redux-State)

# Installation
1. Clone the repository
* `git clone https://github.com/greenbar91/Tumblr-Project.git`
  * `cd tumblr-clone`

2. Install dependencies in main directory and in /react-vite
  * `pipenv install -r requirements.txt`
  * `cd /react-vite` && `npm install`

3. Set up environment variables
* Create a .env and .flaskenv file in the root directory and add your configuration details:
   * .flaskenv `FLASK_APP=app
FLASK_DEBUG=true
FLASK_RUN_PORT=8000
`
   * .env `DATABASE_URL=sqlite:///dev.db`

5. Run database migrations
* Use flask to run the migrations and set up your database/seeds in the home directory.

   * `flask run db migrate` && `flask run db upgrade` &&  `flask run seed all`

5. Run the development server
* Using two terminal windows.
  * `flask run` in root directory and `npm run dev` in /react-vite
 

# Technologies Used

- JavaScript
- React/Redux
- CSS
- Python
- Flask/SQLAlchemy


# TBD (Discussion of two features that show off the team's technical abilities)

# TBD (Discussion of both challenges faced and the way the team solved them)

# TO-DO list/features
* Implement images into posts
* Implement search by users posts
* Implement tags and tags search
* Cleaner styling
