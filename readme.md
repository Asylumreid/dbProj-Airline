
## Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
Install dependencies:

bash
Copy code
npm install
Copy the environment file:

bash
Copy code
cp env.example .env


## Server Setup

2. Navigate to the server directory:

bash
Copy code
cd server
Install server dependencies:

bash
Copy code
npm install
Copy the environment file:

bash
Copy code
cp env.example .env
Adjust the SQL credentials in the .env file to match your database configuration.

Ensure MongoDB is running before starting the server.

"mongod"

Running the Application
Follow the instructions below to run the application:

# Start the client:

bash
Copy code
cd cdbProj-Airline\client>
npm start

# Start the server:

bash
Copy code
cd dbProj-Airline\server
node server start
Now, you are ready to use the application. Ensure both the client and server are running concurrently for the full functionality.