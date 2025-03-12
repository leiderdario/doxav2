
import express from 'express';

// This is a dummy file to fix build errors
// The actual server logic is in the backend folder
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
