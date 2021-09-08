require('dotenv').config();
const mongoose = require('mongoose')

const { Schema } = mongoose

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const johndoe = new Person({name: "John Doe", age: 28, favoriteFoods: ["Eggs", "Mongoes", "Banana"]})

  johndoe.save((err, data) => {
    if (err) { console.log(err) }
    done(null, data)
  })
};

const arrayOfPeople = [
  { name: "Harry", age: 25, favoriteFoods: [ "Steak", "Pizza", "Chicken" ]},
  { name: "Hermanion", age: 34, favoriteFoods: [ "Beef", "Bacon", "Pasta" ]},
  { name: "Mooktar", age: 29, favoriteFoods: [ "Pancakes", "Pizza", "Dunets" ]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) { console.log(err) }
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) { console.log(err) }
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) { console.log(err) }
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) { console.log(err) }
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) { console.log(err) }
    person.favoriteFoods.push(foodToAdd)
    person.save((e, updatedPerson) => {
      if (err) { console.log(err) }
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    { new: true},
    (err, newPerson) => {
      if (err) { console.log(err) }
      done(null, newPerson)
    }
  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    {_id: personId},
    (err, person) => {
      if (err) { console.log(err) }
      done(null, person)
    }
  )
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, person) => {
    if (err) { console.log(err) }
    done(null, person);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, docs) => {
      err ? console.log(err) : done(null, docs)
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
