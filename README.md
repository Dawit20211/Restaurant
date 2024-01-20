# SuFlavours
# COMP-3006-Full Stack Web Application

SufFlavours is an online ordering system specifically designed for a sushi restaurant that operates exclusively for takeaways. However, the ordering system can be adapted for any restaurant looking to establish a takeaway business. It is a Merstack project (MongoDB, Express.js, React.js, Node.js).

![Screenshot 2024-01-14 at 04 38 12](https://github.com/Dawit20211/Restaurant/assets/91669031/d74213b3-5393-4434-b45c-2dfc53921232)

### Technologies Used

### Frontend:
- ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend:
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

### Database:
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### DevOps:
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

  ## Features

- Online food ordering for customers
- Order management tools for restaurant owners
- Menu management capabilities
- Transaction handling

  # Prerequisites

Before running SufFlavours, ensure you have the following installed:

- Docker
- Docker Compose

To start SufFlavours using Docker Compose:

1. Clone the repository:

2. Navigate to the Server folder and create a .env which you will then need to fill in with the follwoing
   # MongoDB CONNECTION URI
   MONGO_URI=your-mongo-db-uri

   # STRIPE_SECRET_KEY
   STRIPE_SECRET_KEYL=your-stripe-secret-key

   # JWT_SECRET
   JWT_SECRET=your-jwt-secret 

   # Running the application 
   to start the containers in the root of the project run docker-compose up -d

  
