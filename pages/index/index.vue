<template>
	<view class="content">
		<u-grid :col="3">
			<u-grid-item v-for="(item,index) in list" @click="navGetTo(item.url)" :key="index"
				:custom-style="customStyleGrid">
				<image :src="item.src" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<view class="grid-text">{{item.name}}</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	import mixin from '../../config/mixin.js'
	export default {
		data() {
			return {
				customStyleGrid: {
					padding: '100rpx 0',
				},
				list: [{
					name: '科学计算器',
					icon: 'photo',
					url: '../numberKey/index',
					src:'../../static/index/index-numberKey.png'
				}, {
					name: '大写金额',
					icon: 'photo',
					url: '../capital/index',
					src:'../../static/index/index-capital.png'
				},  {
					name: '个税计算',
					icon: 'photo',
					url: '../income/index',
					src:'../../static/index/index-income.png'
				}, {
					name: '房贷计算',
					icon: 'photo',
					url: '../house/index',
					src:'../../static/index/index-house.png'
				}, {
					name: '时间换算',
					icon: 'photo',
					url: '../time/index',
					src:'../../static/index/index-time.png'
				}, {
					name: '亲戚计算器',
					icon: 'photo',
					url: '../relative/index',
					src:'../../static/index/index-relative.png'
				},{
					name: '重量换算',
					icon: 'photo',
					url: '../numberKey/index',
					src:'../../static/index/index-numberKey.png'
				}, {
					name: '面积换算',
					icon: 'photo',
					url: '../numberKey/index',
					src:'../../static/index/index-numberKey.png'
				}, {
					name: '体积换算',
					icon: 'photo',
					url: '../numberKey/index',
					src:'../../static/index/index-numberKey.png'
				}, {
					name: '长度换算',
					icon: 'photo',
					url: '../numberKey/index',
					src:'../../static/index/index-numberKey.png'
				}, {
					name: '速度换算',
					icon: 'photo',
					url: '../numberKey/index',
					src:'../../static/index/index-numberKey.png'
				}, 
				 {
					name: '汇率计算',
					icon: 'photo',
					url: '../numberKey/index',
					src:'../../static/index/index-numberKey.png'
				},
				
				]
			}
		},
		components: {},
		mixins: [mixin],
		onLoad() {},
		methods: {
			navGetTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.grid-text {
		color: #C0C0C0;
		margin-top: 30rpx;
	}
</style>
