const express = require('express'); 
const app = express(); 
const PORT = ; 

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend is running'); 
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
