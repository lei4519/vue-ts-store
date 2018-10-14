<template>
    <div>
        <nav-header></nav-header>
        <nav-bread><span slot="bread">Goods</span></nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price">Price
                        <svg class="icon icon-arrow-short">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a href="javascript:void(0)">All</a></dd>
                            <dd v-for="item in priceFilter" :key="item.startPrice">
                                <a href="javascript:void(0)">{{ item.startPrice | priceFormat }} - {{ item.endPrice | priceFormat }}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item in goodsList.result" :key="item.productId">
                                    <div class="pic">
                                        <a href="javascripr:;"><img :src="`/images/${item.prodcutImg}`" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{ item.productName }}</div>
                                        <div class="price">{{ item.prodcutPrice }}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script lang="ts">
  import { Component, Provide, Vue } from 'vue-property-decorator'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'

  @Component({
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    filters: {
      priceFormat(value: string): string {
        return value.split('.')[0]
      }
    }
  })
  export default class GoodsList extends Vue {
    @Provide() public goodsList: object = {}
    @Provide() public priceFilter: object[] = [
      {
        startPrice: '0.00',
        endPrice: '100.00'
      },
      {
        startPrice: '100.00',
        endPrice: '500.00'
      },
      {
        startPrice: '500.00',
        endPrice: '1000.00'
      },
      {
        startPrice: '1000.00',
        endPrice: '2000.00'
      },
    ]

    public async created() {
      this.goodsList = (await this.axios.get('/api/goods')).data
    }
  }
</script>
