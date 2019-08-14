<template>
	<div class="item-header">
		<div class="col-1">{{titleName}}</div>
		<div class="col-2"></div>
		<div class="col-3">{{titleYear}}</div>
	</div>
</template>

<script>
export default {
	name: 'core-item-header',
	props: {
		titleYear: String,
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
.item-header .col-1{
	width: auto;
	height: 90px;
	box-sizing: border-box;
	border-bottom: 2px solid #002846;

	font-family: PingFangSC-Regular;
	font-size: 50px;
	line-height: 70px;
	color: #368CFF;
}
.item-header .col-2{
	width: 39px;
	height: 90px;
	box-sizing: border-box;
	border-bottom: 2px solid #002846;	
	transform-origin: left bottom;
	transform: skewY(-45deg);
}
.item-header .col-3{
	height: 50px;
	flex-grow: 1;
	border-bottom: 2px solid #002846;	

	font-size: 30px;
	line-height: 65px;
	color: #094BA4;
	font-family: PingFangSC-Regular;
	text-align: right;
}
</style>