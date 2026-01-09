CRUD Web Store

Very simple web store utilizing React for the frontend and Sequelize for the backend

Technology Choices

	React + Vite - Chosen due to it's ease of use and everyone's familiarity with the framework
	Sequelize - Also chosen due to everyone's familiarity with the framework   

Features

	Simple "mocked" login for users, users can add items into their shopping carts and remove them from there.
	Administrators being able to add new products or update/remove existing ones    

Tech Stack

    Backend: Node.js, Sequelize, Socket.IO
    Frontend: React 19 + Vite, React Router 7, socket.io-client
    Tests: Jest + Supertest (server)

Prerequisites

    Node.js 18+
    A machine running Linux (Tests on windows showed it was unable to utilize the database system)

Installation:

    After cloning the repository, navigate into it using cd command on Linux. After that, navigate into both frontend and backend folders and use the commands
    npm install and npm run dev.
NB! If you downloaded this as a .zip you must extract it first

    If running these commands show a error repeat the steps above, usually that fixes the problem. Once there are no errors to see the application go to http://localhost:5173

Roles:
Reinar: Documentation, Mockup login, Project technologies selection
Heilo: Backend(Databases) Admin view
Toomas: GitHub Merging, shopping cart
