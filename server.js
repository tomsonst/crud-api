const http = require('http');
const {
  getAllPersonsController,
  getSinglePersonController,
  createPersonController,
  updatePersonController,
  deletePersonController
} = require('./controllers');

const server = http.createServer((req, res) => {
  if(req.url === '/person' && req.method === 'GET') {
    
    getAllPersonsController(req, res);
  } else if (req.url.match(/\/person\/\w+/) && req.method === 'GET'){
    const id = req.url.split('/')[2]
    getSinglePersonController(req, res, id)

  } else if(req.url === '/person' && req.method === 'POST') {
    createPersonController(req, res);

  } else if(req.url.match(/\/person\/\w+/) && req.method === 'PUT'){
    const id = req.url.split('/')[2];
    updatePersonController(req, res, id);

  } else if(req.url.match(/\/person\/\w+/) && req.method === 'DELETE'){
    const id = req.url.split('/')[2];
    deletePersonController(req, res, id);

  } else {
    res.writeHead(404, 'Invalid url')
    res.end('This url is not exist')
  }
});

const PORT =  process.env.PORT || 4000

server.listen(PORT, () => { console.log('Server started in port 4000')})

module.exports = server;