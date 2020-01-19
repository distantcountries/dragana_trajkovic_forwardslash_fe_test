  <template>
    <modal 
      name="notification"
      class="notification-module"
      transition="scale"
      v-if="cartNotification"
    >
        <!-- <div class="ct-top-right" @click="$modal.hide('notification')"></div> -->
        <div class="notification-box">
            <div class="close-button" @click="handleClose">
                <img src="img/icons/close.png"  />
            </div>
            <div class="product-info">
                <div class="image">
                   <img :src="watch.selectedImg"/>
                </div>
                <div class="title">
                    <h1>{{watch.title}}</h1>
                    <h2>{{watch.category}}</h2>
                </div>
                <div class="sku">
                    <h3>{{watch.sku}}</h3>
                </div>  
            </div>
            <div class="message">
                <p>Has been successfully added to your cart!</p>
            </div>
        </div>

    </modal>
</template>

<script>
export default {
    computed: {
        watch() {
            return this.$store.getters.justAddedItem
        },
        cartNotification() {
            return this.$store.getters.cartNotification
        }
    },

    methods: {
        handleClose() {
            this.$store.commit('cartNotificationFalseMutation') //cartNotification = false - hide notification
            this.$store.dispatch('cartNotificationTrueAction')//immediately after setTimeOut cartNotification = true so notification can show aftre click
        }
    }
}
</script>