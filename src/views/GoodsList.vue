<template>
  <div>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a
            href="javascript:void(0)"
            :class="['default', {cur: salePriceSort}]"
            @click="salePriceSort = !salePriceSort"
          >Default</a>
          <a
            href="javascript:void(0)"
            :class="['pricel', {cur: !salePriceSort}]"
            @click="salePriceSort = !salePriceSort"
          >
            Price
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
              <dd>
                <a
                  href="javascript:void(0)"
                  @click="setPriceFilter('all')"
                  :class="{'cur': priceChecked === 'all'}"
                >All</a>
              </dd>
              <dd v-for="(item, i) in priceFilter" :key="item.startPrice">
                <a
                  href="javascript:void(0)"
                  @click="setPriceFilter(`${i}`)"
                  :class="{'cur': priceChecked === i.toString()}"
                >
                  {{ item.startPrice }} - {{
                  item.endPrice }}
                </a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList" :key="item._id">
                  <div class="pic">
                    <a href="javascripr:;">
                      <img v-lazy="`/images/${item.productImage}`">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{ item.productName }}</div>
                    <div class="price">{{ item.salePrice }}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="addCart(item.productId)"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="10"
                style="text-align: center;
                                        font-size: 20px;
                                        font-weight: 700;"
              >
                <img v-show="isMore" src="loading/loading-spinning-bubbles.svg">
                <p v-show="!isMore">已经没有数据了</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <modal :mdShow="mdShow" @closeModal="closeModal">
      <p slot="message">请先登录, 否则无法加入到购物车</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal :mdShow="mdShowCart" @closeModal="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功</span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShowCart=false">继续购物</a>
        <router-link to="/cart" class="btn btn--m">查看购物车</router-link>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import { Getter, Mutation } from "vuex-class";
@Component({
  components: {
    Modal
  }
})
export default class GoodsList extends Vue {
  public goodsList = [];
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
  ];
  public priceChecked: string = "all";
  public filterBy: boolean = false;
  public overLayFlag: boolean = false;
  public salePriceSort: boolean = true;
  public page: number = 1;
  public pageSize: number = 8;
  public busy: boolean = false;
  public isMore: boolean = true;
  public mdShow: boolean = false;
  public mdShowCart: boolean = false;

  public setPriceFilter(index: string): void {
    this.priceChecked = index;
    this.closePop();
    this.goodsListReset();
    this.getGoodsList();
  }
  public async getCartList() {
    const { data } = await this.axios.get("/users/cartList");
    if (data.status === "0") {
      this.setCartList(data.result);
    }
  }
  public showFilterPop(): void {
    this.filterBy = true;
    this.overLayFlag = true;
  }

  public closePop(): void {
    this.filterBy = false;
    this.overLayFlag = false;
  }

  public async created() {
    this.$store.commit("changeBreadText", "Goods");
    this.getGoodsList();
    this.getCartList();
  }

  @Watch("salePriceSort")
  public onSortChanged(val: string, oldVal: string): void {
    this.goodsListReset();
    this.getGoodsList();
  }

  public async getGoodsList() {
    this.busy = true;
    const params = {
      page: this.page,
      pageSize: this.pageSize,
      sort: this.salePriceSort ? 1 : -1,
      $gte: 0,
      $lte: 0
    };
    if (this.priceChecked !== "all") {
      const filter = this.priceFilter[parseInt(this.priceChecked, 10)];
      params.$gte = filter.startPrice;
      params.$lte = filter.endPrice;
    } else {
      params.$gte = 0;
      params.$lte = 0;
    }
    const data = (await this.axios.get("/goods/goodsList", {
      params
    })).data;

    if (data.status === "0") {
      this.goodsList = this.goodsList.concat(data.result.list);
      this.busy = data.result.count < this.pageSize;
      this.isMore = !this.busy;
    } else {
      this.isMore = false;
    }
  }

  public loadMore(): void {
    setTimeout(() => {
      this.page++;
      this.getGoodsList();
    }, 1000);
  }

  public goodsListReset() {
    this.page = 1;
    this.goodsList = [];
  }

  public closeModal(): void {
    this.mdShow = false;
    this.mdShowCart = false;
  }

  public async addCart(productId: string) {
    const data = (await this.axios.post("/goods/addCart", {
      productId
    })).data;
    if (data.status === "0") {
      this.mdShowCart = true;
      this.setCartList(data.result.cartList);
    } else {
      this.mdShow = true;
    }
  }
  setCartList(list: any) {
    return this.$store.commit("setCartList", list);
  }
}
</script>
