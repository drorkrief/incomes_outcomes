function handleGet(array,  req, res) {
  {
    if (req.query.description == undefined) {
      // got /incomes
      res.send(array);
    } else {
      // got e.g. /incomes?description=salary 1
      // -- got query string -> req.query.description
      const item = array.find(
        it => it.description == req.query.description
      );
      if (item == undefined) {
        res.sendStatus(404);
      } else {
        res.send(item);
      }
    }
  }
}

module.exports.handleGet = handleGet;
