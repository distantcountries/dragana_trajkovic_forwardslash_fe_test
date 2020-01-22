  <template>
    <modal 
      name="cart-modal"
      transition="scale"
      class="cart-module"
      :scrollable="true"
      height="auto"
    >
      <div class="cart-modal-content">
        <div class="header-wrapper">
          <div class="header">
            <h1>My Cart</h1>
          </div>
        </div>
        <div class="products">
          <div class="cart-single-product-wrapper" v-for="(watch, index) in watchesInCart" :key="index">
            <div class="cart-single-product">
              <div class="close-button">
                <button @click="handleDelete(watch)"><img src="./../../public/img/icons/close.png"/></button>
              </div>
              <div class="title">
                <h2>
                  {{watch.title}}
                </h2>
                <h3>
                  Slim Collection Series 5
                </h3>
              </div>
              <div class="price">
                <p>${{watch.totalAmountOrdered}}.00</p>
              </div>
              <div class="quantity">
                <div class="number">
                  <p>{{watch.orderQuantity}}</p>
                </div>
                <div class="icons">
                  <button @click="handleIncrement(watch)"><img src="./../../public/img/icons/arrow-top.png"/></button>
                  <button @click="handleDecrement(watch)"><img src="./../../public/img/icons/arrow-bottom.png"/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-module-footer-wrapper">
          <div class="footer">
            <div class="total-amount">
              <h4>Total:</h4>
              <h5>${{totalAmount}}.00</h5>
            </div>
            <div class="checkout-button" @click="handleCheckout">
              <h6>Checkout</h6>
            </div>
          </div>
        </div>
      </div>
    </modal>
</template>
<script>
import {watchesService} from './../services/WatchesService'
export default {
  name: 'InputFocusModal',

  computed: {
    watchesInCart() {
      return this.$store.getters.totalInCartStore
    },
    totalAmount() {
      return this.$store.getters.totalAmountOrdered
    },
    cart() {
      return this.$store.getters.totalInCartStore
    }
  },

  methods: {
    handleDelete(watch) {
      this.$store.commit('removeWatchFromCartMutation', watch)
    },

    handleCheckout() {
      this.cart.forEach(function (e) {
        console.log(
          'Title:' + e.title + ', ' +
          'SKU:' + e.sku + ', ' +
          'Quantity:' + e.orderQuantity + ', ' +
          'Total:' + e.totalAmountOrdered + '.'
        )
      })
    },

    handleIncrement(watch) {
      if(watch.orderQuantity < watch.quantity) {
        watchesService.increment(watch)
        if(watch.addToCart && watch.orderQuantity <= watch.quantity) {
          this.$store.commit('incrementTotalItems')
          this.$store.commit('increaseTotalAmount', watch)
        }
      } else {
        alert('We have only ' +  watch.orderQuantity + ' products in stock')
      }
    },

    handleDecrement(watch) {
      if(watch.orderQuantity > 0) {
        watchesService.decrement(watch)
        this.$store.commit('decrementTotalItems')
        this.$store.commit('decreaseTotalAmount', watch)
      }
      if(watch.orderQuantity === 0 ) {
        this.$store.commit('removeWatchFromCartMutation', watch)
      }
    }, 
  }
}
</script>
