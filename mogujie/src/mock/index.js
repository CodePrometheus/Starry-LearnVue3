import Mock from "mockjs";
import user from "./user";
import live from "./live";
import promotion from "./promotion";
import mall from "./mall";

Mock.setup({
  timeout: "300-500",
});

// user
Mock.mock("/api/user/login", "post", user.login);
Mock.mock("/api/user/about", "get", user.getUser);

// mall
Mock.mock("/api/mall/category", "get", mall.getCategory);
Mock.mock(/\/api\/mall\/category\/\d*/, "get", mall.getOneCategory);
Mock.mock("/api/mall/banners", "get", mall.getBanners);
Mock.mock("/api/mall/brand-videos", "get", mall.getBrandVideos);
Mock.mock(/\/api\/mall\/brand-videos\/\d*/, "get", mall.getBrandVideosById);
Mock.mock("/api/mall/recommend-category", "get", mall.getRecommendCategory);
Mock.mock("/api/mall/promotions", "get", mall.getPromotions);
Mock.mock("/api/mall/hot-category", "get", mall.getHotCategory);
Mock.mock(/\/api\/mall\/goods\/\d*/, "get", mall.getCategoryGoods);
Mock.mock(/\/api\/mall\/goods-id\/\d*/, "get", mall.getGoodsId);
Mock.mock(/\/api\/mall\/goods-detail\/\d*/, "get", mall.getGoodsDetailById);

// live
Mock.mock("/api/live/lives", "get", live.getLives);
Mock.mock(/\/api\/live\/lives\/\d*/, "get", live.getLivesById);

// promotion 相关
Mock.mock("/api/promotion/hot-goods", "get", promotion.getHotGoods);
Mock.mock(
  /\/api\/promotion\/fastbuy-goods\/.*/,
  "get",
  promotion.getFastBuyGoods
);
Mock.mock(/\/api\/promotion\/goods\/\w*/, "get", promotion.getPromotionGoods);
Mock.mock("/api/promotion/jjyz-goods", "get", promotion.getJjyzGoods);
Mock.mock("/api/promotion/ydftx-goods", "get", promotion.getYdftxGoods);
Mock.mock("/api/promotion/qdpsfx-goods", "get", promotion.getQdpsfxGoods);

export default Mock;
