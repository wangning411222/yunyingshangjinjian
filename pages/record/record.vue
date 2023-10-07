<template>
  <view>
    <view class="tabs-box">
      <u-tabs
        :list="list"
        :is-scroll="false"
        :current="current"
        @change="change"
      ></u-tabs>
    </view>
    <view class="list">
      <view class="item" v-for="(item, index) in filterDataList" :key="index">
        <view class="item-head">
          <text>申请编号:{{ item.out_request_no }}</text>
          <text class="priem">{{ applymentState(item.applyment_state) }}</text>
        </view>
        <view class="item-content">
          <text>主体类型:{{ organizationType(item.organization_type) }}</text>
          <text>商户名称:{{ item.merchant_shortname }}</text>
          <text>法人姓名:{{ item.id_card_info_fmt.id_card_name }}</text>
          <text>提交时间:{{ item.update_date_fmt }}</text>
          <text v-if="item.applyment_state == 'REJECTED'"
            >驳回原因:{{ item.audit_detail["reject_reason"] }}</text
          >
          <view class="qianyue" v-if="item.organization_type == 'NEED_SIGN'"
            ><text>扫码签约:</text
            ><img
              @click="
                priview(item.sign_qrcode)"
              :src="item.sign_qrcode"
              mode=""
          /></view>
        </view>
        <view class="item-bottom">
          <u-button
          type="primary"
            v-if="item.is_post_wx == '0' || item.applyment_state == 'REJECTED'"
            @click="toDetail(item.out_request_no)"
            shape="square"
            >修改</u-button
          >
          <u-button
          type="primary"
            v-if="item.is_post_wx == '0'"
            @click="commitWx(item.out_request_no)"
            shape="square"
            >提交微信</u-button
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { post, get } from "../../tools/utils.js";
export default {
  data() {
    return {
      list: [
        {
          name: "全部",
        },
        {
          name: "进行中",
        },
        {
          name: "待签约",
        },
        {
          name: "已驳回",
        },
        {
          name: "已完成",
        },
        {
          name: "已作废",
        },
      ],
      dataList: [],
      current: 0,
    };
  },
  onLoad() {
    this.getList();
  },
  computed: {
    filterDataList() {
      let arr = [];
      switch (this.current) {
        // 全部
        case 0:
          arr = this.dataList;
          break;

        case 1:
          // 进行中
          arr = this.dataList.filter((item) => {
            return (
              item.applyment_state == "CHECKING" ||
              item.applyment_state == "AUTHORIZING" ||
              item.applyment_state == "ACCOUNT_NEED_VERIFY" ||
              item.applyment_state == "AUDITING"
            );
          });
          break;
        // 待签约
        case 2:
          arr = this.dataList.filter((item) => {
            return item.applyment_state == "NEED_SIGN";
          });
          break;
        // 已驳回
        case 3:
          arr = this.dataList.filter((item) => {
            return item.applyment_state == "REJECTED";
          });
          break;
        // 已完成
        case 4:
          arr = this.dataList.filter((item) => {
            return item.applyment_state == "FINISH";
          });
          break;
        // 已删除,已冻结
        case 5:
          arr = this.dataList.filter((item) => {
            return (
              item.applyment_state == "FROZEN" ||
              item.applyment_state == "CANCELED"
            );
          });
          break;
      }
      return arr;
    },
  },
  methods: {
  //提交微信
  commitWx(id){
    get(`merchant-post_wx.htm?out_request_no=${id}`).then(res=>{
      console.log(res,'res````````````````````')
    })
  },
    // 修改
    toDetail(id) {
      uni.reLaunch({
        url: `/pages/index/index?id=${id}`,
      });
    },
    priview(url) {
      uni.previewImage({
        urls: [url],
      });
    },
    applymentState(val) {
      let txt = "";
      switch (val) {
        case "CHECKING":
          txt = "资料校验中";
          break;
        case "AUTHORIZING":
          txt = "待商家授权";
          break;
        case "ACCOUNT_NEED_VERIFY":
          txt = "待账户验证";
          break;
        case "AUDITING":
          txt = "审核中";
          break;
        case "REJECTED":
          txt = "已驳回";
          break;
        case "NEED_SIGN":
          txt = "待签约";
          break;
        case "FINISH":
          txt = "完成";
          break;
        case "FROZEN":
          txt = "已冻结";
          break;
        case "CANCELED":
          txt = "已作废";
          break;
      }
      return txt;
    },
    organizationType(val) {
      let txt = "";
      switch (val) {
        case "2500":
          txt = "个人卖家";
          break;
        case "2401":
          txt = "小微商户";
          break;
        case "4":
          txt = "个体工商户";
          break;
        case "2":
          txt = "企业";
          break;
      }
      return txt;
    },
    change(index) {
      this.current = index;
    },
    getList() {
      post("merchant/list").then((res) => {
        if (res.code == 0) {
          this.dataList = res.message;
        }
      });
    },
  },
};
</script>
<style>
page {
  background: whitesmoke;
}
</style>
<style lang="scss" scoped>
.list {
  padding: 0 10rpx;
  .item {
    margin-top: 15rpx;
    background: #fff;
    .item-head {
      padding: 20rpx 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .priem {
        color: rgb(41, 121, 255);
      }
    }
    .item-content {
      display: flex;
      flex-direction: column;
      padding: 30rpx 0 30rpx 30rpx;
      border-bottom: 1px solid #ccc;
      text {
        padding: 10rpx;
      }
      .qianyue {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        img {
          width: 200rpx;
          height: 200rpx;
        }
      }
    }
    .item-bottom {
      padding: 20rpx 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
