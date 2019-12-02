const express = require("express");
const app = express(),
  PORT = 8080;

const routeHelper = require("./incomes_outcomes");

const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// --- used for json in body
app.use(express.json());
let ids = 3;

const incomes = [
  { description: "salary 1", amount: 26000, id: 1 },
  { description: "salary 2", amount: 12000, id: 2 }
];

const outcomes = [
  { description: "coffee", amount: 400, id: 1 },
  { description: "fuel", amount: 1000, id: 2 }
];

function isValidationOk(description, amount) {
  return description.length > 0 && amount > 0;
}

/************* OUTCOMES  */
// --- read
app.get("/outcomes", (req, res) => {
  routeHelper.handleGet(outcomes, req, res);
});


// delete
app.delete("/outcomes/:id", (req, res) => {
  const index = outcomes.findIndex(it => it.id == req.params.id);
  // --- need to check index is ok
  if (index == -1) {
    res.sendStatus(404);
  } else {
    outcomes.splice(index, 1);
    res.sendStatus(200);
  }
});


// --- create
app.post("/outcomes", (req, res) => {
  const newOutcome = {
    description: req.body.description,
    amount: req.body.amount,
    id: ids
  };

  if (isValidationOk(newOutcome.description, newOutcome.amount)) {
    ids++;
    outcomes.push(newOutcome);
    res.status(201).send(newOutcome);
  } else {
    // --- input is not valid
    res.sendStatus(400);
  }
});


// update
app.put("/outcomes/:id", (req, res) => {
  const id = req.params.id;
  const updatedOutcome = req.body;

  // --- validate the descption length > 0 , amount > 0
  // --- if not return status code 400 - BAD REQUEST

  if (isValidationOk(updatedOutcome.description, updatedOutcome.amount)) {
    // --- input is valid
    const index = outcomes.findIndex(it => it.id == id);
    if (index == -1) {
      res.sendStatus(404);
    } else {
      outcomes[index].description = updatedOutcome.description;
      outcomes[index].amount = updatedOutcome.amount;
      res.send(updatedOutcome);
    }
  } else {
    // --- input is not valid
    res.sendStatus(400);
  }
});



/************* INCOMES  */

// update
app.put("/incomes/:id", (req, res) => {
  const id = req.params.id;
  const updatedIncome = req.body;

  // --- validate the descption length > 0 , amount > 0
  // --- if not return status code 400 - BAD REQUEST

  if (isValidationOk(updatedIncome.description, updatedIncome.amount)) {
    // --- input is valid
    const index = incomes.findIndex(it => it.id == id);
    if (index == -1) {
      res.sendStatus(404);
    } else {
      incomes[index].description = updatedIncome.description;
      incomes[index].amount = updatedIncome.amount;
      res.send(updatedIncome);
    }
  } else {
    // --- input is not valid
    res.sendStatus(400);
  }
});

// delete
app.delete("/incomes/:id", (req, res) => {
  const index = incomes.findIndex(it => it.id == req.params.id);
  // --- need to check index is ok
  if (index == -1) {
    res.sendStatus(404);
  } else {
    incomes.splice(index, 1);
    res.sendStatus(200);
  }
});

// --- create
app.post("/incomes", (req, res) => {
  const newIncome = {
    description: req.body.description,
    amount: req.body.amount,
    id: ids
  };

  if (isValidationOk(newIncome.description, newIncome.amount)) {
    ids++;
    incomes.push(newIncome);
    res.status(201).send(newIncome);
  } else {
    // --- input is not valid
    res.sendStatus(400);
  }
});

// --- read
app.get("/incomes", (req, res) => {
  routeHelper.handleGet(incomes, req, res);  
});

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});

app.get("*",(req,res)=> {
  res.redirect('/404.html');
 });
