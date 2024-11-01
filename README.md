### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/khafidf/yellow-taxi-server.git
   cd yellow-taxi-server/server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory to store your environment variables. Add your API token:
   ```bash
   APP_TOKEN=your_api_token_here
   ```

### Running the Application

To start the server, use the following command:

```bash
npm start
```

Your API will be running on `http://localhost:3000` by default.

### API Endpoints

- **GET `/trip`**: Fetches trip data with optional query parameters:
  - `limit`: Number of records to return (default is 10).
  - `page`: The page number to fetch.
  - `time`: Filter trips by pickup date and time.
  - `trip`: Minimum trip distance to filter.
  - `amount`: Minimum fare amount to filter.

### Dependencies

This project includes the following dependencies:

- **axios**: For making HTTP requests.
- **cors**: To enable Cross-Origin Resource Sharing.
- **dotenv**: For managing environment variables.
- **express**: The web framework used to create the API.

#### Development Dependencies

- **nodemon**: A utility that monitors for changes in your source code and automatically restarts your server.

### License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more information.

