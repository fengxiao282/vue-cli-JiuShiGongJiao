<template>
  <div id="jiejiari-active">
    <investitemtitle titleName="节假日及重大活动情况汇报">
      <div slot="content" class="screen-count" v-if="huodongHuibao.bigEvent == ''?false:true">
        <img class="img-icon" src="../../../../../../resource/images/cloud/monitor/日期.png">
        {{huodongHuibao?huodongHuibao.bigEvent:''}}
      </div>
    </investitemtitle>

    <div class="bottom-container">
      <transition-group name="list-animation" tag="div">
        <div v-for="(item,index) in huodongList" :key="`${index}q`" class="list-item" :class="{ 'list-item-ok': item.type == '0', 'list-item-no': item.type == '1' }">
          <div class="list-item-content" v-if="item.msg.length > 22" @mouseenter="enter(item.msg,$event)" @mouseleave="out">
            &nbsp;&nbsp;&nbsp;{{item.time}}&nbsp;&nbsp; {{item.msg}}
          </div>
          <div class="list-item-content" v-else>
            &nbsp;&nbsp;&nbsp;{{item.time}}&nbsp;&nbsp; {{item.msg}}
          </div>
        </div>
      </transition-group>
    </div>

    <div id="tip-changzhan-active">{{msg}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import investitemtitle from "../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue";

export default {
  name: "jiejiari-active",
  components: {
    investitemtitle
  },
  data() {
    return {
      huodongHuibao:{'bigEvent':''},
      msg: "",
      tipDom: {},
    };
  },
  mounted() {
    // 车辆异常
    // this.$store.dispatch('exceptionmonitor/cheLiang_yiChang');

    this.tipDom = document.getElementById("tip-changzhan-active");
  },
  methods: {
		formatDate(date) { //日期格式化
			let greenwichTime = new Date(date);
			let hours = greenwichTime.getHours();
			let hours2 = hours < 10 ? `0${hours}` : hours;
			let minutes = greenwichTime.getMinutes();
			let minutes2 = minutes < 10 ? `0${minutes}` : minutes;
			return `${hours2}:${minutes2}`;
		},
    out() {
      this.tipDom.style.visibility = "hidden";
    },
    enter(msg, event) {
      this.msg = msg;
      let cx = document.body.clientWidth - event.clientX + 30;
      let cy = event.clientY - 90;

      this.tipDom.style.right = `${cx}px`;
      this.tipDom.style.top = `${cy}px`;
      this.tipDom.style.visibility = "visible";
    }
  },
  computed: {
		...mapState('stationguarantee',{
			huodongList(state){
				if(state.huodong_huibao){
          let data = state.huodong_huibao;
          this.huodongHuibao = data;
					return data.list;
				}
				return [];
			},
		}),
  }
};
</script>

<style lang="postcss" scoped>
#jiejiari-active {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 1160px;
  height: 370px;
  padding: 20px 40px;
  border: 1.25px solid #4089ff;
  box-sizing: border-box;
  background-color: #000015;
}
.img-icon {
  width: 50px;
  height: 50px;
  margin-bottom: -12px;
}

.bottom-container {
  background-color: #000000;
  flex: 1;
  overflow: auto;
}
.bottom-container::-webkit-scrollbar {
  display: none;
}
.list-item {
  height: 80px;
}
.list-item:first-child{
  border-top: 1px solid rgba(255,255,255,0.20);
}
.list-item-content {
  width: 100%;
  height: 100%;
  line-height: 80px;
  border-bottom: 1px solid rgba(255,255,255,0.20);
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
}
.list-item-no {
  color: #ff3939;
}
.list-item-ok {
  color: #02ff9a;
}
/* 进入*/
.list-animation-enter {
  opacity: 0;
  width: 0px;
}
.list-animation-enter-active {
  transition: all 1.5s cubic-bezier(0.2, 1, 1, 1);
}
.list-animation-enter-to {
  opacity: 1;
  width: 720px;
}

#tip-changzhan-active {
  position: fixed;
  visibility: hidden;
  background: #000015;
  box-shadow: 0 0 10px 0 #4089ff;
  font-family: PingFangSC-Regular;
  font-size: 40px;
  color: #4089ff;
  line-height: 50px;
  height: 50px;
  border-radius: 2px;
  padding: 5px 10px;
  overflow: hidden;
  pointer-events: none;
  z-index: 999;
}
</style>



</style>