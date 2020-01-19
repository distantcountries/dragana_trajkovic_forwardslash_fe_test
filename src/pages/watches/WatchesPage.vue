<template>
    <div class="watches-page">
        <CartModal />
        <AllWatches/>
    </div>
</template>

<script>
import CartModal from './../../modals/CartModal'
import AllWatches from './AllWatches'
export default {
    components: {
        CartModal,
        AllWatches
    }
}
</script>