const persons = require('./db.json');
const {writeDataToFile} = require('./utils');
const { v4 } = require('uuid');

const getAllPersons = () => {
  return new Promise((res, rej) => {
    res(persons);
  })
}

const createPerson = (body) => {
  return new Promise((res, rej) => {
    const newPerson = {id: v4(), ...body};
    persons.push(newPerson);

    writeDataToFile('./db.json', persons)
    res(newPerson)
  });
}

const updatePerson = (id, body) => {
  return new Promise((res, rej) => {
    const {name, age, hobbies} = JSON.parse(body);
    const personIndex = persons.findIndex((item) => {return item.id === id})

    const newPerson = {
      ...persons[personIndex],
      name,
      age,
      hobbies
    }

    persons[personIndex] = newPerson;
    writeDataToFile('./db.json', persons);
    res(newPerson)
  });
}

const deletePerson = (id) => {
  return new Promise((res, rej) => {
    const personIndex = persons.findIndex((item) => item.id === id)
    persons.splice(personIndex, 1);

    writeDataToFile('./db.json', persons)
    res(personIndex === -1 ? false : true)
  });
}

module.exports = {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson
}