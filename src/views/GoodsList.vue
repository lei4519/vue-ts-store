<template>
    <div>
        <nav-header></nav-header>
        <nav-bread><span slot="bread">Goods</span></nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" :class="['default', {cur: salePriceSort}]"
                       @click="salePriceSort = !salePriceSort">Default</a>
                    <a href="javascript:void(0)" :class="['pricel', {cur: !salePriceSort}]"
                       @click="salePriceSort = !salePriceSort">Price
                        <svg class="icon icon-arrow-short">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" @click="showFilterPop" class="filterby stopPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div :class="['filter', 'stopPop', {'filterby-show': filterBy}]" id="filter">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a href="javascript:void(0)" @click="setPriceFilter('all')"
                                   :class="{'cur': priceChecked === 'all'}">All</a></dd>
                            <dd v-for="(item, i) in priceFilter" :key="item.startPrice">
                                <a href="javascript:void(0)" @click="setPriceFilter(`${i}`)"
                                   :class="{'cur': priceChecked === i.toString()}">{{ item.startPrice }} - {{
                                    item.endPrice }}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item in goodsList" :key="item._id">
                                    <div class="pic">
                                        <a href="javascripr:;"><img v-lazy="`/images/${item.productImage}`"></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{ item.productName }}</div>
                                        <div class="price">{{ item.salePrice }}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-infinite-scroll="loadMore"
                                 infinite-scroll-disabled="busy"
                                 infinite-scroll-distance="10"
                                 style="text-align: center;
                                        font-size: 20px;
                                        font-weight: 700;">
                                {{ isMore ? '加载中...' : '已经没有数据了' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <nav-footer></nav-footer>
    </div>
</template>

<script lang="ts">
  import { Component, Provide, Watch, Vue } from 'vue-property-decorator'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'

  @Component({
    components: {
      NavHeader,
      NavFooter,
      NavBread
    }
  })
  export default class GoodsList extends Vue {
    @Provide()
    public goodsList = []
    @Provide()
    public priceFilter = [
      {
        startPrice: 0,
        endPrice: 100
      },
      {
        startPrice: 100,
        endPrice: 500
      },
      {
        startPrice: 500,
        endPrice: 1000
      },
      {
        startPrice: 1000,
        endPrice: 2000
      }
    ]
    @Provide()
    public priceChecked: string = 'all'
    public filterBy: boolean = false
    public overLayFlag: boolean = false
    public salePriceSort: boolean = true
    public page: number = 1
    public pageSize: number = 8
    public busy: boolean = false
    public isMore: boolean = true

    public setPriceFilter(index: string): void {
      this.priceChecked = index
      this.closePop()
      this.goodsListReset()
      this.getGoodsList()
    }

    public showFilterPop(): void {
      this.filterBy = true
      this.overLayFlag = true
    }

    public closePop(): void {
      this.filterBy = false
      this.overLayFlag = false
    }

    public async created() {
      this.getGoodsList()
    }

    @Watch('salePriceSort')
    public onSortChanged(val: string, oldVal: string): void {
      this.goodsListReset()
      this.getGoodsList()
    }

    public async getGoodsList() {
      this.busy = true
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.salePriceSort ? 1 : -1,
        $gte: 0,
        $lte: 0
      }
      if (this.priceChecked !== 'all') {
        const filter = this.priceFilter[parseInt(this.priceChecked, 10)]
        params.$gte = filter.startPrice
        params.$lte = filter.endPrice
      } else {
        params.$gte = 0
        params.$lte = 0
      }
      const result = (await this.axios.get('/goods', {
        params
      })).data.result

      this.goodsList = this.goodsList.concat(result.list)
      this.busy = result.count < this.pageSize
      this.isMore = !this.busy
    }

    public loadMore(): void {
      setTimeout(() => {
        this.page++
        this.getGoodsList()
      }, 1000)
    }
    public goodsListReset() {
      this.page = 1
      this.goodsList = []
    }
  }
</script>
