<template>
  <div id="app">
    <HelloWorldVue key="1"></HelloWorldVue>
  </div>
</template>

<script>
  import HelloWorldVue from './components/HelloWorld.vue';
  export default {
    name: 'App',
    components: {
      HelloWorldVue,
    },
    data() {
      return {};
    },
    methods: {
      init() {},
    },
    mounted() {
      this.init();
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
  }
</style>
