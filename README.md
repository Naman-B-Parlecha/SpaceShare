# SpaceShare

SpaceShare is a MERN stack project designed for renting real estate properties. It provides a seamless platform for buyers and renters to connect, explore properties, and communicate effectively. The project integrates Socket.IO for real-time chat functionality and includes features for listing and saving properties.

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Features

- View various properties available for rent or purchase.
- Filter properties based on location, price, and other criteria.
- Save favorite properties for quick access later.
- Integrated **Socket.IO** for instant messaging between renters and buyers.
- Ensure seamless interaction with notifications and updates.
- Intuitive and responsive design for a better user experience.
- User authentication with JWT for secure access.

## File Structure

```
SpaceShare/
├── client/         # Frontend React application
│   ├── public/     # Static assets
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Page-level components
│   │   ├── utils/      # Utility functions
│   │   └── App.tsx     # Main application file
│   └── package.json
│
├── server/         # Backend Express application
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   └── server.js     # Entry point for the server
│
├── socket/         # Socket.IO server setup
│   └── index.js     # WebSocket configuration
│
└── README.md       # Project documentation
```

## Technology Stack

- **Frontend**: React, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO

## Installation
### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Naman-B-Parlecha/SpaceShare.git
   ```

2. Navigate to the project directory:

   ```bash
   cd SpaceShare
   ```

3. Install dependencies for both client and server:

   ```bash
   cd client
   npm install

   cd ../server
   npm install

   cd ../socket
   npm install
   ```

4. Set up environment variables:
   - Create a .env file in the `server/` directory.
   - Add the following variables:
     
     ```env
     DATABASE_URL=<your-mongodb-connection-string>
     JWT_SECRET_KEY=<your-jwt-secret>
     CLIENT_URL=<localhost-port>
     ```

   - Create a .env file in the `client/` directory.
   - Add the following variables:
     
     ```env
     VITE_SERVER_URL=<server-port>
     ```


5. Start the application:

   - Run the server:
     ```bash
     cd server
     npm start
     ```
   - Run the client:
     ```bash
     cd client
     npm start
     ```
   - Start the WebSocket server:
     ```bash
     cd socket
     node index.js
     ```

6. Open the application in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Naman-B-Parlecha/SpaceShare.git
   ```
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push your branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Submit a pull request.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

