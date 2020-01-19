import Vue from 'vue';
import Vuex from 'vuex';

import {watchesService} from './services/WatchesService.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        watches: watchesService.getAll(), 
        cart: [], 
        term:'', 
        totalAmount: 0, 
        totalItems: 0
    }, 
    getters: {
        fillteredWatchesStore(state) {
            return state.watches.filter(watch => (
                watch.title.toLowerCase().includes(state.term.toLowerCase()) ||
                watch.sku.toLowerCase().includes(state.term.toLowerCase())
            ))
        }, 
        totalInCartStore(state) {
            return state.cart
        }, 
        searchTermStore(state) {
            return state.term
        },
        totalAmountOrdered(state) {
            return state.totalAmount
        },
        totalItemsOrdered(state) {
            return state.totalItems
        }
    }, 
    mutations: {
        searchTermMutation(state, termFromComponent) {
            return state.term = termFromComponent
        }, 
        watchInCartMutation(state, watchFromComponent) {
            return state.cart.push(watchFromComponent)
        },
        removeWatchFromCartMutation(state, watchFromComponent) {
            let index = state.cart.indexOf(watchFromComponent);
            return state.cart.splice(index, 1);
        },
        totalItemsInCartMutation(state, watchFromComponent) {
            return state.totalItems += watchFromComponent.orderQuantity
        },
        totalAmountOrderedMutation(state, watchFromComponent) {
            return state.totalAmount += watchFromComponent.totalAmountOrdered
        }, 
        incrementTotalItems(state) {
            return state.totalItems++
        },
        decrementTotalItems(state) {
            return state.totalItems--
        },
        increaseTotalAmount(state, watchFromComponent) {
            return state.totalAmount += watchFromComponent.salePrice
        },
        decreaseTotalAmount(state, watchFromComponent) {
            return state.totalAmount -= watchFromComponent.salePrice
        }
    }
});