const app = require(`./app`);
const dotenv = require(`dotenv`);
const connectDB = require(`./config/database`)

//Handling Uncaught Exception
process.on(`uncaughtException`, (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting Down the Server due to Uncaught Exception.`);
  server.close(() => process.exit(1));
});

//configuration
dotenv.config({ path: `backend/config/.env` });

// Connecting to DB
connectDB()

app.listen(process.env.PORT, () => {
  console.log(`Server is live on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on(`unhandledRejection`, (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting Down the Server due to Unhandled Promise Rejection.`);
  server.close(() => {
    process.exit(1);
  });
});