<template>
    <div class="single-watch">
        <div class="visible-details">
            <div class="star">
                <div class="star-button" @click="handleStar(watch.id)" v-if="!watch.star">
                    <img src="img/icons/star-empty.png"/>
                </div>
                <div class="star-button" v-else @click="handleStar(watch.id)">
                    <img src="img/icons/star-filled.png"/>
                </div>
            </div>
            <div class="main-image">
                <div class="image">
                    <img :src="watch.selectedImg"/>
                </div>
            </div>
            <div class="title">
                <h1>{{watch.title}}</h1>
                <h2>{{watch.category}}</h2>
            </div>
            <div class="sku">
                <div class="labels-mobile-wrapper">
                    <span class="labels-mobile">Item No: </span>
                </div>
                <h3>{{watch.sku}}</h3>
            </div>
            <div class="price">
                <div class="labels-mobile-wrapper">
                    <span class="labels-mobile">Listing: </span>
                </div>
                <p>${{watch.price}}.00</p>
            </div>
            <div class="sale-price">
                <div class="labels-mobile-wrapper">
                    <span class="labels-mobile">Wholesale: </span>
                </div>
                <p v-if="watch.salePrice">${{watch.salePrice}}.00</p>
                <p v-else>${{watch.price}}.00</p>
            </div>
            <div class="quantity">
                <div class="labels-mobile-wrapper">
                    <span class="labels-mobile">QTY: </span>
                </div>
                <div class="number">
                    <p>{{watch.orderQuantity}}</p>
                </div>
                <div class="icons">
                    <button @click="handleIncrement(watch)"><img src="img/icons/arrow-top.png"/></button>
                    <button @click="handleDecrement(watch)"><img src="img/icons/arrow-bottom.png"/></button>
                </div>
            </div>
            <div class="add-watch">
                <div class="exclamation" v-if="watch.quantity<3 && watch.quantity>0">
                    <div class="icon">
                        <img src="img/icons/exclamation.png"/>
                    </div>
                    <div class="text">
                        <p>Low on stock</p>
                    </div>
                </div>
                <div class="add" @click="handleAdd(watch)" 
                    v-if="(!watch.addToCart && watch.quantity>0) || (watch.addToCart && watch.orderQuantity===0)"
                >
                    <h4>Add</h4>
                    <img src="img/icons/cart-white.png"/>
                </div>
                <div class="added" 
                    v-if="(watch.quantity>0 && watch.addToCart && watch.orderQuantity>0)"
                >
                    <h4>Added</h4>
                    <img src="img/icons/checked.png"/>
                </div>
                <div class="unabled" v-if="watch.quantity === 0">
                    <img src="img/icons/cart-unabled.png"/>
                    <h5>Out of stock</h5>
                </div>
            </div>
            <div class="show-more">
                <div class="show-more-button" v-if="!watch.moreDetails" @click="showMoreDetails(watch.id)">
                    <img src="img/icons/arrow-bottom.png" />
                    <span class="tooltip">Show more details</span>
                </div>
                <div class="show-more-button" v-else @click="hideMoreDetails(watch.id)">
                    <img src="img/icons/arrow-top.png" />
                    <span class="tooltip">Hide more details</span>
                </div>
            </div>
        </div>
        <div class="more-details" v-if="watch.moreDetails">
            <div class="empty-div"></div>
            <div class="segment gallery-images-wrapper1">
                <div class="gallery-images-wrapper2">
                    <div class="gallery-images" v-for="(image, index) in watch.images" :key="index">
                        <img :src="image.url" @click="handleImage(image, watch.id)"/>
                    </div> 
                </div>
            </div>
            <div class="more-details-text">
                <div class="color segment">
                    <p><span class="more-details-label">Color: </span>{{watch.color}}</p>
                </div>
                <div class="band segment">
                    <p><span class="more-details-label">Band: </span>{{watch.band}}</p>
                </div>
                <div class="material segment">
                    <p><span class="more-details-label">Case/bezel material: </span>{{watch.material}}</p>
                </div>
                <div class="features segment">
                    <p><span class="more-details-label">Features: </span>{{watch.features}}</p>
                </div>
            </div>
            <div class="fullscreen-button-wrapper segment">
                <div class="fullscreen-button">
                    <img @click="handleFullscreen" src="img/icons/fullscreen.png"/>
                    <span class="tooltip" @click="handleFullscreen">Fullscreen</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {watchesService} from './../../services/WatchesService'
export default {
    props: [
        'watch'
    ],
    
    methods: {
        handleStar(watchId) {
            watchesService.addStar(watchId)
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

        handleAdd(watch) {
            watchesService.addWatch(watch)
            this.$modal.show('notification')
            this.$store.commit('notifyAddedItemMutation', watch)
            this.$store.commit('watchInCartMutation', watch)
            this.$store.commit('totalItemsInCartMutation', watch)
            this.$store.commit('totalAmountOrderedMutation', watch)
            this.$store.dispatch('automaticallyCloseNotification')
            this.$store.dispatch('anableNotificationAfterAutomaticallyClosed')
        }, 

        showMoreDetails(watchId) {
            watchesService.showMoreDetails(watchId)
        },

        hideMoreDetails(watchId) {
            watchesService.hideMoreDetails(watchId)
        },

        handleImage(image, watchId) {
            watchesService.showImage(image, watchId)
        },

        handleFullscreen() {
            alert('handleFullscreen')
        },



        // priceApp( num ) {
        //  var num = 1234567.890123,
            // result = Number(num.toFixed(0)).toLocaleString().split(/\s/).join(',') + '.' + Number(num.toString().slice(num.toString().indexOf('.')+1)).toLocaleString()
            //will equal to 1,234,567.890 123
        // }

        
    }
}
</script>