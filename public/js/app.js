let incomes;

// -----delete Income By Id
function deleteIncomeById(argId, objIncome) {
  // -- call the server using delete
  const url = `/incomes/${argId}`;
  axios
    .delete(url)
    .then(function (response) {
      // handle success
      if (response.status == 200) {
        const parent = objIncome.parentElement;
        parent.removeChild(objIncome);
      }
      else {
        console.log(`status is not 200 : ${response.status}`)
      }
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function createIncome(Desc, amoun) {
  // --- get description , amount from DOM
  const description = Desc;
  const amount = amoun;

  // --- call the server using post
  axios
    .post("/incomes", {
      description: description,
      amount: amount
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getIncomes() {
  axios
    .get("/incomes")
    .then(function (response) {
      incomes = response.data;

      let htmlElement;
      document.getElementById("id_incomes").innerHTML = "";
      for (let index = 0; index < incomes.length; index++) {
        const element = incomes[index];
        htmlElement = document.createElement("p");
        htmlElement.innerText = `${element.description} , ${element.amount} ,${element.id}`;
        document.getElementById("id_incomes").appendChild(htmlElement);
        htmlElement.onclick = function () {
          deleteIncomeById(element.id, this);
        };
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

