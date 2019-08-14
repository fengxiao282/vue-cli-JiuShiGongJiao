<template>
	<div class="item-header">
		<div class="col-1">{{titleName}}</div>
		<div class="col-2"></div>
		<div class="col-3"></div>
		<div class="col-4">{{titleTime}}</div>
	</div>
</template>

<script>
export default {
	name: 'subitemheader',
	props: {
		titleTime: String,
		titleName: String,
	}
}
</script>

<style scoped lang="postcss">
.item-header{
	width: auto;
	height: 90px;
	display: flex;
	justify-content: space-between;
}
.col-1{
	width: auto;
	height: 92px;
	box-sizing: border-box;

	font-family: PingFangSC-Regular;
	font-size: 50px;
	line-height: 70px;
	color: #368CFF;
}
.col-2{
	width: 30px;
	height: 35px;
	border-bottom:2px solid #002846;
}
.col-3{
	width: 39px;
	height: 37px;
	box-sizing: border-box;
	border-bottom: 2px solid #002846;	
	transform-origin: left bottom;
	transform: skewY(45deg);
}
.col-4{
	height: 74px;
	flex-grow: 1;
	border-bottom: 2px solid #002846;	

	font-size: 40px;
	line-height: 100px;
	color: #368CFF;
	font-family: PingFangSC-Regular;
	text-align: right;
}
</style>