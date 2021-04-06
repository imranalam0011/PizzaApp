import axios from 'axios';
import Noty from 'noty';
import { initAdmin } from './admin'

let addTocart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty

        // Alert when new item will add
        new Noty({
            type: 'success',
            timeout: 1000,
            progressBar: false,
            text: 'Item added to cart'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            progressBar: false,
            text: 'Something went wrong'
        }).show();
    })
}

addTocart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // let pizza = btn.dataset.pizza
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)

    })
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

initAdmin()

// Socket
// let socket = io()

// Join
// if(order) {
//     socket.emit('join', `order_${order._id}`)
// }
// let adminAreaPath = window.location.pathname
// if(adminAreaPath.includes('admin')) {
//     initAdmin(socket)
//     socket.emit('join', 'adminRoom')
// }