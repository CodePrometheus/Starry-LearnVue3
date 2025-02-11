<template>
  <c-layout>

    <c-header>
      <c-launch />
      <c-box-skin type='bottom'>
        <c-columns>
          <router-link to='/mall/category'>
            <c-svg-button
              size='30'
              :colors="['#c0c0c0']"
              ml30
              mr20
            />
          </router-link>
          <c-search
            class='search'
            @click='isShow = !isShow'
            placeholder='搜索商品'
            mt15 mb15 mr20
            radius4
          />
          <c-svg-more
            size='24'
            :colors="['#c0c0c0', '#fff', '#c0c0c0']"
          />
        </c-columns>
      </c-box-skin>
    </c-header>

    <c-content>

      <!-- 轮播图 -->
      <c-swipe class='swipe'>
        <c-swipe-item
          v-for='(item, index) in swipeList'
          :key='index'>
          <router-link :to="item['url']">
            <img class='swipe__img' :src="item['image']" />
          </router-link>
        </c-swipe-item>
      </c-swipe>

      <!-- 导航栏 -->
      <c-box-skin>
        <c-row
          class='nav'
          pb6
        >
          <c-col
            v-for='(v, idx) in categoryList'
            :key='idx'
            span='4-8'
          >
            <c-avatar
              class='nav__item'
              @click="goGoods(v['id'], v['title'])"
              direction='vertical'
              :url="v['image']"
              :text="v['title']"
              pv10
            />
          </c-col>
        </c-row>
      </c-box-skin>

      <!-- 商品列表 -->
      <c-row
        class='good'
        gutter='6'
        pa12
      >
        <c-col span='12'>
          <router-link
            v-for="(item, index) in brandList[0]['list']"
            :key='index'
            :to="{path:'/mall/brand-video', query: { id: item['id'] }}">
            <c-box-skin
              class='good__item'
              mb12
              radius4>
              <img
                class='good__img'
                :src="item['image']" />
              <div
                class='good__box'
                pv24 ph12
              >
                <p
                  class='good__des'
                  mb10
                >
                  {{ item['des'] }}
                </p>
                <c-avatar
                  class='good__avatar'
                  :url="item['avatarImage']"
                  :text="item['avatarDes']"
                />
              </div>
            </c-box-skin>
          </router-link>
        </c-col>
        <c-col span='12'>
          <router-link
            v-for="(item, index) in brandList[1]['list']"
            :key='index'
            :to="{path:'/mall/brand-video', query: { id: item['id'] }}">
            <c-box-skin
              class='good__item'
              mb12
              radius4>
              <img
                class='good__img'
                :src="item['image']" />
              <div
                class='good__box'
                pv24 ph12
              >
                <p
                  class='good__des'
                  mb10
                >
                  {{ item['des'] }}
                </p>
                <c-avatar
                  class='good__avatar'
                  :url="item['avatarImage']"
                  :text="item['avatarDes']"
                />
              </div>
            </c-box-skin>
          </router-link>
        </c-col>
      </c-row>

      <!-- category -->
      <c-category v-model:isShow='isShow' />

      <!-- 快捷导航 -->
      <c-fast-menu />

    </c-content>

    <c-footer>
      <c-foot-nav
        class='footer'
        :list='list'
      />
    </c-footer>

  </c-layout>
</template>

<script>
import CAvatar from '@/components/avatar'
import { Swipe, SwipeItem } from '@/components/swipe'
import { useRouter } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { getBanners, getBrandVideos, getRecommendCategory } from '@/api/mall'


export default {
  components: {
    CAvatar,
    CSwipe: Swipe,
    CSwipeItem: SwipeItem
  },
  setup () {
    const list = [
      {
        path: '/mall/home',
        text: '首页',
        active: true
      }, {
        path: '/mall/store',
        text: '商城'
      }, {
        path: '/live/home',
        text: '直播'
      }, {
        path: '/user/about',
        text: '我'
      }
    ]

    const router = useRouter()
    const data = reactive({
        isShow: false,
        categoryList: [],
        swipeList: [],
        brandList: [
          { list: [] },
          { list: [] }
        ]
      }
    )

    const goGoods = (id, title) => {
      router.push({ path: '/mall/goods', query: { id: id, des: title } })
    }

    onMounted(() => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })

      getRecommendCategory().then((res) => {
        data.categoryList = res.data
      })

      getBanners().then((res) => {
        data.swipeList = res.data
      })

      getBrandVideos().then((res) => {
        data.brandList = res.data
      })
    })

    return {
      list,
      ...toRefs(data),
      goGoods
    }
  }

}
</script>

<style lang='scss' scoped>
@include b(search) {
  @include dimensions(600px, 60px);
  @include t-shadow;
  & ::v-deep(svg) {
    margin-left: 20px;
    margin-right: 10px;
  }
}

@include b(swipe) {
  @include e(img) {
    @include dimensions(100%, auto);
  }
}

@include b(nav) {
  & ::v-deep(.van-col--4-8) {
    width: 20%;
  }
  @include e(item) {
    & ::v-deep(img) {
      padding-bottom: 10px;
      @include dimensions(100px);
    }
  }
}

@include b(good) {
  @include e(item) {
    overflow: hidden;
  }
  @include e(des) {
    @include box-clamp(2);
  }
  @include e(avatar) {
    max-width: 348px;
    & ::v-deep(img) {
      @include dimensions(50px);
      padding-right: 10px;
    }
    & ::v-deep(span) {
      font-weight: 700;
    }
  }
}

@include b(footer) {
  height: 100px;
  font-size: 32px;
  display: flow-root;
}
</style>
