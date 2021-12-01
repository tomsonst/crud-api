const { uuid } = require('uuidv4');
const PersonModel = require('./personModel');
const { getPostData } = require('./utils');
const {validate} = require('uuid');

const throwErrorApi = (res, error) => {
  res.writeHead(500)
  res.end(error.message)
}

const getAllPersonsController = async(req, res) => {
  try {
      const persons = await PersonModel.getAllPersons();

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(persons))
  } catch (error) {
      console.log(error);
      throwErrorApi(res, error);
  }
}

const getSinglePersonController = async(req, res, id) => {
  try{

    if(validate(id)){
      const persons = await PersonModel.getAllPersons();

      const singlePerson = persons.find((item) => {return item.id === id})

      if(singlePerson){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(singlePerson))
      } else {
        res.writeHead(404, 'Invalid id')
      res.end('This id is not exist')
      }
    } else {

      res.writeHead(400, 'Invalid id')
      res.end('id should be in format uuid')
    }

  } catch (error) {
    console.log(error);
    throwErrorApi(res, error);
  }
}

const createPersonController = async(req, res) => {
  try{
      const body = await getPostData(req)
      const {name, age, hobbies} = JSON.parse(body);
      if(name && age && hobbies){
        const person = {
          name,
          age,
          hobbies
        }
        const newPerson = await PersonModel.createPerson(person);
  
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(newPerson))
      } else {
        res.writeHead(400, 'Invalid create')
        res.end('Body do not contain requered field')
      }

  } catch (error) {
    console.log(error);
    throwErrorApi(res, error);
  }
}

const updatePersonController = async(req, res, id) => {
  try{
    if(validate(id)){
      const persons = await PersonModel.getAllPersons();

      const singlePerson = persons.find((item) => {return item.id === id})
      if(singlePerson){
        const body = await getPostData(req)
        const person = await PersonModel.updatePerson(id, body);

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(person))
      } else {
        res.writeHead(404, 'Invalid id')
        res.end('User with this id is not exist')
      }
    } else {
      res.writeHead(400, 'Invalid id')
      res.end('id should be in format uuid')
    }
  } catch (error) {
    console.log(error);
    throwErrorApi(res, error);
  }
}

const deletePersonController = async(req, res, id) => {
  try {
    if(validate(id)){
      const result = await PersonModel.deletePerson(id);
      if(result){
        res.writeHead(204, 'User is deleted')
        res.end()
      } else {
        res.writeHead(404, 'User is not deleted')
        res.end('User with this id is not exist')
      }
    } else {
      res.writeHead(400, 'Invalid id')
      res.end('id should be in format uuid')
    }
  } catch (error) {
    console.log(error);
    throwErrorApi(res, error);
  }
}

module.exports = {
  getAllPersonsController,
  getSinglePersonController,
  createPersonController,
  updatePersonController,
  deletePersonController
}