<template>
  <div class="hk-publish">
    <van-nav-bar fixed="" :title="title" left-arrow @click-left="handleBack" />
    <van-form class="hk-publish__form" @submit="handlePublishResource">
      <van-field
        name="房源信息"
        label="房源信息"
        v-model="form.name"
      ></van-field>
      <van-field
        name="楼盘地址"
        label="楼盘地址"
        v-model="form.estateAddress"
      ></van-field>
      <van-field
        name="房源标题"
        label="房源标题"
        v-model="form.title"
      ></van-field>
      <van-field name="楼栋" label="楼栋" v-model="form.title"></van-field>
      <van-field name="租金" label="租金" v-model="form.rent"></van-field>
      <van-field
        name="支付方式"
        label="支付方式"
        readonly
        @click="showRent = true"
      ></van-field>
      <van-field
        name="租赁方式"
        label="租赁方式"
        readonly
        @click="showRentType = true"
      ></van-field>
      <van-field 
        name="户型" 
        label="户型"
        readonly
        @click="showHouseType = true">
        <template slot="input">
          {{ form.houseType_1 }} 室
          {{ form.houseType_2 }} 厅
          {{ form.houseType_3 }} 卫
        </template>  
      </van-field>
      <van-field
        name="建筑面积"
        label="建筑面积"
        v-model="form.coveredArea"
        placeholder="平方"
      ></van-field>
      <van-field
        name="使用面积"
        label="使用面积"
        v-model="form.useArea"
        placeholder="平方"
      ></van-field>
      <van-field name="楼层" label="楼层" v-model="form.floor_1"></van-field>
      <van-field name="总楼层" label="总楼层" v-model="form.floor_2"></van-field>
      <van-field
        name="朝向"
        label="朝向"
        readonly
        @click="showOrientation = true"
      >
        <template slot="input">
          {{ form.orientation.text }}
        </template>
      </van-field>
      <van-field
        name="装修"
        label="装修"
        readonly
        @click="showDecorator = true"
      >
        <template slot="input">
          {{ form.decoration.text }}
        </template>
      </van-field>
      <van-field
        name="配套措施"
        label="配套措施"
        readonly
        @click="showFacilities = true"
      >
        <template slot="input">
          {{ currentFacilities.join('/') }}
        </template>
      </van-field>
      <van-field
        name="房源描述"
        label="房源描述"
        type="textarea"
        v-model="form.houseDesc"
      ></van-field>
      <van-field name="上传室内图" label="上传室内图">
        <template #input>
          <van-uploader v-model="form.imageUrl"></van-uploader>
        </template>
      </van-field>
      <van-field
        name="出租信息"
        label="出租信息"
        v-model="form.contact"
      ></van-field>
      <van-field name="手机" label="手机" v-model="form.mobile"></van-field>
      <van-field
        name="看房时间"
        label="看房时间"
        readonly
        v-model="form.time"
        @click="showTime = true"
      >
        <template slot="input">
          {{ new Date(form.time).toLocaleString() }}
        </template>
      </van-field>
      <van-field
        name="物业费"
        label="物业费"
        v-model="form.propertyCost"
      ></van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <van-popup v-model="showRent" position="bottom">
      <van-picker
        show-toolbar
        :columns="rendList"
        @confirm="handleSelectRent"
        @cancel="showRent = false"
      />
    </van-popup>
    <van-popup v-model="showRentType" position="bottom">
      <van-picker
        show-toolbar
        :columns="rentTypeList"
        @confirm="handleSelectRent"
        @cancel="showRentType = false"
      />
    </van-popup>
    <!-- 装修 -->
    <van-popup v-model="showDecorator" position="bottom">
      <van-picker
        show-toolbar
        :columns="decoratorList"
        @confirm="handleSelectDecorator"
        @cancel="showDecorator = false"
      />
    </van-popup>
    <!-- 朝向 -->
    <van-popup v-model="showOrientation" position="bottom">
      <van-picker
        show-toolbar
        :columns="orientationList"
        @confirm="handleSelectOrientation"
        @cancel="showOrientation = false"
      />
    </van-popup>
    <!-- 户型 -->
    <van-popup v-model="showHouseType" position="bottom">
      <van-picker
        show-toolbar
        :columns="houseTypes"
        @confirm="handleSelectHouseType"
        @cancel="showHouseType = false"
      />
    </van-popup>
    <!-- 配套设施 -->
    <van-popup
      v-model="showFacilities"
      position="bottom"
      closeable
      style="padding-top: 50px"
    >
      <van-checkbox-group v-model="currentFacilities">
        <van-cell-group>
          <van-cell
            v-for="item in facilities"
            clickable
            :key="item.value"
            :title="`${item.text}`"
          >
            <template #right-icon>
              <van-checkbox :name="item.text" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        @confirm="handleSelectTime"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  layout: "basic",
  data() {
    return {
      title: "发布房源",
      form: {
        name: "",
        estateAddress: "",
        title: "",
        rent: "",
        paymentMethod: "",
        decoration: "",
        orientation: "",
        facilities: "",
        houseDesc: "",
        contact: "",
        mobile: "",
        time: "",
        propertyCost: "",
        imageUrl: []
      },
      rendList: [
        { text: "付一押一", value: 1 },
        { text: "付三押一", value: 2 },
        { text: "付六押一", value: 3 },
        { text: "年付押一", value: 4 },
        { text: "其它", value: 5 }
      ],
      rentTypeList: [
        { text: "整租", value: 1 },
        { text: "合租", value: 2 }
      ],
      showRent: false,
      showRentType: false,
      showFacilities: false,
      facilities: [
        { text: "水", value: "1" },
        { text: "电", value: "2" },
        { text: "煤气/天然气", value: "3" },
        { text: "暖气", value: "4" },
        { text: "有线电视", value: "5" },
        { text: "宽带", value: "6" },
        { text: "电梯", value: "7" },
        { text: "车位/车库", value: "8" },
        { text: "地下室/储藏室", value: "9" }
      ],
      currentFacilities: [],
      decoratorList: [
        { text: "精装", value: 1 },
        { text: "简装", value: 2 },
        { text: "毛坯", value: 3 }
      ],
      showDecorator: false,
      showTime: false,
      minDate: new Date(Date.now() + 86400000),
      currentDate: "",
      orientationList: [
       { text: "南", value: 1 },
       { text: "北", value: 2 },
       { text: "东", value: 3 },
       { text: "西", value: 4 },
      ],
      showOrientation: false,
      floor_1: "",
      floor_2: "",
      showFloor: false,
      showHouseType: false,
      houseTypes: [
        {
         defaultIndex: 0,
         values: ['1室','2室','3室','4室','5室','6室','7室','8室','9室','10室'] 
        },
        {
         defaultIndex: 0,
         values: ['1厅','2厅','3厅','4厅','5厅','6厅','7厅','8厅','9厅','10厅'] 
        },
        {
         defaultIndex: 0,
         values: ['1卫','2卫','3卫','4卫','5卫','6卫','7卫','8卫','9卫','10卫'] 
        },
      ]
    };
  },
  created() {
  },
  methods: {
    handlePublishResource() {},
    handleSelectRent(item) {},
    handleSelectFacilities() {},
    handleSelectHouseType(_, values) {
      this.form.houseType_1 = values[0] + 1;
      this.form.houseType_2 = values[1] + 1;
      this.form.houseType_3 = values[2] + 1;
      this.showHouseType = false;
    },
    handleSelectOrientation(item) {
      this.form.orientation = item;
      this.showOrientation = false;
    },
    handleSelectDecorator(item) {
      this.form.decoration = item;
      this.showDecorator = false;
    },
    handleSelectTime(time) {
      this.form.time = time.getTime();
      this.showTime = false;
    },
    handleBack() {},
    afterRead() {},
    formatterTime(type, val) {
      console.log(val);
      
        return val ? new Date(val).toLocaleString() : "";
    }
  }
};
</script>

<style lang="scss">
.hk-publish__form {
  padding-top: 20px;
}
</style>
