<template>
	<div class="item-title">
		<div class="title-text">{{titleName}}</div>
		<div class="icon-bar">
			<div class="icon">
				<div class="dot"></div>
				<div class="dot"></div>
				<div class="dot"></div>
			</div>
			<div class="line">
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'invest-item-title',
	props: {
		titleName: String,
	}
}
</script>

<style scoped lang="postcss">
.item-title{
	width: auto;
	height: 70px;
	display: flex;
	justify-content: space-between;
}
.item-title .title-text{
	font-family: PingFangSC-Medium;
	font-size: 50px;
	line-height: 70px;
	color: #FFF;
}
.item-title .icon-bar{
	position: relative;
	top: -10px;
	
	flex-grow: 1;

	height: 70px;
	margin-left: 5px;
	padding-left: 40px;
}

.item-title .icon-bar .icon{
	position: absolute;
	left: 5px;
	bottom: 0px;
	width: 45px;
	height: 18x;
	display: flex;
	justify-content: flex-start;
}
.item-title .icon-bar .icon .dot{
	width: 10px;
	height: 18px;
	margin-right: 5px;
	background: #4089FF;
	transform: skewX(-30deg);
}

.item-title .icon-bar .line{
	width: auto;
	height: 65px;
	border-bottom: 5px solid #4089FF;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
}
</style>