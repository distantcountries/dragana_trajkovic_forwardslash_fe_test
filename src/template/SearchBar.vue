<template>
    <div class="search-bar-wrapper">
        <div class="search-bar">
            <form @submit.prevent="handleSearch(term)">
                <input 
                    placeholder="Type here to search..."
                    type="text"
                    v-model="term"
                />
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            term:''
        }
    }, 
    methods: {
        handleSearch(term) {
            this.$store.commit('searchTermMutation', term)
        }, 
    }
}
</script>