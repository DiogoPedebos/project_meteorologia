const express = require('express');
const weatherRoutes = require('./routes/weather');
const app = express();

app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
