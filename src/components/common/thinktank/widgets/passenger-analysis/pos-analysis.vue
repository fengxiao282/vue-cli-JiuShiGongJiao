<template>
<div class="container">
<div class="main">

  <div class="pos-analysis">
    <div class="pos">
      <!-- pos-left -->
      <div class="pos-left">
        <coreitemheader titleName="站点客流排名(刷卡)" titleYear=''/>

        <div class="pos-left-table">
          <tablecomponentleft
            titleName="全日排名"
            :titleTime="zhanDian_all.updateTime"
            propType="zhanDian_all"
          />

          <tablecomponentleft
            titleName="早高峰排名"
            :titleTime="zhanDian_zaoGaoFeng.updateTime"
            propType="zhanDian_zaoGaoFeng"
          />

          <tablecomponentleft
            titleName="晚高峰排名"
            :titleTime="zhanDian_wanGaoFeng.updateTime"
            propType="zhanDian_wanGaoFeng"
          />
        </div>
      </div>

      <!-- pos-right -->
      <div class="pos-right">
        <coreitemheader titleName="线路客流排名(刷卡)" titleYear=''/>

        <div class="pos-left-table">
          <tablecomponentright
            titleName="全日排名"
            :titleTime="xianlu_all.updateTime"
            propType="xianlu_all"
          />

          <tablecomponentright
            titleName="早高峰排名"
            :titleTime="xianlu_zaoGaoFeng.updateTime"
            propType="xianlu_zaoGaoFeng"
          />

          <tablecomponentright
            titleName="晚高峰排名"
            :titleTime="xianlu_wanGaoFeng.updateTime"
            propType="xianlu_wanGaoFeng"
          />
        </div>
      </div>
    </div>
  </div>

</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import coreitemheader from "./com/coreitemheader.vue";
import tablecomponentleft from "./com/tablecomponentleft.vue";
import tablecomponentright from "./com/tablecomponentright.vue";

export default {
  name: "pos-analysis",
  components: {
    coreitemheader,
    tablecomponentleft,
    tablecomponentright
  },
  data() {
    return {
    };
  },
  mounted(){
      let start = 1;
      let end = 5;
      this.getZhanDianDensityPOS_All(start,end);
      this.getZhanDianDensityPOS_ZaoGaoFeng(start,end);
      this.getZhanDianDensityPOS_WanGaoFeng(start,end);
      this.getLineDensityPOS_All(start,end);
      this.getLineDensityPOS_ZaoGaoFeng(start,end);
      this.getLineDensityPOS_WanGaoFeng(start,end);
  },
  methods:{
    // 站点客流排名   type 早高峰: 1、晚高峰: 2、全日: 3
    getZhanDianDensityPOS_All(start,end){
      this.$store.dispatch('densityAnalysisPOS/getZhanDianDensityPOS',{'type':'3','collectionName':'5_3_2_1_3'});
    },
    getZhanDianDensityPOS_ZaoGaoFeng(start,end){
      this.$store.dispatch('densityAnalysisPOS/getZhanDianDensityPOS',{'type':'1','collectionName':'5_3_2_1_1'});
    },
    getZhanDianDensityPOS_WanGaoFeng(start,end){
      this.$store.dispatch('densityAnalysisPOS/getZhanDianDensityPOS',{'type':'2','collectionName':'5_3_2_1_2'});
    },
    // 线路客流排名 type 早高峰: 1、晚高峰: 2、全日: 3
    getLineDensityPOS_All(start,end){
      this.$store.dispatch('densityAnalysisPOS/getLineDensityPOS',{'type':'3','collectionName':'5_3_2_2_3'});
    },
    getLineDensityPOS_ZaoGaoFeng(start,end){
      this.$store.dispatch('densityAnalysisPOS/getLineDensityPOS',{'type':'1','collectionName':'5_3_2_2_1'});
    },
    getLineDensityPOS_WanGaoFeng(start,end){
      this.$store.dispatch('densityAnalysisPOS/getLineDensityPOS',{'type':'2','collectionName':'5_3_2_2_2'});
    }
  },
  computed:{
    ...mapState('densityAnalysisPOS',[
        'zhanDian_all',
        'zhanDian_zaoGaoFeng',
        'zhanDian_wanGaoFeng',
        'xianlu_all',
        'xianlu_zaoGaoFeng',
        'xianlu_wanGaoFeng'
    ]),
  }
}
</script>
<style lang="postcss" scoped>
/* 删除 */
.container{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.main{
  width: 3365px;
  height: 2160px;
  background-color: #000;
}
/* 上面删除 */
.pos-analysis {
  font-family: "PingFang-Regular";
  width: 100%;
  height: 100%;
  padding-bottom: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.pos {
  width: 3275px;
  height: 2030px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* pos-left */
.pos-left {
  /* width: 1825px; */
  width: 1612.5px;
  height: 2030px;
  border: 2.5px solid #2e3264;
  padding: 30px 40px 60px;
  box-sizing: border-box;
}
.pos-left-table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 1830px;
  margin-top: -30px;
}

/* pos-right */
.pos-right {
  /* width: 1400px; */
  width: 1612.5px;
  height: 2030px;
  border: 2.5px solid #2e3264;
  padding: 30px 40px 55px;
  box-sizing: border-box;
}
</style>