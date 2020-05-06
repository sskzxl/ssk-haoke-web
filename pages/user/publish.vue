<template>
  <div class="hk-publish">
    <van-nav-bar fixed="" :title="title" left-arrow @click-left="handleBack" />
    <van-form class="hk-publish__form" @submit="handlePublishResource">
      <van-field
        name="房源标题"
        label="房源标题"
        v-model="form.title"
      ></van-field>
      <van-field name="地址" label="地址" v-model="form.address"></van-field>

      <van-field name="租金" label="租金" v-model="form.rent"></van-field>

      <van-field
        v-model="rentText"
        name="租赁方式"
        label="租赁方式"
        readonly
        @click="showRentType = true"
      ></van-field>
      <van-field
        name="户型"
        label="户型"
        readonly
        @click="showHouseType = true"
      >
        <template slot="input">
          {{ houseType_1 }} 室 {{ houseType_2 }} 厅 {{ houseType_3 }} 卫
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
      <van-field
        name="楼层"
        label="楼层"
        v-model="form.floor"
        placeholder="楼层/总楼层，如2/5"
      >
      </van-field>

      <van-field
        name="朝向"
        label="朝向"
        readonly
        @click="showOrientation = true"
      >
        <template slot="input">
          {{ form.orientation }}
        </template>
      </van-field>
      <van-field
        name="装修"
        label="装修"
        readonly
        @click="showDecorator = true"
      >
        <template slot="input">
          {{ decoratorText }}
        </template>
      </van-field>
      <van-field
        name="配套措施"
        label="配套措施"
        readonly
        @click="showFacilities = true"
      >
        <template slot="input">
          {{ form.attachments.join("/") }}
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
          <van-uploader
            multiple
            :afterRead="afterRead"
            v-model="imageUrl"
          ></van-uploader>
        </template>
      </van-field>
      <!--<van-field
        name="出租信息"
        label="出租信息"
        v-model="form.contact"
      ></van-field>-->
      <!--<van-field
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
      ></van-field>-->
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
    <!--租赁方式-->
    <van-popup v-model="showRentType" position="bottom">
      <van-picker
        show-toolbar
        :columns="rentTypeList"
        @confirm="handleSelectRentType"
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
      <van-checkbox-group v-model="form.attachments">
        <van-cell-group>
          <van-cell
            v-for="item in facilities"
            clickable
            :key="item.value"
            :title="`${item.text}`"
          >
            <template #right-icon>
              <van-checkbox :name="item.value" ref="checkboxes" />
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
import { mapState } from "vuex";
import { http } from "~/plugins/http";
import { addHouse } from "~/plugins/apis";
import { Toast } from "vant";
import { getResource } from "~/plugins/apis";
export default {
  layout: "basic",
  data() {
    return {
      imageUrl: [],
      houseType_1: "",
      houseType_2: "",
      houseType_3: "",
      title: "发布房源",
      // 显示
      rentText: "",
      form: {
        title: "",
        rent: "",
        rentMethod: "",
        houseType: "",
        address: "",
        decoration: "",
        orientation: "",
        attachments: [],
        houseDesc: "",
        contact: "",
        contactId: "",
        mobile: "",
        propertyCost: "",
        pic: [],
        floor: ""
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
        { text: "床", value: "1" },
        { text: "洗衣机", value: "2" },
        { text: "空调", value: "3" },
        { text: "衣柜", value: "4" },
        { text: "电视", value: "5" },
        { text: "冰箱", value: "6" },
        { text: "热水器", value: "7" },
        { text: "暖气", value: "8" },
        { text: "宽带", value: "9" },
        { text: "天然气", value: "10" }
      ],
      currentFacilities: [],
      decoratorList: [
        { text: "精装", value: 1 },
        { text: "简装", value: 2 },
        { text: "毛坯", value: 3 }
      ],
      //装修显示
      decoratorText: "",
      showDecorator: false,
      showTime: false,
      minDate: new Date(Date.now() + 86400000),
      currentDate: "",
      orientationList: ["南", "北", "东", "西"],
      showOrientation: false,
      floor_1: "",
      floor_2: "",
      showFloor: false,
      showHouseType: false,
      houseTypes: [
        {
          defaultIndex: 0,
          values: [
            "1室",
            "2室",
            "3室",
            "4室",
            "5室",
            "6室",
            "7室",
            "8室",
            "9室",
            "10室"
          ]
        },
        {
          defaultIndex: 0,
          values: [
            "1厅",
            "2厅",
            "3厅",
            "4厅",
            "5厅",
            "6厅",
            "7厅",
            "8厅",
            "9厅",
            "10厅"
          ]
        },
        {
          defaultIndex: 0,
          values: [
            "1卫",
            "2卫",
            "3卫",
            "4卫",
            "5卫",
            "6卫",
            "7卫",
            "8卫",
            "9卫",
            "10卫"
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState(["token", "user"])
  },
  created() {
    if (this.$route.query.id) {
      this.title = "修改房源";
      console.log(this.$route.query.id);
      getResource(this.$route.query.id).then(res => {
        if (res.data) {
          const {
            title,
            rent,
            rentMethod,
            houseType,
            address,
            decoration,
            orientation,
            attachments,
            houseDesc,
            contact,
            contactId,
            mobile,
            propertyCost,
            pic,
            floor,
            useArea,
            coveredArea,
            picList,
          } = res.data;
          this.form.title = title;
          this.form.rentMethod = rentMethod;
          this.form.houseDesc = houseDesc;
          this.form.floor = floor;
          this.form.useArea = useArea;
          this.form.address = address;
          this.form.rent = rent;
          this.form.orientation = orientation;
          this.form.coveredArea = coveredArea;
          this.form.pic = picList;
          this.form.decoration = decoration;
          this.imageUrl = picList;
          this.rentText = this.rentTypeList[rentMethod-1].text;
          this.decoratorText = this.decoratorList[decoration-1].text;
        }
      });
    }
  },
  methods: {
    handlePublishResource() {
      this.form.contact = this.user.username;
      this.form.contactId = this.user.id;
      this.form.mobile = this.user.phone;
      addHouse(this.form).then(res => {
        if (0 == res.resultCode) {
          //成功
          Toast.success("房源发布成功，等待审核");
          //等待1.5秒再返回
          setTimeout(() => {
            this.$router.back();
          }, 1500);
        } else {
          Toast.fail("房源发布失败，请重试");
        }
      });
      console.log(this.form);
    },
    handleSelectRent(item) {},
    //租房方式
    handleSelectRentType(item) {
      this.rentText = item.text;
      this.form.rentMethod = item.value;
      this.showRentType = false;
    },
    //配套设施
    handleSelectFacilities() {},
    //房屋类型，几房几厅
    handleSelectHouseType(_, values) {
      this.houseType_1 = values[0] + 1;
      this.houseType_2 = values[1] + 1;
      this.houseType_3 = values[2] + 1;
      this.form.houseType =
        this.houseType_1 +
        "室" +
        this.houseType_2 +
        "厅" +
        this.houseType_3 +
        "卫";
      this.showHouseType = false;
    },
    //朝向
    handleSelectOrientation(item) {
      console.log(item);
      this.form.orientation = item;
      this.showOrientation = false;
    },
    handleSelectDecorator(item) {
      this.form.decoration = item.value;
      this.decoratorText = item.text;
      this.showDecorator = false;
    },
    handleSelectTime(time) {
      this.form.time = time.getTime();
      this.showTime = false;
    },
    handleBack() {
      this.$router.back();
    },
    async afterRead(file) {
      this.form.pic.push(file.file.name);
      // 创建form对象
      let formdata1 = new FormData();
      // 通过append向form对象添加数据,可以通过append继续添加数据
      //或formdata1.append('file',file);
      formdata1.append("file", file.file);

      let config = { headers: { "Content-Type": "multipart/form-data" } };
      let data = http.post(`/api/api/pic/upload`, formdata1, config);
      // let data = await axios.post(`/pic/upload`, formdata1, config);
      console.log(data);
    },
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
