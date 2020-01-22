<template>
  <div id="app">
    <Header />
    <SearchBar />
    <AllWatches/>
    <Footer />
  </div>
</template>

<script>
import Header from './template/Header'
import SearchBar from './template/SearchBar'
import AllWatches from './pages/watches/AllWatches'
import Footer from './template/Footer'

export default {
  name: 'app',
  components: {
    Header, 
    SearchBar,
    AllWatches,
    Footer
  }
}
</script>

