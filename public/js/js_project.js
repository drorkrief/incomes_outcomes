// month name
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const d = new Date();
const monthName = `Available Budget in ${month[d.getMonth()]} ${d.getFullYear()}:`;
const header = document.getElementsByClassName('header')[0]
header.innerText = monthName;

// variables (global scope)
var totalIncome = 0;
var totalOutcome = 0;
var varTotal = 0;
var percentsOneIncom = 0;
// let idOfNewElement;
// enter triger
var input = document.getElementById("amount");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("checkButton").click();
    }
});
input = document.getElementById("description");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("checkButton").click();
    }
});
// call the get element from the server
getAllOfIncomes();
// call the get element from the server
getAllOfOutcomes();

// percent function
function percentMaker(a, b) {
    if (a != 0 && b != 0) {
        var temporary = b / a;
        document.getElementById('totalPercent').innerText = Math.floor(temporary * 100) + '%';
    }
    else {
        document.getElementById('totalPercent').innerText = '0%';
    }
}
// the function that does change in the percent elements
function changePerc(totalIncome) {
    if (totalOutcome > 0) {
        var elementsOfPercent = document.querySelectorAll('.newListItem');
        for (let index = 0; index < elementsOfPercent.length; index++) {
            var tempOutcom = elementsOfPercent[index].children[1].innerText * -1;
            if (totalIncome > 0) {
                elementsOfPercent[index].children[2].innerText = Math.floor(tempOutcom / totalIncome * 100) + '%';
            }
            else {
                elementsOfPercent[index].children[2].innerText = '--%';
            }
        }
    }
}
// the function of the button
document.getElementById('checkButton').addEventListener("click", callChackFun);
function callChackFun() {
    var temp = document.getElementById("typeValue");
    var value1 = temp.options[temp.selectedIndex].value;
    var amountValue = Number(document.getElementById('amount').value);
    var desc_1 = description.value;
    check(value1, amountValue, desc_1)
}
function check(value1, amountValue, desc_1, idOfNewElement) {

    if (amountValue > 0 && desc_1 != '') {
        if (value1 == 'plus') {
            var DescriptionValue = document.getElementById('description').value;

            // ******** create a post function to send obj to server  /income/
            axios
                .post("/incomes", {
                    description: DescriptionValue,
                    amount: amountValue
                })
                .then(function (response) {
                    idOfNewElement = response.data.id;

                    var newIncome = document.createElement('li');
                    document.getElementById('incomeList').appendChild(newIncome);
                    newIncome.classList='list1';
                    newIncome.innerHTML = `<span>${DescriptionValue}</span><span class="amount_income">+${amountValue.toFixed(2)}</span>`
                    // newIncome.innerHTML+=`<span id="amount_left">+${amountValue.toFixed(2)}</span>`
                    totalIncome += Number(amountValue);
                    document.getElementById('totalIncom').innerHTML = '+' + totalIncome.toFixed(2);
                    varTotal += amountValue;
                    if (varTotal > 0) {
                        document.getElementById('total').innerHTML = '+' + varTotal.toFixed(2);
                    }
                    else { document.getElementById('total').innerHTML = varTotal.toFixed(2); }
                    document.getElementById('description').value = '';
                    document.getElementById('amount').value = '';
                    percentMaker(totalIncome, totalOutcome);
                    changePerc(totalIncome);

                


                    // the delete button-->
                    var newButton = document.createElement('button');
                    newButton.innerHTML = '<i class="far fa-times-circle"></i>';
                    
                    // newButton.style.border = 'none';
                    // newButton.style.color = 'red';
                    // newButton.style.float = 'right';
                    // newButton.style.fontSize = '18px';

                    newButton.style.backgroundColor = 'unset';
                    newButton.onclick = function () {

                        // send to the server delete req

                        const url = `/incomes/${idOfNewElement}`;
                        axios
                            .delete(url)
                            .then(function (response) {
                                // handle success
                                if (response.status == 200) {
                                    document.getElementById('incomeList').removeChild(newIncome);
                                    totalIncome -= Number(amountValue);
                                    document.getElementById('totalIncom').innerHTML = '+' + totalIncome.toFixed(2);
                                    varTotal -= amountValue;
                                    if (varTotal > 0) {
                                        document.getElementById('total').innerHTML = '+' + varTotal.toFixed(2);
                                    }
                                    else { document.getElementById('total').innerHTML = varTotal.toFixed(2); }
                                    percentMaker(totalIncome, totalOutcome);
                                    changePerc(totalIncome);
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
                        console.log(idOfNewElement);
                    }
                    newIncome.appendChild(newButton);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        else {
            var DescriptionValue = document.getElementById('description').value;
            var amountValue = Number(document.getElementById('amount').value);
            // ******** create a post function to send obj to server  /outcome/
            let idOfNewElement;
            axios
                .post("/outcomes", {
                    description: DescriptionValue,
                    amount: amountValue
                })
                .then(function (response) {
                    idOfNewElement = response.data.id;
                    var newOutcomElement = document.createElement('li');
                   
                    // newOutcomElement.classList.add("newListItem");
                   
                    varTotal -= amountValue;
                    document.getElementById('outcomeList').appendChild(newOutcomElement);
                    newOutcomElement.innerHTML = '<span></span><span ></span><span></span>';
                    newOutcomElement.classList+="list1 newListItem";
                    totalOutcome += Number(amountValue);
                    if (totalOutcome > 0) {
                        document.getElementById('totalOutcom').innerHTML = ' -' + totalOutcome.toFixed(2);
                    }

                    if (varTotal > 0) {
                        document.getElementById('total').innerHTML = '+' + varTotal.toFixed(2);
                    }
                    else { document.getElementById('total').innerHTML = varTotal.toFixed(2); }
                    document.getElementById('description').value = '';
                    document.getElementById('amount').value = '';
                    percentMaker(totalIncome, totalOutcome);




                    // the delete button-->
                    var newButton = document.createElement('button');
                    newButton.innerHTML = '<i class="far fa-times-circle"></i>';
                   
                    newButton.onclick = function () {

                        // send to the server delete req
                        const url = `/outcomes/${idOfNewElement}`;
                        axios
                            .delete(url)
                            .then(function (response) {
                                // handle success
                                if (response.status == 200) {
                                    document.getElementById('outcomeList').removeChild(newOutcomElement);
                                    totalOutcome -= Number(amountValue);
                                    document.getElementById('totalOutcom').innerHTML = ' -' + totalOutcome.toFixed(2);
                                    varTotal += amountValue;
                                    if (varTotal > 0) {
                                        document.getElementById('total').innerHTML = '+' + varTotal.toFixed(2);
                                    }
                                    else { document.getElementById('total').innerHTML = varTotal.toFixed(2); }
                                    percentMaker(totalIncome, totalOutcome);
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
                    newOutcomElement.appendChild(newButton);
                    var tempVar = newOutcomElement.childNodes;
                    tempVar[0].innerText = DescriptionValue;
                    // tempVar[0].style.marginRight = '44px';
                    tempVar[1].innerText = '-' + amountValue.toFixed(2);
                  
                    if (totalIncome != 0) {

                        tempVar[2].innerText = Math.floor(amountValue / totalIncome * 100) + '%';

                    }
                    else {
                        tempVar[2].innerText = '---';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }
}
// definition of 
function getAllOfOutcomes() {
    axios
        .get("/outcomes")
        .then(function (response) {
            // incomes = response.data;
            let arryIncomes = response.data;
            // console.log(' response.data : --' ,  arryIncomes);
            for (let index = 0; index < arryIncomes.length; index++) {
                const element = arryIncomes[index];
                var DescriptionValue = element.description;
                var am1 = Number(element.amount);
                let theId = element.id;
                let pathNod = document.getElementById('outcomeList');
                var path1 = "outcomes";

                // ----the fun of putting data on the dom (from server)
                postIncomesFromServer(theId, am1, DescriptionValue, pathNod, path1);

            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};
function getAllOfIncomes() {
    axios
        .get("/incomes")
        .then(function (response) {
            // incomes = response.data;
            let arryIncomes = response.data;
            // console.log(' response.data : --' ,  arryIncomes);
            for (let index = 0; index < arryIncomes.length; index++) {
                const element = arryIncomes[index];
                var DescriptionValue = element.description;
                var am1 = Number(element.amount);
                let theId = element.id;
                let pathNod = document.getElementById('incomeList');
                var path1 = "incomes";
                // ----the fun of putting data on the dom (from server)
                postIncomesFromServer(theId, am1, DescriptionValue, pathNod, path1);

            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}
function postIncomesFromServer(theId, am1, DescriptionValue, pathNod, path1) {
    let newIncome = document.createElement('li');
    pathNod.appendChild(newIncome);
    newIncome.className = 'list1'
    if (path1 == "incomes") {

        newIncome.innerHTML = `<span>${DescriptionValue}</span><span class="amount_income">+${am1.toFixed(2)}</span>`;
        totalIncome += Number(am1);
        // console.log("incomes");
        document.getElementById('totalIncom').innerHTML = '+' + totalIncome.toFixed(2);
        varTotal += am1;
        if (varTotal > 0) {
            document.getElementById('total').innerHTML = '+' + varTotal.toFixed(2);
        }
        else { document.getElementById('total').innerHTML = varTotal.toFixed(2); }
        percentMaker(totalIncome, totalOutcome);
        changePerc(totalIncome);
    }
    else {

        newIncome.classList.add("newListItem");

        // the total handler
        varTotal -= Number(am1);
        if (varTotal > 0) {
            document.getElementById('total').innerHTML = '+' + varTotal.toFixed(2);
        }
        else { document.getElementById('total').innerHTML = varTotal.toFixed(2); }
        totalOutcome += Number(am1);
        percentMaker(totalIncome, totalOutcome);
        if (totalOutcome > 0) {
            document.getElementById('totalOutcom').innerHTML = ' -' + totalOutcome.toFixed(2);
        }
        newIncome.innerHTML += `<span class="DescriptionValue">${DescriptionValue}</span><span class="amount_income">-${am1.toFixed(2)}<span id="itemPrecent"></span></span>`;
        let percentSpan = newIncome.childNodes[1];
        if (totalIncome != 0) {
            percentSpan.childNodes[1].innerText=Math.floor(am1 / totalIncome * 100) + '%';


        }
        else {
            percentSpan.childNodes[1].innerText='---';
        }
    };



    // the delete button-->
    var newButton = document.createElement('button');
    newButton.innerHTML = '<i class="far fa-times-circle"></i>';
    newButton.className = "newButton";
    
    // display effect of button
    
    newButton.style.backgroundColor = 'unset';
    newButton.onclick = function () {

        // send to the server delete req
        const url = `/${path1}/${theId}`;
        axios
            .delete(url)
            .then(function (response) {
                // handle success
                if (response.status == 200) {
                    pathNod.removeChild(newIncome);
                    if (path1 == "incomes") {
                        totalIncome -= Number(am1);

                        document.getElementById('totalIncom').innerHTML = '+' + totalIncome.toFixed(2);
                        varTotal -= am1;
                        if (varTotal > 0) {
                            document.getElementById('total').innerHTML = '+' + varTotal.toFixed(2);
                        }
                        else { document.getElementById('total').innerHTML = varTotal.toFixed(2); }
                        changePerc(totalIncome);

                    }
                    else {
                        totalOutcome -= Number(am1);
                        document.getElementById('totalOutcom').innerHTML = ' -' + totalOutcome.toFixed(2);
                        varTotal += am1;
                        if (varTotal > 0) {
                            document.getElementById('total').innerHTML = '+' + varTotal.toFixed(2);
                        }
                        else { document.getElementById('total').innerHTML = varTotal.toFixed(2); }
                    };
                    percentMaker(totalIncome, totalOutcome);
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
    newIncome.appendChild(newButton);
};


// style of inbox handler
document.getElementById("typeValue").onchange = function () {

    var temp = document.getElementById("typeValue");
    var value1 = temp.options[temp.selectedIndex].value;
    if (value1 == 'plus') {
        document.getElementById('description').style.border = 'green 1px solid';
        document.getElementById('amount').style.border = 'green 1px solid';
        document.getElementById('checkButton').style.color = '#33A9A4';
        // document.getElementById('secondHeader').childNodes.style.border='green 3px solid';
    }
    else {
        document.getElementById('description').style.border = 'red 1px solid';
        document.getElementById('amount').style.border = 'red 1px solid';
        document.getElementById('checkButton').style.color = 'red';
    }
}


