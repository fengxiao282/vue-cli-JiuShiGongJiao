<template>
	<div id='cheliang-zongti'>
		<investitemtitle titleName="车辆总体情况">
			<div slot="content" class="screen-count"></div>
		</investitemtitle>

        <div class="bottom-container">
            <div class="line-1 line-comClass"></div>
			<div class="line-2 line-comClass"></div>
			<div class="line-3 line-comClass"></div>

			<div class="item1 item-comClass">
				<div class="title">在用车辆</div>
				<div class="value v1style">{{cheliangzongti.inUse?cheliangzongti.inUse:0}}</div>
			</div>
			<div class="item2 item-comClass">
				<div class="title">当前可用车辆</div>
				<div class="value v2style">{{show_keyong}}</div>
			</div>
			<div class="item3 item-comClass">
				<div class="title">停驶车辆</div>
				<div class="value v3style">{{show_tingshi}}</div>
			</div>
			<div class="item4 item-comClass">
				<div class="title">隔日留交车辆</div>
				<div class="value v3style">{{show_geri}}</div>
			</div>
			<div class="item5 item-comClass">
				<div class="title">保养中车辆</div>
				<div class="value v3style">{{show_jinchang}}</div>
			</div>
			<div class="item6 item-comClass">
				<div class="title">维修中车辆</div>
				<div class="value v3style">{{show_weixiu}}</div>
			</div>
        </div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
    name: 'cheliang-zongti',
	components: {
		investitemtitle
	},
	data () {
		return {
			shift_status:false,
			show_keyong:'',
			keyong:'',
			keyongPercent:'',
			show_tingshi:'',
			tingshi:'',
			tingshiPercent:'',
			show_geri:'',
			geri:'',
			geriPercent:'',
			show_jinchang:'',
			jinchang:'',
			jinchangPercent:'',
			show_weixiu:'',
			weixiu:'',
			weixiuPercent:'',
			timer_cheliang_zongti:null,
		}
	},
	created(){
		// 机务保障 - 车辆总体
		this.$store.dispatch('locomotiveguarantee/jiwu_cheliangzongti');
	},
	beforeDestroy(){
		clearInterval(this.timer_cheliang_zongti);
	},
	methods: {
		shiftVal(){
			if(this.timer_cheliang_zongti){
					clearInterval(this.timer_cheliang_zongti);
			}

			this.timer_cheliang_zongti = setInterval(()=>{
				if(this.shift_status){
					this.show_keyong = this.keyong;
					this.show_tingshi = this.tingshi;
					this.show_geri = this.geri;
					this.show_jinchang = this.jinchang;
					this.show_weixiu = this.weixiu;
				}else{
					this.show_keyong = this.keyongPercent;
					this.show_tingshi = this.tingshiPercent;
					this.show_geri = this.geriPercent;
					this.show_jinchang = this.jinchangPercent;
					this.show_weixiu = this.weixiuPercent;
				}
				this.shift_status = !this.shift_status;
			},10000)
		},
	},
	computed:{
		...mapState('locomotiveguarantee',{
			cheliangzongti(state){
				if(state.jiwu_cheliangzongti){
					let data = state.jiwu_cheliangzongti;
					// console.log(data)

					this.show_keyong = data.canUse;
					this.show_tingshi = data.seal;
					this.show_geri = data.retain;
					this.show_jinchang = data.maintain;
					this.show_weixiu = data.repair;

					let all_keyong = data.inUse;
					this.keyong = data.canUse;
					this.tingshi = data.seal;
					this.geri = data.retain;
					this.jinchang = data.maintain;
					this.weixiu = data.repair;

					this.keyongPercent = (data.canUse / all_keyong * 100).toFixed(1) + '%';
					this.tingshiPercent = (data.seal / all_keyong * 100).toFixed(1) + '%';
					this.geriPercent = (data.retain / all_keyong * 100).toFixed(1) + '%';
					this.jinchangPercent = (data.maintain / all_keyong * 100).toFixed(1) + '%';
					this.weixiuPercent = (data.repair / all_keyong * 100).toFixed(1) + '%';

					this.shiftVal();
					return data;
				}
				return {};
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#cheliang-zongti{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
	width: 100%;
	height: 100%;
    padding: 20px 40px;
	border: 1.25px solid #4089FF;
	box-sizing: border-box;
	background-color: #000015;
}
.bottom-container{
    flex: 1;
	position: relative;
}
.line-comClass{
	position: absolute;
	bottom: 210px;
	border: 2px solid #4089FF;
	box-sizing: border-box;
	border-bottom-style: none;
}
.line-1{
	left: 180px;
	width: 1230px;
	height:65px;
	z-index: 1;
}
.line-2{
	left: 625px;
	width: 1065px;
	height:30px;
	z-index: 2;
}
.line-3{
	left: 985px;
	width: 1065px;
	height:30px;
	z-index: 3;
}

.item-comClass{
	position: absolute;
	top: 94px;
	width: 320px;
	height: 170px;
	border: 2.5px solid #4089FF;
	background-color: #000000;
}
.item1{
	left: 20px;
}
.item2{
	left: 520px;
}
.item3{
	left: 880px;
}
.item4{
	left: 1240px;
}
.item5{
	left: 1600px;
}
.item6{
	left: 1960px;
}
.title{
	height: 80px;
	line-height: 90px;
	width: 100%;
	text-align: center;
}
.value{
	height: 90px;
	line-height: 80px;
	width: 100%;
	text-align: center;
	font-size: 60px;
}
.v1style{
	color: #ffffff;
}
.v2style{
	color: #02FF9A;
}
.v3style{
	color: #E8FF78;
}


</style>