const db = require(__dirname + '/index').db;

const populateDb = () => {
  db.query('DROP TABLE IF EXISTS Couples, Users, Questions, Messages, Todos, Events, Lovebucks CASCADE')
    .then(db.couples.create)
    .then(db.users.create)
    // .then(db.categories.create)   // new
    // .then(db.categories.init)   // new
    .then(db.questions.create)
    .then(db.questions.init)
    .then(db.messages.create)
    .then(db.events.create)
    .then(db.todos.create)
    .then(db.lovebucks.create)
    // .then(db.todos.init)
    // .then(db.events.init)
    .catch(err => console.log('There was an error populating the db - ', err))
    // .then(db.questions_categories.create)  // new
    // .then(db.questions_categories.init)   // new
    .then(result => console.log('Db successfully restarted!'))
    .catch(err => console.log('End of db creation, issue: ' + err));
};

module.exports = populateDb;
