<template>
  <view class="container">
    <view class="step-box">
      <u-steps :list="numList" :current="stepCurrent"></u-steps>
    </view>
    <view class="form-box">
      <!-- 主体资料 -->
      <view class="step-content" v-show="stepCurrent == 0">
        <u-form :model="mainForm" ref="mainForm" label-width="auto">
          <u-form-item label="主体类型:" prop="organization_type">
            <u-radio-group v-model="mainForm.organization_type">
              <u-radio
                v-for="(item, index) in mainTypeList"
                :key="index"
                :name="item.value"
                :disabled="item.disabled"
              >
                {{ item.name }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item
            prop="business_license_info"
            :required="true"
            label="证件扫描件:"
            v-if="
              mainForm.organization_type == 2 || mainForm.organization_type == 4
            "
          >
            <u-upload
              key="1"
              action="https://www.maixiaoquan.com/merchant-upload.htm"
              name="file"
              ref="usinessLicenseCopy"
              @on-success="businessLicenseCopy"
              multiple
              :auto-upload="true"
              accept="media"
              maxCount="1"
            ></u-upload>
          </u-form-item>
          <!-- <u-form-item label="提交微信:">
            <u-radio-group v-model="mainForm.is_post_wx">
              <u-radio
                v-for="(item, index) in submitWX"
                :key="index"
                :name="item.value"
                :disabled="item.disabled"
              >
                {{ item.name }}
              </u-radio>
            </u-radio-group>
          </u-form-item> -->
          <u-form-item
            prop="business_license_number"
            :required="true"
            v-if="
              mainForm.organization_type == 2 || mainForm.organization_type == 4
            "
            label="证件注册号:"
            ><u-input v-model="mainForm.business_license_number"
          /></u-form-item>
          <u-form-item
            prop="merchant_name"
            :required="true"
            v-if="
              mainForm.organization_type == 2 || mainForm.organization_type == 4
            "
            label="商户名称:"
            ><u-input v-model="mainForm.merchant_name" type="text"
          /></u-form-item>
          <u-form-item
            prop="legal_person"
            :required="true"
            v-if="
              mainForm.organization_type == 2 || mainForm.organization_type == 4
            "
            label="法人名称:"
            ><u-input v-model="mainForm.legal_person" type="text"
          /></u-form-item>
        </u-form>
        <view>
          <u-button type="primary" @click="stepClick0">下一步</u-button>
        </view>
      </view>
      <!-- 法人资料 -->
      <view class="step-content" v-show="stepCurrent == 1">
        <u-form :model="id_card_info" ref="id_card_info" label-width="auto">
          <u-form-item
            :required="true"
            label="身份证人像面:"
            prop="id_card_copy"
          >
            <u-upload
              key="2"
              action="https://www.maixiaoquan.com/merchant-upload.htm"
              name="file"
              multiple
              @on-success="idCardCopy"
              :auto-upload="true"
              accept="media"
              maxCount="1"
            ></u-upload>
          </u-form-item>
          <u-form-item
            :required="true"
            label="身份证国徽面:"
            prop="id_card_national"
          >
            <u-upload
              key="3"
              action="https://www.maixiaoquan.com/merchant-upload.htm"
              name="file"
              multiple
              @on-success="idCardNational"
              :auto-upload="true"
              accept="media"
              maxCount="1"
            ></u-upload>
          </u-form-item>
          <u-form-item
            :required="true"
            label="身份证居住地址:"
            prop="id_card_address"
            ><u-input v-model="id_card_info.id_card_address" type="text"
          /></u-form-item>
          <u-form-item :required="true" label="身份证姓名:" prop="id_card_name"
            ><u-input v-model="id_card_info.id_card_name" type="text"
          /></u-form-item>
          <u-form-item :required="true" label="身份证号码:"
            ><u-input v-model="id_card_info.id_card_number" type="text"
          /></u-form-item>
          <u-form-item :required="true" label="是否长期:" prop="Type">
            <u-radio-group v-model="id_card_info.Type">
              <u-radio
                v-for="(item, index) in frFormTypeList"
                :key="index"
                :name="item.name"
                :disabled="item.disabled"
              >
                {{ item.name }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item
            :required="true"
            label="身份证开始日期:"
            prop="id_card_valid_time_begin"
          >
            <u-input
              v-model="id_card_info.id_card_valid_time_begin"
              type="select"
              @click="DateHandler(1)"
            />
          </u-form-item>
          <u-form-item
            :required="true"
            label="身份证结束日期:"
            prop="id_card_valid_time"
          >
            <u-input
              v-model="id_card_info.id_card_valid_time"
              type="select"
              @click="DateHandler(2)"
            />
          </u-form-item>
        </u-form>
        <view class="btn-box">
          <u-button @click="stepClick2t">上一步</u-button>
          <u-button type="primary" @click="stepClick2b">下一步</u-button>
        </view>
      </view>
      <!-- 银行账户 -->
      <view class="step-content" v-show="stepCurrent == 2">
        <u-form :model="yhForm" ref="yhForm" label-width="auto">
          <view class="divi-box">
            <u-divider>账户信息</u-divider>
            <u-form-item
              :required="true"
              label="账户类型:"
              prop="bank_account_type"
            >
              <u-radio-group v-model="yhForm.bank_account_type">
                <u-radio
                  v-for="(item, index) in zhTypeList"
                  :key="index"
                  :name="item.value"
                  :disabled="item.disabled"
                >
                  {{ item.name }}
                </u-radio>
              </u-radio-group>
            </u-form-item>
            <u-form-item :required="true" label="开户银行:" prop="account_bank">
              <u-input
                v-model="yhForm.account_bank"
                type="select"
                @click="accountBankHandler"
              />
            </u-form-item>
            <u-form-item
              :required="true"
              label="开户银行所在地:"
              prop="bank_address_name"
              ><u-input
                v-model="yhForm.bank_address_name"
                type="select"
                @click="bankAdressHandler"
            /></u-form-item>
            <u-form-item
              :required="true"
              label="银行账号:"
              prop="account_number"
              ><u-input v-model="yhForm.account_number" type="text"
            /></u-form-item>
          </view>

          <view class="divi-box">
            <u-divider>店铺信息</u-divider>
            <u-form-item :required="true" label="店铺名称:" prop="store_name"
              ><u-input v-model="yhForm.store_name"
            /></u-form-item>
            <u-form-item
              :required="true"
              label="店铺二维码:"
              prop="store_qr_code"
              ><u-upload
                key="4"
                action="https://www.maixiaoquan.com/merchant-upload.htm"
                name="file"
                multiple
                @on-success="storeQrCode"
                :auto-upload="true"
                accept="media"
                maxCount="1"
              ></u-upload
            ></u-form-item>
            <u-form-item
              :required="true"
              label="商户简称:"
              prop="merchant_shortname"
              ><u-input v-model="yhForm.merchant_shortname"
            /></u-form-item>
          </view>
          <view class="divi-box">
            <u-divider>超级管理员</u-divider>
            <u-form-item :required="true" label="超级管理员手机:"
              ><u-input v-model="yhForm.mobile_phone"
            /></u-form-item>
            <u-form-item :required="true" label="超级管理员邮箱:"
              ><u-input v-model="yhForm.contact_email"
            /></u-form-item>
          </view>
        </u-form>
        <view class="btn-box">
          <u-button @click="stepClick3t">上一步</u-button>
          <u-button v-if="type=='add'" type="primary" @click="submit"
            >提交</u-button
          >
          <u-button v-if="type=='editor'" type="primary" @click="editor">修改</u-button>
        </view>
      </view>
      <u-calendar
        v-model="DateMode"
        mode="date"
        :max-date="'2250-01-01'"
        @change="dateModeChange"
      ></u-calendar>
      <u-action-sheet
        :list="categoryList"
        v-model="categoryShow"
      ></u-action-sheet>
      <!-- 开户银行 -->
      <u-select
        v-model="bankShow"
        :list="bankList"
        @confirm="bankConfirm"
      ></u-select>
      <!-- 银行所在地 -->
      <u-picker
        mode="region"
        :default-region="city_code"
        v-model="bankAdressShow"
        @confirm="bankAdressShowConfirm"
      ></u-picker>
    </view>
  </view>
</template>

<script>
import { post, get } from "../../tools/utils.js";
export default {
  data() {
    return {
      stepCurrent: 0, //当前步骤
      submitWX: [
        {
          name: "是",
          value: 1,
          disabled: false,
        },
        {
          name: "否",
          value: 0,
          disabled: false,
        },
      ],
      numList: [
        {
          name: "主体资料",
        },
        // {
        //   name: "经营资料",
        // },
        {
          name: "法人资料",
        },
        {
          name: "银行账户",
        },
      ],
      mainTypeList: [
        {
          name: "个人卖家",
          value: 2500,
          disabled: false,
        },
        {
          name: "小微商户",
          value: 2401,
          disabled: false,
        },

        {
          name: "个体工商户",
          value: 4,
          disabled: false,
        },
        {
          name: "企业",
          disabled: false,
          value: 2,
        },
      ],
      indateTypeList: [
        {
          name: "定期",
          disabled: false,
        },
        {
          name: "长期有效",
          disabled: false,
        },
      ],
      jyScenceList: [
        {
          name: "线下场所店",
          checked: false,
        },
        {
          name: "微信公众号",
          checked: false,
        },
        {
          name: "微信小程序",
          checked: false,
        },
        {
          name: "移动APP",
          checked: false,
        },
        {
          name: "互联网网站",
          checked: false,
        },
        {
          name: "企业微信",
          checked: false,
        },
      ],
      mainForm: {
        organization_type: "2500",
        business_license_info: "",
        business_license_number: "",
        merchant_name: "",
        legal_person: "",
      },
      mainAction: "", //执照上传url
      DateMode: false, //日期选择显示隐藏
      dataType: 1, //日期弹窗类型 1生效期 2失效期
      frFormTypeList: [
        {
          name: "是",
          disabled: false,
        },
        {
          name: "否",
          disabled: false,
        },
      ],
      zhTypeList: [
        {
          name: "对私账户",
          value: "75",
          disabled: false,
        },
        {
          name: "对公账户",
          value: "74",
          disabled: false,
        },
      ],
      categoryShow: false, //经营类目 弹窗显示隐藏
      categoryList: [
        {
          text: "点赞",
        },
        {
          text: "点赞",
        },
      ],
      bankList: [
        {
          label: "工商银行",
        },
        {
          label: "交通银行",
        },
        {
          label: "招商银行",
        },
        {
          label: "民生银行",
        },
        {
          label: "中信银行",
        },
        {
          label: "浦发银行",
        },
        {
          label: "兴业银行",
        },
        {
          label: "光大银行",
        },
        {
          label: "广发银行",
        },
        {
          label: "平安银行",
        },
        {
          label: "南京银行",
        },
        {
          label: "华夏银行",
        },
        {
          label: "农业银行",
        },
        {
          label: "建设银行",
        },
        {
          label: "邮政储蓄银行",
        },
        {
          label: "中国银行",
        },
        {
          label: "宁波银行",
        },
        {
          label: "其他银行",
        },
      ],
      bankShow: false, //银行列表显示隐藏
      bankAdressShow: false, //银行所在地列表显示隐藏
      rule1: {
        business_license_info: [
          {
            required: true,
            trigger: "change",
          },
        ],
        business_license_number: [
          {
            required: true,
            trigger: "change",
          },
        ],
        merchant_name: [
          {
            required: true,
            trigger: "change",
          },
        ],
        legal_person: [
          {
            required: true,
            trigger: "change",
          },
        ],
      },
      id_card_info: {
        Type: "是",
        id_card_copy: "", //证件人面像
        id_card_name: "", //身份证过姓名
        id_card_number: "", //身份证号
        id_card_address: "", //身份证地址
        id_card_national: "", //证件国徽面
        id_card_valid_time_begin: "", //身份证开始日期
        id_card_valid_time: "", //身份证结束日期
      }, //法人资料
      rule2: {
        id_card_copy: [
          {
            required: true,
            trigger: "change",
          },
        ],
        id_card_name: [
          {
            required: true,
            trigger: "change",
          },
        ],
        id_card_number: [
          {
            required: true,
            trigger: "change",
          },
        ],
        id_card_address: [
          {
            required: true,
            trigger: "change",
          },
        ],
        id_card_national: [
          {
            required: true,
            trigger: "change",
          },
        ], //证件国徽面
        id_card_valid_time_begin: [
          {
            required: true,
            trigger: "change",
          },
        ],
        id_card_valid_time: [
          {
            required: true,
            trigger: "change",
          },
        ],
      },
      yhForm: {
        bank_account_type: "75", //账户类型 75对私,74对公
        account_bank: "", //开户银行
        bank_address_code: "", //开户银行地区编码
        bank_address_name: "",
        account_number: "", //银行账号
        contact_type: 65, //超级管理员类型 65法人 66经办人
        contact_name: "", //超级管理员姓名
        mobile_phone: "", //超级管理员手机号
        contact_email: "", //超级管理员邮箱
        store_name: "", //店铺名称
        store_qr_code: "", //店铺二维码
        merchant_shortname: "", //商户简称
      }, //银行账户
      rule3: {
        account_bank: [
          {
            required: true,
            trigger: "change",
          },
        ],
        bank_address_code: [
          {
            required: true,
            trigger: "change",
          },
        ],
        account_number: [
          {
            required: true,
            trigger: "change",
          },
        ],
        mobile_phone: [
          {
            required: true,
            trigger: "change",
          },
        ],
        contact_email: [
          {
            required: true,
            trigger: "change",
          },
        ],
        store_name: [
          {
            required: true,
            trigger: "change",
          },
        ],
        store_qr_code: [
          {
            required: true,
            trigger: "change",
          },
        ],
        merchant_shortname: [
          {
            required: true,
            trigger: "change",
          },
        ],
      },
      city_code: [],
      id: "",
      cityStr: "",
      companyid: "",
      type: "add",
    };
  },
  onReady() {
    this.$refs.mainForm.setRules(this.rule1);
    this.$refs.id_card_info.setRules(this.rule2);
    this.$refs.yhForm.setRules(this.rule3);
  },
  onLoad(option) {
    this.id = option.id;
   
    // 修改
    if (this.id) {
      this.type = "editor";
      this.getRead();
    } else {
      this.type = "add";
    }
     console.log( this.type,'type``````````````````')
    let url = window.location.href;
    let parArr = this.getUrlParams(url);
    if (parArr[0] == "companyid") {
      this.companyid = parArr;
    }
  },
  methods: {
    getUrlParams(url) {
      // 不传name返回所有值，否则返回对应值
      let arr = url.split("?");
      if (arr.length > 1) {
        let arr2 = arr[1].split("=");
        return arr2;
      } else {
        return false;
      }
    },
    // 获取字段
    getRead() {
      let data = {
        out_request_no: this.id,
      };
      post("merchant/read", data).then((res) => {
        if (res.code == 0) {
          let obj = res.message;
          // this.mainForm.is_post_wx = obj.is_post_wx;
          this.mainForm.organization_type = obj.organization_type;
          if (obj.business_license_info_fmt) {
            this.mainForm.business_license_info =
              obj.business_license_info_fmt.business_license_info;
            this.mainForm.business_license_number =
              obj.business_license_info_fmt.business_license_number;
            this.mainForm.merchant_name =
              obj.business_license_info_fmt.merchant_name;
            this.mainForm.legal_person =
              obj.business_license_info_fmt.legal_person;
          }
          this.id_card_info.id_card_copy = obj.id_card_info_fmt.id_card_copy;
          this.id_card_info.id_card_copy = obj.id_card_info_fmt.id_card_copy;
          this.id_card_info.id_card_name = obj.id_card_info_fmt.id_card_name;
          this.id_card_info.id_card_number =
            obj.id_card_info_fmt.id_card_number;
          this.id_card_info.id_card_address =
            obj.id_card_info_fmt.id_card_address;
          this.id_card_info.id_card_national =
            obj.id_card_info_fmt.id_card_national;
          this.id_card_info.id_card_valid_time_begin =
            obj.id_card_info_fmt.id_card_valid_time_begin;
          this.id_card_info.id_card_valid_time =
            obj.id_card_info_fmt.id_card_valid_time;
          this.yhForm.bank_account_type =
            obj.account_info_fmt.bank_account_type;
          this.yhForm.account_bank = obj.account_info_fmt.account_bank;
          this.yhForm.account_name = obj.account_info_fmt.id_card_name;
          this.yhForm.bank_address_code =
            obj.account_info_fmt.bank_address_code;
          this.yhForm.account_number = obj.account_info_fmt.account_number;
          this.yhForm.contact_type = obj.contact_info_fmt.contact_type;
          this.yhForm.contact_name = obj.contact_info_fmt.id_card_name;
          this.yhForm.mobile_phone = obj.contact_info_fmt.mobile_phone;
          this.yhForm.contact_email = obj.contact_info_fmt.contact_email;
          this.yhForm.store_name = obj.sales_scene_info_fmt.store_name;
          this.yhForm.store_qr_code = obj.sales_scene_info_fmt.store_qr_code;
          this.city_code = obj.city_code.split(",");
          this.yhForm.bank_address_name = obj.city_code.replace(",", "/");
          this.yhForm.merchant_shortname = obj.merchant_shortname;
        }
      });
    },
    storeQrCode(e) {
      this.yhForm.store_qr_code = e.media_id;
    },
    idCardNational(e) {
      this.id_card_info.id_card_national = e.media_id;
    },
    idCardCopy(e) {
      this.id_card_info.id_card_copy = e.media_id;
    },
    businessLicenseCopy(e) {
      this.mainForm.business_license_info = e.media_id;
    },
    // 开户银行所在地列表
    bankAdressShowConfirm(e) {
      let p = e.province.label;
      let c = e.city.label;
      let a = e.area.label;
      this.yhForm.bank_address_name = `${p}/${c}/${a}`;
      let ac = e.area.value;
      this.yhForm.bank_address_code = ac;
      this.cityStr = `${p},${c},${a}`;
    },
    // 开户银行所在地弹窗显示
    bankAdressHandler() {
      this.bankAdressShow = true;
    },
    // 开户银行弹窗显示
    accountBankHandler(e) {
      this.bankShow = true;
    },
    // 银行列表确定
    bankConfirm(r) {
      this.yhForm.account_bank = r[0].label;
    },
    editor() {
      let data = {
        out_request_no: this.id,
        ...this.mainForm,
        ...this.id_card_info,
        ...this.yhForm,
      };
      if (data.organization_type == 2 || data.organization_type == 4) {
        data.business_license_info = {
          business_license_copy: data.business_license_info,
          business_license_number: data.business_license_number,
          merchant_name: data.merchant_name,
          legal_person: data.legal_person,
        };
      }
      data.id_card_info = {
        id_card_copy: data.id_card_copy,
        id_card_national: data.id_card_national,
        id_card_name: data.id_card_name,
        id_card_number: data.id_card_number,
        id_card_address: data.id_card_address,
        id_card_valid_time_begin: data.id_card_valid_time_begin,
        id_card_valid_time: data.id_card_valid_time,
      };
      data.account_info = {
        bank_account_type: data.bank_account_type,
        account_bank: data.account_bank,
        account_name: data.id_card_name,
        bank_address_code: data.bank_address_code,
        account_number: data.account_number,
      };
      data.contact_info = {
        contact_type: data.contact_type,
        contact_name: data.id_card_name,
        mobile_phone: data.mobile_phone,
        contact_email: data.contact_email,
      };
      data.sales_scene_info = {
        store_name: data.store_name,
        store_qr_code: data.store_qr_code,
      };
      data.city_code = this.cityStr;
      delete data.id_card_national;
      delete data.id_card_name;
      delete data.id_card_number;
      delete data.id_card_address;
      delete data.id_card_valid_time_begin;
      delete data.id_card_valid_time;
      delete data.bank_account_type;
      delete data.account_bank;
      delete data.account_name;
      delete data.bank_address_code;
      delete data.account_number;
      delete data.contact_type;
      delete data.contact_name;
      delete data.mobile_phone;
      delete data.contact_email;
      delete data.store_name;
      delete data.store_qr_code;
      delete data.bank_address_name;
      this.$refs.mainForm.validate((valid) => {
        if (valid) {
          this.$refs.id_card_info.validate((valid2) => {
            if (valid2) {
              this.$refs.yhForm.validate((valid3) => {
                if (valid3) {
                  data.contact_name = this.id_card_info.id_card_name;
                  post("merchant/update", data).then((res) => {
                    if (res.code == 0) {
                      uni.showToast({
                        title: "提交成功",
                      });
                      // 表单所有数据清空
                      this.$refs.mainForm.resetFields();
                      this.$refs.id_card_info.resetFields();
                      this.$refs.yhForm.resetFields();
                    } else {
                      uni.showToast({
                        title: res.message,
                      });
                    }
                  });
                }
              });
              console.log("验证通过");
            } else {
              // 第二个表单验证不通过
              this.stepCurrent = 1;
            }
          });
        } else {
          // 第一个表单验证不通过
          this.stepCurrent = 0;
        }
      });
    },
    // 提交
    submit() {
      let data = {
        companyid: this.companyid,
        ...this.mainForm,
        ...this.id_card_info,
        ...this.yhForm,
      };
      if (data.organization_type == 2 || data.organization_type == 4) {
        data.business_license_info = {
          business_license_copy: data.business_license_info,
          business_license_number: data.business_license_number,
          merchant_name: data.merchant_name,
          legal_person: data.legal_person,
        };
      }
      data.id_card_info = {
        id_card_copy: data.id_card_copy,
        id_card_national: data.id_card_national,
        id_card_name: data.id_card_name,
        id_card_number: data.id_card_number,
        id_card_address: data.id_card_address,
        id_card_valid_time_begin: data.id_card_valid_time_begin,
        id_card_valid_time: data.id_card_valid_time,
      };
      data.account_info = {
        bank_account_type: data.bank_account_type,
        account_bank: data.account_bank,
        account_name: data.id_card_name,
        bank_address_code: data.bank_address_code,
        account_number: data.account_number,
      };
      data.contact_info = {
        contact_type: data.contact_type,
        contact_name: data.id_card_name,
        mobile_phone: data.mobile_phone,
        contact_email: data.contact_email,
      };
      data.sales_scene_info = {
        store_name: data.store_name,
        store_qr_code: data.store_qr_code,
      };
      data.city_code = this.cityStr;
      delete data.id_card_national;
      delete data.id_card_name;
      delete data.id_card_number;
      delete data.id_card_address;
      delete data.id_card_valid_time_begin;
      delete data.id_card_valid_time;
      delete data.bank_account_type;
      delete data.account_bank;
      delete data.account_name;
      delete data.bank_address_code;
      delete data.account_number;
      delete data.contact_type;
      delete data.contact_name;
      delete data.mobile_phone;
      delete data.contact_email;
      delete data.store_name;
      delete data.store_qr_code;
      delete data.bank_address_name;
      this.$refs.mainForm.validate((valid) => {
        if (valid) {
          this.$refs.id_card_info.validate((valid2) => {
            if (valid2) {
              this.$refs.yhForm.validate((valid3) => {
                if (valid3) {
                  data.contact_name = this.id_card_info.id_card_name;
                  post("merchant/apply", data).then((res) => {
                    if (res.code == 0) {
                      uni.showToast({
                        title: "提交成功",
                      });
                      // 表单所有数据清空
                      this.$refs.mainForm.resetFields();
                      this.$refs.id_card_info.resetFields();
                      this.$refs.yhForm.resetFields();
                    } else {
                      uni.showToast({
                        title: res.message,
                      });
                    }
                  });
                }
              });
              console.log("验证通过");
            } else {
              // 第二个表单验证不通过
              this.stepCurrent = 1;
            }
          });
        } else {
          // 第一个表单验证不通过
          this.stepCurrent = 0;
        }
      });
    },
    // 经营类目弹窗显示
    categoryHandler() {
      this.categoryShow = true;
    },
    // 点击执照生效期,失效期
    DateHandler(index) {
      this.DateMode = true;
      this.dataType = index;
    },
    // 执照生效期选择日期回调
    dateModeChange(e) {
      if (this.dataType == 1) {
        this.id_card_info.id_card_valid_time_begin = e.result;
      } else {
        this.id_card_info.id_card_valid_time = e.result;
      }
    },
    // 主体资料点击下一步
    stepClick0() {
      this.stepCurrent = 1;
    },
    // 法人资料下一步
    stepClick2b() {
      this.stepCurrent = 2;
    },
    // 法人资料上一步
    stepClick2t() {
      this.stepCurrent = 0;
    },
    // 银行资料上一步
    stepClick3t() {
      this.stepCurrent = 1;
    },
    checkboxChange(e) {
      //console.log(e);
    },
    // 选中任一checkbox时，由checkbox-group触发
    checkboxGroupChange(e) {
      // console.log(e);
    },
  },
};
</script>
<style>
page {
  background: #fff;
}
</style>
<style lang="scss" scoped>
.container {
  padding: 20rpx;
  font-size: 14px;
  line-height: 24px;
  .step-box {
    padding-bottom: 20rpx;
  }
  .form-box {
    padding-top: 20rpx;
    border-top: 1px solid #ccc;
  }
  .btn-box {
    margin-top: 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .divi-box {
    margin-top: 30rpx;
  }
}
</style>
