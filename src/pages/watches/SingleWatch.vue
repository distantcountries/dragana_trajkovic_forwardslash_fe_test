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
                <h3>{{watch.sku}}</h3>
            </div>
            <div class="price">
                <p>${{watch.price}}</p>
            </div>
            <div class="sale-price">
                <p v-if="watch.salePrice">${{watch.salePrice}}</p>
                <p v-else>${{watch.price}}</p>
            </div>
            <div class="quantity">
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
            <div class="segment"  >
                <div class="gallery-images" v-for="(image, index) in watch.images" :key="index">
                    <div class="img-preview" @click="handleImage(image, watch.id)"><img :src="image.url"/></div>
                </div> 
            </div>
            <div class="color segment">
                <p>Color: {{watch.color}}</p>
            </div>
            <div class="band segment">
                <p>Band: {{watch.band}}</p>
            </div>
            <div class="material segment">
                <p>Case/bezel material: {{watch.material}}</p>
            </div>
            <div class="features segment">
                <p>Features: {{watch.features}}</p>
            </div>
            <div class="fullscreen-button segment">
                <img @click="handleFullscreen" src="img/icons/fullscreen.png"/>
                <span class="tooltip">Fullscreen</span>
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
            this.$store.commit('watchInCartMutation', watch)
            this.$store.commit('totalItemsInCartMutation', watch)
            this.$store.commit('totalAmountOrderedMutation', watch)
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
        }
    }
}
</script>