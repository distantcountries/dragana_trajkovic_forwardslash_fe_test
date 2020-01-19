<template>
    <div class="header-wrapper">
        <div class="header">
            <div class="header-logo header-segment">
                <h1>Ipsums</h1>
                <h2>Dev test task</h2>
            </div>
            <div class="header-cart header-segment">
                <div class="cart">
                    <div class="cart-icon">
                        <img src="./../../public/img/icons/cart-brown.png" 
                            @click="$modal.show('cart-modal')"
                        />
                    </div>
                    <div class="cart-number">
                        <p>{{watchesInCart}}</p>
                    </div>
                    <Notification />
                </div>
                <div class="total-amount">
                    <p>Total:</p>
                    <h3>${{totalAmount}}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Notification from './../modals/Notification'
export default {
    components: {
        Notification
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
        }
    }
}
</script>

