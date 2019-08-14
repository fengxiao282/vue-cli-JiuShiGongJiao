<template>
<div id="archives-detaile"> <!-- 配置档案列表详情 -->
	<div class="archives-detaile-body">
		配置详情 --- {{info}}
	</div>
</div>
</template>
<script>
// import { mapState,mapGetters } from 'vuex';

export default {
	name: 'archives-detaile',
	props:{
		info:Number,
	},
	components: {
	},
	data () {
		return {
		}
	},
	mounted(){
	},
	methods:{
	},
	computed:{
	},
}
</script>

<style lang="postcss" scoped>
#archives-detaile{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 1080px;
	font-family: PingFangSC-Regular;
}
.archives-detaile-body{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 3195px;
	height: 1000px;
	box-shadow: inset 0 0 20px 0 #008BFF;
	border-radius: 10px;
	background-color: #000000;
}
</style>