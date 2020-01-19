<template>
    <div class="all-watches-wrapper">
        <div class="all-watches">
            <div class="labels">
                <p></p>
                <p>Image</p>
                <p>Brand</p>
                <p>Item No.</p>
                <p>Listing</p>
                <p>Wholesale</p>
                <p>QTY</p>
                <p></p>
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