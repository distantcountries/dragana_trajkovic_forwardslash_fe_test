  <template>
    <modal 
      name="cart-modal"
      transition="scale"
      height="800"
      width="400"
    >
      <div class="cart-modal-content">
          <!-- <div class="ct-top-right" @click="$modal.hide('cart-modal')"></div> -->

        <header>
          <h1>My Cart</h1>
        </header>

        <div class="products">
          <div class="cart-single-product" v-for="(watch, index) in watchesInCart" :key="index">
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
                  <p>${{watch.totalAmountOrdered}}</p>
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

        <footer>
          <div class="footer-wrapper">
            <div class="total-amount">
              <h4>Total:</h4>
              <h5>${{totalAmount}}</h5>
            </div>
            <div class="checkout-button" @click="handleCheckout">
              <h6>Checkout</h6>
            </div>
          </div>
        </footer>
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
      watchesService.deleteWatch(watch)
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

<style lang="scss">
</style>
