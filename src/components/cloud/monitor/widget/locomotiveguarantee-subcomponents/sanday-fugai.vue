<template>
	<div id='sanday-fugai'>

		<investitemtitle titleName="三天一覆盖执行情况">
			<div slot="content" class="screen-count">
				<span class="outer-text">已执行检查<span class="inner-text">{{checked}}</span>辆</span>
			</div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="left">
				<div class="day-1 day-com"
					@click="select(1)"
					:class="{ 'boxShadow': 1 == selectedIndex, 'border-style':!examineFirst }">
					<div class="item-title">第一天</div>
					<div class="item-body-com height-light-1" :class="{'height-light-2':dayInt1 < 33.3}">{{check_day1}}</div>
				</div>
				<div class="day-2 day-com"
					@click="select(2)"
					:class="{ 'boxShadow': 2 == selectedIndex, 'border-style':!examineSecond }">
					<div class="item-title">第二天<span class="leiji-style">(累计)</span></div>
					<div class="item-body-com height-light-1" :class="{'height-light-2':dayInt2 < 66.6}">{{check_day2}}</div>
				</div>
				<div class="day-3 day-com"
					@click="select(3)"
					:class="{ 'boxShadow': 3 == selectedIndex, 'border-style':!examineThird }">
					<div class="item-title">第三天<span class="leiji-style">(累计)</span></div>
					<div class="item-body-com height-light-1" :class="{'height-light-2':dayInt3 < 100}">{{check_day3}}</div>
				</div>

				<div v-if="selectedIndex == 1" class="vertical-line-day1"></div>
				<div v-if="selectedIndex == 2" class="vertical-line-day2"></div>
				<div v-if="selectedIndex == 3" class="vertical-line-day3"></div>
				<div class="vertical-line-1"></div>
				<div class="vertical-line-2 line-com"></div>
				<div class="vertical-line-3 line-com"></div>

				<div class="gong-si-1 gong-si-com">
					<div class="item-title">一公司</div>
					<div v-if="selectedIndex == 1" class="item-body-com height-light-1" :class="{'height-light-2':numlv1 < 33.3}">{{lv1}}</div>
					<div v-if="selectedIndex == 2" class="item-body-com height-light-1" :class="{'height-light-2':numlv1 < 66.6}">{{lv1}}</div>
					<div v-if="selectedIndex == 3" class="item-body-com height-light-1" :class="{'height-light-2':numlv1 < 100}">{{lv1}}</div>
				</div>
				<div class="gong-si-2 gong-si-com">
					<div class="item-title">二公司</div>
					<div v-if="selectedIndex == 1" class="item-body-com height-light-1" :class="{'height-light-2':numlv2 < 33.3}">{{lv2}}</div>
					<div v-if="selectedIndex == 2" class="item-body-com height-light-1" :class="{'height-light-2':numlv2 < 66.6}">{{lv2}}</div>
					<div v-if="selectedIndex == 3" class="item-body-com height-light-1" :class="{'height-light-2':numlv2 < 100}">{{lv2}}</div>
				</div>
				<div class="gong-si-3 gong-si-com">
					<div class="item-title">三公司</div>
					<div v-if="selectedIndex == 1" class="item-body-com height-light-1" :class="{'height-light-2':numlv3 < 33.3}">{{lv3}}</div>
					<div v-if="selectedIndex == 2" class="item-body-com height-light-1" :class="{'height-light-2':numlv3 < 66.6}">{{lv3}}</div>
					<div v-if="selectedIndex == 3" class="item-body-com height-light-1" :class="{'height-light-2':numlv3 < 100}">{{lv3}}</div>
				</div>
				<div class="gong-si-4 gong-si-com">
					<div class="item-title">四公司</div>
					<div v-if="selectedIndex == 1" class="item-body-com height-light-1" :class="{'height-light-2':numlv4 < 33.3}">{{lv4}}</div>
					<div v-if="selectedIndex == 2" class="item-body-com height-light-1" :class="{'height-light-2':numlv4 < 66.6}">{{lv4}}</div>
					<div v-if="selectedIndex == 3" class="item-body-com height-light-1" :class="{'height-light-2':numlv4 < 100}">{{lv4}}</div>
				</div>
				<div class="gong-si-5 gong-si-com">
					<div class="item-title">五公司</div>
					<div v-if="selectedIndex == 1" class="item-body-com height-light-1" :class="{'height-light-2':numlv5 < 33.3}">{{lv5}}</div>
					<div v-if="selectedIndex == 2" class="item-body-com height-light-1" :class="{'height-light-2':numlv5 < 66.6}">{{lv5}}</div>
					<div v-if="selectedIndex == 3" class="item-body-com height-light-1" :class="{'height-light-2':numlv5 < 100}">{{lv5}}</div>
				</div>
			</div>
			<div class="right">
				<div class="check-question">
					<div class="check-title-container">
						<span>检查问题</span>
						<span class="check-title">
							{{sanday?sanday.trouble.total:''}}<span class="check-title-li">&nbsp;例</span>
						</span>
					</div>
					<div class="question-item-container">
						<div class="question-item">
							<div class="question-item-title">安全设施</div>
							<div class="question-item-body">{{sanday?sanday.trouble.security:''}}</div>
						</div>
						<div class="question-item">
							<div class="question-item-title">电器电线</div>
							<div class="question-item-body">{{sanday?sanday.trouble.electric:''}}</div>
						</div>
					</div>
					<div class="question-item-container">
						<div class="question-item">
							<div class="question-item-title">机器渗油</div>
							<div class="question-item-body">{{sanday?sanday.trouble.oilSpill:''}}</div>
						</div>
						<div class="question-item">
							<div class="question-item-title">其他</div>
							<div class="question-item-body">{{sanday?sanday.trouble.other:''}}</div>
						</div>
					</div>
				</div>
			</div>
        </div>

	</div>
</template>


<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'sanday-fugai',
	components: {
		investitemtitle
	},
	data () {
		return {
			lv1:'',
			lv2:'',
			lv3:'',
			lv4:'',
			lv5:'',
			numlv1:'',
			numlv2:'',
			numlv3:'',
			numlv4:'',
			numlv5:'',
			selectedIndex:0,
			examineFirst:null,
			examineSecond:null,
			examineThird:null,
			check_day1:'',
			check_day2:'',
			check_day3:'',
			dayInt1:0,
			dayInt2:0,
			dayInt3:0,
			checked:0,
			maxLen:0,
		}
	},
	mounted(){
		// 三天一覆盖执行情况
		this.$store.dispatch('locomotiveguarantee/sanday');
	},
	methods:{
		select(index){
			if(index > this.maxLen){
				return;
			}

			if(index==1){
				for(let i = 1;i < this.examineFirst.length; i++){
					this[`lv${i}`] = this.examineFirst[i].rate + '%';
					this[`numlv${i}`] = Number(this.examineFirst[i].rate);
				}
			}else if(index==2){
				for(let j = 1;j < this.examineSecond.length; j++){
					this[`lv${j}`] = this.examineSecond[j].rate + '%';
					this[`numlv${j}`] = Number(this.examineSecond[j].rate);
				}
			}else if(index==3){
				for(let k = 1;k < this.examineThird.length; k++){
					this[`lv${k}`] = this.examineThird[k].rate + '%';
					this[`numlv${k}`] = Number(this.examineThird[k].rate);
				}
			}
			this.selectedIndex = index;
		}
	},
	computed:{
		...mapState('locomotiveguarantee',{
			sanday(state){
				if(state.sanday){
					let data = state.sanday;

					let examineThird = data.examine.third;
					let examineSecond = data.examine.second;
					let examineFirst = data.examine.first;

					if(examineThird){ //第三天
						this.examineThird = examineThird;
						this.check_day3 = `${examineThird[0].rate}%`;
						this.dayInt3 = Number(examineThird[0].rate);
						this.maxLen = 3;
						this.selectedIndex = 3;

						this.examineSecond = examineSecond;
						this.check_day2 = `${examineSecond[0].rate}%`;
						this.dayInt2 = Number(examineSecond[0].rate);

						this.examineFirst = examineFirst;
						this.check_day1 = `${examineFirst[0].rate}%`;
						this.dayInt1 = Number(examineFirst[0].rate);

						//已执行检查车辆计算
						let yRate = Number(examineThird[0].rate);
						if(state.jiwu_cheliangzongti){
							this.checked = parseInt(state.jiwu_cheliangzongti.inUse * yRate / 100);
						}
						this.select(3);

					}else if(examineSecond){ //第二天
						this.examineSecond = examineSecond;
						this.check_day2 = `${examineSecond[0].rate}%`;
						this.dayInt2 = Number(examineSecond[0].rate);
						this.maxLen = 2;
						this.selectedIndex = 2;

						this.examineFirst = examineFirst;
						this.check_day1 = `${examineFirst[0].rate}%`;
						this.dayInt1 = Number(examineFirst[0].rate);
						
						//已执行检查车辆计算
						let yRate = Number(examineSecond[0].rate);
						if(state.jiwu_cheliangzongti){
							this.checked = parseInt(state.jiwu_cheliangzongti.inUse * yRate / 100);
						}
						this.select(2);

					}else{ //第一天
						this.examineFirst = examineFirst;
						this.check_day1 = `${examineFirst[0].rate}%`;
						this.dayInt1 = Number(examineFirst[0].rate);
						this.maxLen = 1;
						this.selectedIndex = 1;

						//已执行检查车辆计算
						let yRate = Number(examineFirst[0].rate);
						if(state.jiwu_cheliangzongti){
							this.checked = parseInt(state.jiwu_cheliangzongti.inUse * yRate / 100);
						}
						this.select(1);

					}

					return data;
				}
				return null;
			}
		}),
	},
}
</script>

<style lang="postcss" scoped>
#sanday-fugai{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
	width: 1560px;
	height: 100%;
	padding: 20px 40px;
	border: 1.25px solid #4089FF;
	box-sizing: border-box;
	background-color: #000015;
}
.outer-text{
	font-size: 30px;
}
.inner-text{
	font-size: 45px;
	color: #02FF9A;
}
.bottom-container{
    flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

/* left */
.left{
	position: relative;
	width: 960px;
	height: 100%;
}
.day-com{
	position: absolute;
	bottom: 280px;
	width: 290px;
	height: 150px;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
}
.day-1{
	border-width: 2.5px;
	border-color: #4089FF;
	left: 0;
	cursor: pointer;
}
.day-2{
	border-width: 2.5px;
	border-color: #4089FF;
	left: 340px;
	cursor: pointer;
}
.day-3{
	border-width: 2.5px;
	border-color: #4089FF;
	left: 670px;
	line-height: 150px;
	text-align: center;
	cursor: pointer;
}
.border-style{
	border-style: dashed;
}
.boxShadow{
	box-shadow: inset 0 0 40px 0 #3D84F6;
}
.item-title{
	height: 75px;
	line-height: 85px;
	text-align: center;
}
.leiji-style{
	font-size: 30px;
}
.item-body-com{
	height: 75px;
	line-height: 60px;
	text-align: center;
	/* color: #02FF9A; */
}
.height-light-1{
	color: #02FF9A;
}
.height-light-2{
	color: #E8FF78;
}
.vertical-line-day1{
	position: absolute;
	left: 143px;
	bottom: 188px;
	width: 0;
	height: 90px;
	border: 2px solid #4089FF;
	border-right-style: none;
}
.vertical-line-day2{
	position: absolute;
	left: 485px;
	bottom: 188px;
	width: 0;
	height: 90px;
	border: 2px solid #4089FF;
	border-right-style: none;
}
.vertical-line-day3{
	position: absolute;
	left: 815px;
	bottom: 188px;
	width: 0;
	height: 90px;
	border: 2px solid #4089FF;
	border-right-style: none;
}
.line-com{
	position: absolute;
	bottom: 147px;
	width: 585px;
	height: 42px;
	border: 2px solid #4089FF;
	border-bottom-style: none;
	box-sizing: border-box;
}
.vertical-line-1{
	position: absolute;
	left: 485px;
	bottom: 148px;
	width: 0;
	height: 36px;
	border: 2px solid #4089FF;
	border-right-style: none;
}
.vertical-line-2{
	left: 95px;
}
.vertical-line-3{
	left: 290px;
}
.gong-si-com{
	position: absolute;
	bottom: 0;
	width: 170px;
	height: 150px;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
}
.gong-si-1{
	left: 0;
}
.gong-si-2{
	left: 205px;
}
.gong-si-3{
	left: 400px;
}
.gong-si-4{
	left: 595px;
}
.gong-si-5{
	left: 790px;
}

/* right */
.right{
	flex: 1;
	position: relative;
	height: 100%;
}
.check-question{
	background-color: #000000;
	position: absolute;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 460px;
	height: 390px;
	padding: 10px 0;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
}
.check-title-container{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 420px;
	height: 77.5px;
	border-bottom: 5px solid #4089FF;
	box-sizing: border-box;
}
.check-title{
	color: #FF3939;
}
.check-title-li{
	color: #FFFFFF;
	font-size: 30px;
}
.question-item-container{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 420px;
	height: 125px;
	box-sizing: border-box;
}
.question-item{
	width: 200px;
	height: 125px;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
}
.question-item-title{
	height: 62.5px;
	line-height: 62.5px;
	text-align: center;
}
.question-item-body{
	height: 62.5px;
	line-height: 50px;
	text-align: center;
	color: #FF3939;
}
</style>