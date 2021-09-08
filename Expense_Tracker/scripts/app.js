this.addEventListener('load', () => { 

    const balance = document.querySelector('.your-balance');
    const income = document.querySelector('#income p');
    const expense = document.querySelector('#expense p');
    const historyUl = document.querySelector('#history');
    const textInput = document.querySelector('#expense-description');
    const amountInput = document.querySelector('#expense-amount');

    const userBalance = {
    totalBalance: 0,
    income: 0,
    expense: 0,
    historyList: {
        description: [],
        amount: []
    },
    date: {
        day: [],
        month: [],
        year: [],
        hour: [],
        min: [],
        sec: [],
    } 
    }

    function submitData(e) {
        e.preventDefault();

        validateForm();
        cleanForm();

        textInput.focus();
    }

    function renderValues () {
        balance.textContent = `${userBalance.totalBalance.toFixed(2)}€`
        userBalance.totalBalance > 0 ? balance.classList.remove('red') : balance.classList.remove('green')
        userBalance.totalBalance < 0 ? balance.classList.add('red') : balance.classList.add('green')

        income.textContent = `+ ${userBalance.income.toFixed(2)}€`
        expense.textContent = `- ${userBalance.expense.toFixed(2)}€`
    }

    function renderList() {
        historyUl.innerHTML = '';
    
        for (let i = 0; i < userBalance.historyList.description.length ; i++) {
            const li = document.createElement('li');
            li.classList.add('list');
            historyUl.appendChild(li);
        
            const delBt = document.createElement('button');
            delBt.classList.add('bt-list');
            delBt.textContent = 'X';
            delBt.dataset.index = i;
            li.appendChild(delBt);

            delBt.addEventListener('click', deleteData)
            
            const para = document.createElement('p');
            para.textContent = `${userBalance.historyList.description[i].toUpperCase()} : ${userBalance.historyList.amount[i]}€`;
            para.classList.add(userBalance.historyList.amount[i] < 0 ? 'red-para' : 'green-para');
            para.classList.add('para-list');
            
            const sp = document.createElement('span');
            sp.classList.add('span-list');
            sp.innerHTML = setDate(i);
            
            para.appendChild(sp);
            li.appendChild(para);
        }
    }

    function setDate(index) {
        let day = userBalance.date.day[index] < 10 ? '0' + userBalance.date.day[index] : userBalance.date.day[index];
        let month = userBalance.date.month[index] < 10 ? '0' + userBalance.date.month[index] : userBalance.date.month[index];
        let year = userBalance.date.year[index];
        let hour = userBalance.date.hour[index] < 10 ? '0' + userBalance.date.hour[index] : userBalance.date.hour[index];
        let min = userBalance.date.min[index] < 10 ? '0' + userBalance.date.min[index] : userBalance.date.min[index];
        let sec = userBalance.date.sec[index] < 10 ? '0' + userBalance.date.sec[index] : userBalance.date.sec[index];

        let strDate = `<i>${day}/${month}/${year} ${hour}:${min}:${sec}</i>`

        return strDate
    }

    function deleteData(e) {
        let index = e.target.dataset.index

        // clean the list item
        e.target.parentElement.remove()

        // clean the arrays when click on the delete button
        userBalance.historyList.description.splice(index, 1);
        console.log(userBalance.historyList.description)
        userBalance.historyList.amount.splice(index, 1);
        console.log(userBalance.historyList.amount)
        userBalance.date.day.splice(index,1)
        userBalance.date.month.splice(index,1)
        userBalance.date.year.splice(index,1)
        userBalance.date.hour.splice(index,1)
        userBalance.date.min.splice(index,1)
        userBalance.date.sec.splice(index,1)

        
        makeAccounts();
        renderList();
        renderValues();
        
        return
    }

    function validateForm() {
        let auxStrAmount = amountInput.value
        let auxStrText = textInput.value
        if (!auxStrAmount.match(/[a-zA-Z]/g) && auxStrAmount.length > 0 && auxStrText.length > 0){
            saveData(auxStrAmount);
            renderValues();
            renderList();
        }else {
            alert('Please add Text and amount ')
        }
    }

    function makeAccounts() {
        userBalance.expense = 0;
        userBalance.income = 0;

        // calculate the income and expense 
        for (let i = 0; i <  userBalance.historyList.amount.length; i++ ) {
        let money = userBalance.historyList.amount[i]
        money < 0 ? userBalance.expense -= money : userBalance.income += money 
        }

        // calculate de total (income - expense)
        userBalance.totalBalance = userBalance.income - userBalance.expense 
    }

    function saveData(input) {
        // save actual date when add a new expense
        let d = new Date();
        userBalance.date.day.push(d.getDate())
        userBalance.date.month.push(d.getMonth())
        userBalance.date.year.push(d.getFullYear())
        userBalance.date.hour.push(d.getHours())
        userBalance.date.min.push(d.getMinutes())
        userBalance.date.sec.push(d.getSeconds())

        // save the value and the description of list item
        userBalance.historyList.description.push(textInput.value)
        userBalance.historyList.amount.push(parseFloat(input))

        makeAccounts()

        return
    }

    function cleanForm() {
        textInput.value = null
        amountInput.value = null
    }


    document.querySelector('#submit').addEventListener('click', submitData)



})
