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
        amount: [],
        date:[]
    },
    
    }

    function submitData(e) {
        e.preventDefault();

        validateForm();
        cleanForm();
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
            console.log(userBalance);
        }
    }

    function setDate(index) {
        let date = new Date(userBalance.historyList.date[index])
      
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let month = date.getMonth() < 10 ? '0' + date.getMonth(): date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        
        return `<i>${day}/${month}/${year} ${hour}:${min}:${sec}</i>`
    }

    function deleteData(e) {
        if (!confirm('Remove transaction?')){
            return
        }

        // clean the list item
        let index = e.target.dataset.index
        e.target.parentNode.remove()

        // clean the arrays of object when click on the delete button
        userBalance.historyList.description.splice(index, 1);
        userBalance.historyList.amount.splice(index, 1);
        userBalance.historyList.date.splice(index, 1);

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
        // save the value, description and date when occurs the transaction
        userBalance.historyList.description.push(textInput.value)
        userBalance.historyList.amount.push(parseFloat(input))
        userBalance.historyList.date.push( new Date())

        makeAccounts()

        return
    }

    function cleanForm() {
        textInput.value = null
        amountInput.value = null
        textInput.focus();
    }


    document.querySelector('#submit').addEventListener('click', submitData)



})
