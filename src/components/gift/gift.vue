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
  <section class="detail-wrappper" v-show="detailshow">
    <header class="detail-head">
      <span @click="hidedetail()">back</span>
      {{daystr}}
    </header>
    <div class="detail-loading-gif" v-show="isLoadingGif" transition="gif">
      <img src="timg.gif"></img>
    </div>
    <div class="detail-content-wrapper" v-show="isLoading" transition="content" v-el:detail-wrap>
      <div class="detail-content">
        <h4>{{detailcontent.title}}</h4>
        <div class="detail-text" v-el:detail-text>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  // 引用滑屏组件
	import iScroll from 'better-scroll';
  import detailhead from './../detailhead/detailhead.vue';
  const ERROR = false;

  export default {
    props: {

    },
    data() {
      return {
        detailshow: false,
        imgnumber: 0,
        num: 0,
        page: 1,
        imgData: [],
        list1: [],
        list2: [],
        onoff: true,
        msgday: [],
        daystr: null,
        detailcontent: null,
        isLoading: false,
        isLoadingGif: true
      };
    },
    watch: {
      daystr(val,oldVal) {
        // props 异步加载,使用watch监听数据变化
        this.detailshow = true;
      }
    },
    methods: {
      hidedetail() {
        this.detailshow = false;
      },
      imgOnload() {
        this.imgnumber ++;
        if(this.imgnumber === this.num) {
          this.onoff = true;
          this.scroll.refresh();
        }
      },
      getDetail(index,list) {
        this.isLoading = false;
        this.isLoadingGif = true;
        // 显示详细页
        let date = list[index]['publishedAt'].split('T')[0];
        this.msgday[0] = date.split('-')[0];
        this.msgday[1] = date.split('-')[1];
        this.msgday[2] = date.split('-')[2];
        this.daystr = this.msgday.join('');
        this.$http.get('http://gank.io/api/history/content/day/'+ this.msgday[0] +'/'+ this.msgday[1] +'/'+ this.msgday[2]).then(
          function(res) {
            res = res.body;
            if(res.error === ERROR) {
              let then = this;
              this.detailcontent = res.results[0];
              this.$els.detailText.innerHTML = this.detailcontent.content;
              let imgitems = this.$els.detailText.getElementsByTagName('img')[0];
              imgitems.onload = function() {
                then.isLoading = true;
                then.isLoadingGif = false;
                then.$nextTick(function(){
                  if(!then.detailScroll) {
                    then.detailScroll = new iScroll(then.$els.detailWrap,{});
                  }else {
                    then.detailScroll.refresh();
                  }
                });
              };
            }
          }
        );
      },
      getNextContent() {
        this.page++;
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
        if(this.onoff == true && maxHeight <= this.Y ) {
          // 避免重复加载
          this.onoff = false;
          this.num += 10;
          this.page ++;
          console.log(this.page);
          this.$http.get('http://gank.io/api/data/福利/10/' + this.page).then(
            function(res) {
              res = res.body;
              if(res.error === ERROR) {
                Array.prototype.push.apply(this.imgData,res.results);
                for(let i=this.num-10; i<this.num; i++) {
                  if(i%2==0) {
                    this.list1.push(this.imgData[i]);
                  }else {
                    this.list2.push(this.imgData[i]);
                  }
                }
              }
            }
          );
        }
      }
    },
    components: {
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
                // 滚动距离
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
  .detail-wrappper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    .detail-head {
      position: relative;
      width: 100%;
      height: 50px;
      background-color: yellow;
      font-size: 22px;
      font-weight: bold;
      line-height: 50px;
      text-align: center;
      text-spacing: 2px;
      span {
        position: absolute;
        left: 0;
        top: 0;
        width: 70px;
        height: 50px;
        text-align: left;
        text-indent: 10px;
        font-weight: bold;
        font-size: 16px;
        line-height: 50px;
      }
    }
    .detail-loading-gif {
      position: relative;
      position: absolute;
      left: 0;
      top: 50px;
      bottom: 0;
      width: 100%;
      background: #36c3e5;
      overflow: hidden;
      transition: all 0.5s;
      &.gif-transition {
        opacity: 1;
        img {
          opacity: 1;
        }
      }
      &.gif-enter {
        opacity: 0;
        img {
          opacity: 0;
        }
      }
      &.gif-leave {
        opacity: 0;
        img {
          opacity: 0;
        }
      }
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -100px;
        width: 200px;
        transition: all 0.5s;
      }
    }
    .detail-content-wrapper {
      position: absolute;
      left: 0;
      top: 50px;
      bottom: 0;
      width: 100%;
      background: #fff;
      overflow: hidden;
      .detail-content {
        h4 {
          width: 100%;
          height: 40px;
          font-size: 14px;
          font-weight: 600;
          line-height: 40px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-index: 10px;
        }
        .detail-text {
         img {
           width: 100%;
         }
         h3 {
          font-size: 20px;
          line-height: 30px;
          font-weight: 600;
          text-align: center;
         }
        }
      }  
    }
  }
</style>
