<template>
    <div class="all-watches-wrapper">
        <div class="all-watches">
            <div class="labels">
                <div class="empty-div"><p></p></div>
                <div class="image segment">
                    <p>Image</p>
                </div>
                <div class="brand segment">
                    <p>Brand</p>
                </div>
                <div class="scu segment">
                    <p>Item No.</p>
                </div>
                <div class="price segment">
                    <p>Listing</p>
                </div>
                <div class="sale-price segment">
                    <p>Wholesale</p>
                </div>
                <div class="quantity segment">
                    <p>QTY</p>
                </div>
                <div class="empty-div"></div>
            </div>
            <div class="watches-list">
                <ul v-for="(watch, index) in watches" :key="index">
                    <li :class="watch.moreDetails ? 'selected-watch' : 'watch'">
                        <SingleWatch :watch="watch"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import SingleWatch from './SingleWatch'
export default {
    components: {
        SingleWatch
    },

    computed: {
        watches() {
            return this.$store.getters.fillteredWatchesStore
        },
        term() {
            return this.$store.state.term
        }
    }
}
</script>