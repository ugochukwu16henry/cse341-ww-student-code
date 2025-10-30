# Portfolio API Backend

Backend API for the portfolio frontend with optional MongoDB integration.

## Quick Start

### 1. Initialize the Project

```bash
npm init -y
npm install express cors
npm install --save-dev nodemon
```

### 2. Create the Server File

Create `server.js` using the basic version provided (without MongoDB).

### 3. Start the Server

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:8080`

### 4. Test with REST Client

Install the REST Client extension in VS Code, then use the `api-tests.rest` file to test endpoints:

- Health check: `GET http://localhost:8080/health`
- Get professional data: `GET http://localhost:8080/professional`

### 5. Test with Frontend

1. Keep the backend server running on port 8080
2. Open `index.html` in your browser (use Live Server or just open the file)
3. The page should populate with your data

## Customizing Your Data

Edit the `professionalData` object in `server.js`:

```javascript
const professionalData = {
  professionalName: 'Your Name',
  base64Image: 'your-base64-encoded-image',
  // ... update other fields
};
```

### Converting Images to Base64

Use this tool: https://elmah.io/tools/base64-image-encoder/

1. Upload your image
2. Copy the base64 string
3. Paste it as the value for `base64Image`

## STRETCH CHALLENGE: MongoDB Integration

### Prerequisites

- MongoDB installed locally OR MongoDB Atlas account
- MongoDB running on `mongodb://localhost:27017` (default)

### Setup

```bash
npm install mongodb
```

### Run with MongoDB

```bash
npm run start:mongo
# Or for development:
npm run dev:mongo
```

### MongoDB Configuration

Update the connection string in `server-mongodb.js`:

```javascript
const MONGO_URI = 'mongodb://localhost:27017';
// Or for MongoDB Atlas:
// const MONGO_URI = 'mongodb+srv://username:password@cluster.mongodb.net/';
```

### Features

- Automatic database seeding on first run
- Data persists across server restarts
- Bonus PUT endpoint to update data: `PUT /professional`

## Project Structure

```
portfolio-api/
├── server.js              # Basic version (no database)
├── server-mongodb.js      # MongoDB version
├── package.json
├── api-tests.rest        # REST Client tests
└── README.md
```

## API Endpoints

### GET /professional

Returns all professional data needed by the frontend.

**Response:**
```json
{
  "professionalName": "John Doe",
  "base64Image": "...",
  "nameLink": {
    "firstName": "John",
    "url": "https://example.com"
  },
  "primaryDescription": " is a Full Stack Developer",
  "workDescription1": "...",
  "workDescription2": "...",
  "linkTitleText": "Connect with me:",
  "linkedInLink": {
    "text": "LinkedIn Profile",
    "link": "https://linkedin.com/..."
  },
  "githubLink": {
    "text": "GitHub Profile",
    "link": "https://github.com/..."
  },
  "contactText": "..."
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### PUT /professional (MongoDB version only)

Update professional data.

**Request Body:** Same structure as GET response

## Testing Checklist

- [ ] Server starts without errors
- [ ] `/health` endpoint returns OK
- [ ] `/professional` endpoint returns correct JSON structure
- [ ] CORS is enabled (no CORS errors in browser)
- [ ] Frontend displays all data correctly
- [ ] Image displays (if using base64)
- [ ] All links work
- [ ] MongoDB connection successful (stretch challenge)
- [ ] Data persists after server restart (stretch challenge)

## Troubleshooting

### Port Already in Use

Change the port in `server.js`:
```javascript
const PORT = 3000; // or any available port
```

Then update the frontend's `script.js` to match.

### CORS Errors

The `cors` package should handle this, but if you still see errors, try:
```javascript
app.use(cors({
  origin: '*'
}));
```

### MongoDB Connection Failed

- Check if MongoDB is running: `mongosh`
- Verify connection string
- For Atlas, whitelist your IP address

### Frontend Not Loading Data

1. Check browser console for errors
2. Verify backend is running on port 8080
3. Test the API endpoint directly in browser: `http://localhost:8080/professional`
4. Check Network tab in DevTools

## Next Steps

- Add more endpoints (POST, PUT, DELETE)
- Add input validation
- Implement authentication
- Add environment variables for configuration
- Deploy to Heroku/Render/Railway
- Add unit tests

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [REST Client VS Code Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)