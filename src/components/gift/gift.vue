<template>
  <section class="gift-wrapper" v-el:gift>
    <div class="gift-content" v-el:gift-content>
      <ul class="gift-list1" v-el:gift-list1>
        <li v-for="list1item in list1">
          <img :src="list1item.url" @click='getDetail($index,list1)' @load='imgOnload()'>
        </li>
      </ul>
      <ul class="gift-list2" v-el:gift-list2>
        <li v-for="list2item in list2">
          <img :src="list2item.url" @click='getDetail($index,list2)'  @load='imgOnload()'>
        </li>
      </ul>
    </div>
  </section>
  <section class="detail-wrappper">
    <newsdetail></newsdetail>
  </section>
</template>

<script>
  // 引用滑屏组件
	import iScroll from 'better-scroll';
  // 引用详情页组件
  import detail from './../detail/detail.vue';

  const ERROR = false;

  export default {
    props: {

    },
    data() {
      return {
        imgnumber: 0,
        num: 0,
        page: 1,
        imgData: [],
        list1: [],
        list2: [],
        onoff: true
      };
    },
    methods: {
      imgOnload() {
        this.imgnumber ++;
        console.log(this.imgnumber);
        if(this.imgnumber === this.num) {
          this.onoff = true;
        }
      },
      getDetail(index) {
       
      },
      getNextContent() {
        this.page++;
        console.log(this.page);
        this.$http.get('http://gank.io/api/data/福利/10/' + this.page).then(
          function(res) {
             res = res.body;
             if(res.error === ERROR) {
               Array.prototype.push.apply(this.imgData,res.results);
               for(let i=this.num; i<10 + this.num; i++) {
                 if(i%2==0) {
                   this.list1.push(this.imgData[i]);
                 }else {
                   this.list2.push(this.imgData[i]);
                 }
               }
               this.num += 10;
               this.$nextTick(function() {  
                 this.scroll.refresh();
               });
             }
          }
        );
      },
      getNextPage(Y) {
        // 视口高度
        let viewHeight = document.documentElement.clientHeight - 42;
        // 内容高度
        let fatherHeight = this.$els.giftContent.offsetHeight;
        // 最大滚动距离
        let maxHeight = fatherHeight - viewHeight;
        // 滚动超出边界,并且开关为true
        if( maxHeight <= Y && this.onoff === true && this.imgnumber === this.num) {
          console.log(1);
          console.log(1);
          // 问题所在？图片的高度没有加载出来，会重复加载，maxHeight 会有问题
          // this.onoff === false;
          // this.getNextContent();
        }
      }
    },
    components: {
      newsdetail: detail
    },
    ready: function() {
      // API接口 分类数据: http://gank.io/api/data/数据类型/请求个数/第几页
      // 数据类型： 福利 | Android | iOS | 休息视频 | 拓展资源 | 前端 | all
      // 请求个数： 数字，大于0
      // 第几页：数字，大于0
      this.$http.get('http://gank.io/api/data/福利/10/' + this.page).then(
        function(res) {
          let _this = this;
          res = res.body;
          if(res.error === ERROR ) {
            Array.prototype.push.apply(this.imgData,res.results);
            // 数据的具体字段
            // console.log(this.imgData);
            for(let i=this.num; i<10; i++) {
              if(i%2==0) {
                this.list1.push(this.imgData[i]);
              }else {
                this.list2.push(this.imgData[i]);
              }
            }
            this.num += 10;
            this.$nextTick(function() {              
              this.scroll = new iScroll(this.$els.gift,{
                click: true,
                probeType: 3,
                HWCompositing: true
              });
              this.scroll.on('scroll',function(pos){
                _this.Y = Math.abs(Math.round(pos.y));
                _this.getNextPage(_this.Y);
              }); 
            });
          };          
        }
      );
    },
    computed: {
    }
  };
</script>

<style lang="scss" type="stylesheet">
  .gift-wrapper {
    position: absolute;
    left: 0;
    top: 42px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .gift-content {
      width: 100%;
      overflow: hidden;
      list-style: none;
      ul {
        float: left;
        width: 50%;
        padding: 8px;
        box-sizing: border-box;
        li {
          width: 100%;
          border: 1px solid pink;
          padding: 4px;
          box-sizing: border-box;
          margin-bottom: 5px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
