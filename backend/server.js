const express = require('express'); 
const app = express(); 
const port = ; 

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend is running'); 
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
