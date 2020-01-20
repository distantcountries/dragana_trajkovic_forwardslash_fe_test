<template>
  <div id="app">
    <Header />
    <SearchBar />
    <WatchesPage />
    <Footer />
  </div>
</template>

<script>
import Header from './template/Header'
import SearchBar from './template/SearchBar'
import WatchesPage from './pages/watches/WatchesPage'
import Footer from './template/Footer'

export default {
  name: 'app',
  components: {
    Header, 
    WatchesPage,
    Footer,
    SearchBar
  }
}
</script>

