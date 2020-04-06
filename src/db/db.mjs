import mongoose from 'mongoose';

// Initialize db connection when app get started
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});