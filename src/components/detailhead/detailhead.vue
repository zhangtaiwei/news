<template>
  <section class="detailhead-wrapper">
    <header>
      <span>back</span>
      {{daystr}}
      {{msgday[0]}}
    </header>
    <div class="detailhead-content">
      
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      daystr: {
        type: String
      },
      msgday: {
        type: Array
      }
    },
    data() {
     return {

     };
    },
    methods: {

    },
    components: {

    },
    ready() {
      // 每日数据： http://gank.io/api/day/年/月/日
      // http://gank.io/api/day/2015/08/06
      this.$http.get('http://gank.io/api/day/'+ this.msgday[0] +'/'+ this.msgday[1] +'/'+ this.msgday[2]).then(
        function(res) {
          res = res.body;

        }
      ); 
    }
  };
</script>

<style>
</style>