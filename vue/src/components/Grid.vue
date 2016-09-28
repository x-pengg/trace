<template>
  <div @dblclick="shuffle" id="grid">
    <waterfall :line="h" :line-gap="320" :min-line-gap="280" :max-line-gap="420" :watch="items">
      <waterfall-slot v-for="item in items" :width="item.width" :height="item.height" :order="$index" move-class="item-move" transition="wf">
        <div class="item" :style="item.style" @mouseOver="mouseOver($index)">
          <div class="item-bar" v-show="itemIndex == $index">
            <p class="item-text">{{item.photo.moment | moment}}</p>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
  </div>
  <div v-show="loading" class="loading">加載中</div>
  <div v-if="more" class="more-box">
    <button class="load-more" @click="getPhotos">加載之前的照片</button>
  </div>
  <div v-if="end" class="loading">終</div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

  import { getPhotos } from '../vuex/getters'

  export default{
    data() {
      return{
        pagination: {},
        items: [],
        loading: true,
        more: false,
        end: false,
        itemIndex: -1
      }
    },
    components: {
      Waterfall,
      WaterfallSlot
    },
    vuex: {
      getters: {
        getPhotos
      }
    },
    methods: {
      shuffle() {
        this.items.sort(function () {
          return Math.random() - 0.5
        });
      },
      mouseOver: function(index){
        this.itemIndex = index;
      },
      getPhotos() {
          const photos = getPhotos;
          for(let i = 0; i<photos.length; i++){
            let item = {
              photo: photos[i],
              width: 200 + ~~(Math.random() * 50),
              height: 200 + ~~(Math.random() * 50),
              index: i,
              style: {
                backgroundImage: 'url('+photos[i].photo_url+')',
                backgroundSize: 'cover'
              }
            }
            this.items.push(item);
            this.pagination = getPhotos.pagination;
          }
          this.loading = false;
          this.end = !(this.more = (this.pagination.next !== this.pagination.pages));
      }
    },
    watch(){
        alert(11);
    }
  }
</script>


<style>

  #grid{
    padding-bottom: 4rem;
  }
  /*items*/
  .item {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    font-size: 1.2em;
    color: rgb(0,158,107);
  }
  .item:after {
    content: attr(index);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .item-bar{
    position: absolute;
    bottom: 0.1rem;
  }
  .item-text{
    margin: 0 1rem 1rem;
    text-shadow: 0 0 2px #000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    color: #fff;
    font-size: 16px;
  }
  /* load more button */
  button.load-more{
    max-width: 26rem;
    padding: 1rem 2rem;
    font-weight: 500;
    font-size: 20px;
    background: #000;
    color: #fff;
    margin: 0 auto;
    display: block;
    border: 0;
    outline: 0;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }
  .more-box{
    padding: 1rem 0;
  }
</style>


