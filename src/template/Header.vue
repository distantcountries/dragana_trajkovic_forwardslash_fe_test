<template>
    <div class="header-wrapper">
        <div class="header">
            <div class="header-logo">
                <h1>Ipsums</h1>
                <h2>Dev test task</h2>
            </div>
            <div class="header-cart">
                <div class="cart" @click="$modal.show('cart-modal')">
                    <div class="cart-icon">
                        <img src="./../../public/img/icons/cart-brown.png" />
                    </div>
                    <div class="cart-number">
                        <p>{{watchesInCart}}</p>
                    </div>
                </div>
                <Notification />
                <CartModal />
                <div class="total-amount">
                    <p>Total:</p>
                    <h3>${{showPrice(totalAmount)}}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Notification from './../modals/Notification'
import CartModal from './../modals/CartModal'
export default {
    components: {
        Notification,
        CartModal
    },

    data() {
        return {
            showCart: false
        }
    },

    computed: {
        watchesInCart() {
            return this.$store.getters.totalItemsOrdered
        }, 
        totalAmount() {
            return this.$store.getters.totalAmountOrdered
        }
    },

    methods: {
        showCartModal () {
            this.$modal.show('cart-modal');
        },
        hide () {
            this.$modal.hide('cart-modal');
        },
        showPrice(num) {
            let result = Number(num.toFixed(0)).toLocaleString().split(/\s/).join(',') + '.' + '00'
            return result
        }
    }
}
</script>

