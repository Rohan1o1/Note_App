const dotenv = require("dotenv");
dotenv.config();
console.log('TEST ENV:', process.env.EMAIL_USER);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db").default;
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Global error handler for debugging
app.use((err, req, res, next) => {
	console.error('Global error handler:', err);
	res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
