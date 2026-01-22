# CRUD E-shop

## Project Overview

CRUD E-shop is a web-based e-commerce application that allows users to view products, manage shopping carts, and enables administrators to add, modify, and delete products. The project uses MVC (Model-View-Controller) architecture principles, ORM (Object-Relational Mapping) technology, and the Repository pattern for database layer abstraction.


### Main Features

- **For Users:**
  - Viewing and filtering products
  - Shopping cart management (adding, removing products, changing quantities)
  - Order checkout
  - Real-time notifications about new products (Socket.IO)

- **For Administrators:**
  - Adding, modifying, and deleting products
  - Managing products by categories

## Technology Choices and Justifications

### Backend

- **Node.js + Express.js** - Chosen for high compatibility, ease of use, and extensive integration with React
- **Sequelize (ORM)** - Chosen because:
  - Allows working with JavaScript objects instead of SQL
  - Automatic database schema synchronization
  - Easy management of associations
  - Database independence (easy to switch from SQLite → PostgreSQL)
  - Migration support
- **SQLite** - Chosen for development phase due to simplicity and file-based storage
- **Socket.IO** - For real-time notifications when new products are added

  ## UML Class Diagram

The application is built using a decoupled Layered Architecture, which ensures maintainability and scalability. The data flow follows a strict path from the client-side to the persistence layer:


<img width="400" height="600" alt="klassidiagramm" src="https://github.com/user-attachments/assets/09308fbe-bdb8-4973-a188-2a5608ab6316" />

### Frontend

- **React 19 + Vite** - Chosen for:
  - Fast development environment (HMR - Hot Module Replacement)
  - Component-based architecture
  - Large community and documentation
  - Team familiarity with the framework
- **React Router 7** - For SPA (Single Page Application) navigation
- **Socket.IO Client** - For receiving real-time notifications

### Architecture Principles

The project uses **MVC** (Model-View-Controller), **Repository**, and **Service** patterns:

- **MVC** - Separates data models (`models/`), user interface (`frontend/src/`), and HTTP request handling (`controllers/`). Ensures clear structure, easier testing, and parallel development.
- **Repository** (`repositories/`) - Separates database queries, allows easy database switching, and simplifies testing.
- **Service** (`services/`) - Contains business logic, separates it from controllers, and enables code reuse.

## Getting Started
**NB** Extract the .zip file first if you download it as a zip file.
### Prerequisites

- Node.js 18 or newer
- npm or yarn
- Git (if cloning from repository)

### Installation

1. **Clone the repository or download the project:**
   ```bash
   git clone <repository-url>
   cd CRUD_Epood
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running

#### Development Mode

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   The server starts on port **3000** and automatically creates the SQLite database file `database.sqlite`.

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend runs on port **5173** (Vite default port).

3. **Open browser:**
   ```
   http://localhost:5173
   ```

#### Production Mode

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the backend:**
   ```bash
   cd backend
   npm start
   ```

### Database Initialization

The database is created automatically on startup. To add seed data, run:

```bash
cd backend
node src/config/seedProducts.js
```

## Data Model

## Flowchart of the 'Add to Cart' business logic

The following flowchart illustrates the logical sequence of operations when a user adds a product to their shopping cart. This process demonstrates the interaction between the frontend, the business logic layer, and the persistence layer:


<img width="600" height="800" alt="flowchart" src="https://github.com/user-attachments/assets/15d1e9ef-51d6-4fe4-87f8-5b28ec067f1c" />

## API documentation (Interactive)

This project uses the OpenAPI 3.0 specification for API documentation. 

You can view the interactive documentation and test the endpoints (when the server is running locally) by clicking the link below:

👉 [Open Interactive Swagger UI](https://editor.swagger.io/?url=https://raw.githubusercontent.com/reinarkajava/CRUD_Epood/main/openapi.yaml)

---
*Note: Ensure your backend server is running on http://localhost:3000 for the 'Try it out' feature to work.*
[View Interactive API Docs](https://editor.swagger.io/?url=https://raw.githubusercontent.com/KASUTAJA_NIMI/REPO_NIMI/main/openapi.yaml)

## Testing
*Test type:** Unit tests (Service layer with mocked repositories)

**What is tested:**
- ProductService: business logic, validation, discount calculation
- CartService: cart operations, validation, error handling

**How to run:**
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```


## Roles and Team Work Distribution

### Reinar
- **Role:** Project documentation, technology selection
- 
  - Creating README file
  - Managing project documentation
  - Developing mockup login system
  - Selecting and justifying project technologies

### Heilo
- 
- 
  - Designing and implementing database structure
  - Setting up Sequelize ORM
  - Developing administrator view
  - Implementing backend API endpoints

### Toomas
- 
- 
  - Managing Git repository
  - Managing branches and pull requests
  - Code merging
  - Developing shopping cart functionality in frontend

