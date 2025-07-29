# ChatDB UI

A React-based user interface that connects to a MongoDB database and leverages OpenAI’s ChatGPT to convert natural language prompts into MongoDB queries, allowing CRUD operations through conversational input.

### Features:
  - Natural language to MongoDB queries: Type human language commands and have them translated into MongoDB queries automatically.
  - CRUD operations: Supports Create, Read, Update, and Delete operations on your MongoDB collections.
  - Real-time interaction: Chat interface for submitting prompts and viewing responses.
  - Easy configuration: Connect to your MongoDB instance by providing database name and API keys.

### Technologies Used:
  - React with Material UI for the frontend
  - OpenAI ChatGPT API integration
  - MongoDB backend (accessed via API)
  - Fetch API for communication between frontend and backend

## Getting Started
### Prerequisites:
  - Node.js and npm installed
  - Running backend API that connects to MongoDB and OpenAI API
  - MongoDB database accessible with valid credentials

### Installation
Clone the repository:

```bash
git clone https://github.com/yourusername/chatdb-ui.git
cd chatdb-ui
```

### Install dependencies:

```bash
npm install
```

Configure environment variables or update your API endpoint URLs in the code if needed.

### Run the development server:
```bash
    npm start

    Open your browser and navigate to http://localhost:3000.
```

### Usage:
- Enter your MongoDB database name and API key in the provided fields.
- Use the chat interface to send natural language commands like:
  - "Insert a new user with name John and age 30."
  - "Find all documents where age is greater than 25."
  - "Update the user named John to have age 31."
  - "Delete the user with name John."
- View the responses and query results directly in the UI.
