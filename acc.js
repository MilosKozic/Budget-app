const select = document.querySelector("#select")
const input = document.querySelector("#opis")
const amount = document.querySelector("#amount")
const button = document.querySelector("#button")
const income = document.querySelector("#income")
const expense = document.querySelector("#expense")
const netSum = document.querySelector("#netSum")
const phSUm = document.querySelector("#phSum")
const rhSUm = document.querySelector("#rhSum")

var sum = 0
var ph = 0
var rh = 0
let arr = []

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const addToDom = () => {
    if (arr.length > 0) {
        while (expense.hasChildNodes()) {
            expense.removeChild(expense.lastChild);
        }
        for (let i = 0; i < arr.length; i++) {
            const li1 = document.createElement('li')
            let count1 = Number(arr[i].iznos)

            if (ph == 0) {
                li1.textContent = "Expense" + ":  " + arr[i].opis + "    " + numberWithCommas(arr[i].iznos) + "   " + "( % )"
                expense.appendChild(li1)
            }
            else {
                li1.textContent = "Expense" + ":  " + arr[i].opis + "    " + numberWithCommas(arr[i].iznos) + "   " + "(" + (arr[i].iznos / ph * 100).toFixed(2) + "%" + ")"
                expense.appendChild(li1)
            }


            const del = document.createElement('button')
            del.innerHTML = "&#x1F5D1;"
            li1.appendChild(del)
            del.addEventListener('click', () => {
                del.parentElement.remove()
                rh = rh + count1
                sum = sum + count1
                netSum.innerHTML = `= ${numberWithCommas(sum)} RSD`
                var proc = (-rh / ph) * 100
                if (ph == 0) {
                    rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (%)`
                }
                else {
                    rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (${proc.toFixed(2)})%`
                }
                arr.splice(i, 1)
            })
        }
    }
}
button.addEventListener('click', () => {

    if (Number(amount.value) <= 0) {
        window.alert("Please enter an amount greater then zero")
        return
    }
    if (input.value.length == 0) {
        window.alert("Please enter description")
        return
    }

    if (select.value == "Income") {
        const li = document.createElement('li')
        li.textContent = select.value + ":  " + input.value + "  " + numberWithCommas(amount.value)
        income.appendChild(li)
        let count = Number(amount.value)
        sum = sum + count
        ph = ph + count
        netSum.innerHTML = `=  ${numberWithCommas(sum)} RSD`
        phSUm.innerHTML = `Prihod:   ${numberWithCommas(ph)}`
        var proc = (-rh / ph) * 100
        if (ph == 0) {
            rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (%)`
        }
        else {
            rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (${proc.toFixed(2)})%`
        }

        const del = document.createElement('button')
        del.innerHTML = '&#x1F5D1;'
        li.appendChild(del)

        del.addEventListener('click', () => {
            del.parentElement.remove()
            sum = sum - count
            ph = ph - count
            netSum.innerHTML = `=  ${numberWithCommas(sum)}  RSD`
            phSUm.innerHTML = `Prihod:   ${numberWithCommas(ph)}`
            let proc = (-rh / ph) * 100
            if (ph == 0) {
                rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (%)`
            }
            else {
                rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (${proc.toFixed(2)})%`
            }

            addToDom(arr)
        })

        addToDom(arr)

    }
    if (select.value == "Expense") {
        const li = document.createElement('li')
        let niz = {
            select: "Expense",
            opis: input.value,
            iznos: amount.value,
        }
        arr.push(niz)
        
        let count = Number(amount.value)

        console.log(arr)
        sum = sum - count
        netSum.innerHTML = `= ${numberWithCommas(sum)} RSD`
        rh = rh - count
        var proc = (-rh / ph) * 100
        var proc1 = (Number(amount.value) / ph) * 100
        if (ph == 0) {
            rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (%)`
        }
        else {
            rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (${proc.toFixed(2)})%`
        }

        li.textContent = select.value + ":  " + input.value + "    " + numberWithCommas(amount.value) + "   "
        expense.appendChild(li)

        const span = document.createElement('span')
        li.appendChild(span)
        if (ph == 0) {
            span.innerHTML = "%"
        }
        else {
            span.innerHTML = `  (${proc1.toFixed(2)}  %)`
        }

        const del = document.createElement('button')
        del.innerHTML = "&#x1F5D1;"
        li.appendChild(del)
        del.addEventListener('click', () => {
            del.parentElement.remove()
            rh = rh + count
            sum = sum + count
            netSum.innerHTML = `= ${numberWithCommas(sum)} RSD`
            var proc = (-rh / ph) * 100
            rhSUm.innerHTML = `Rashod:   ${numberWithCommas(rh)}  (${proc.toFixed(2)})%`
            arr.splice(arr.indexOf(niz), 1)
        })
    }

    select.value = "default"
    input.value = ""
    amount.value = ""

})


