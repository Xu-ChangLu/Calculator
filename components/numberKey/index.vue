<template>
	<view>
		<view class="num">
			<view class="sex" v-if="is_sex" >
				<u-radio-group v-model="sex" @change="$emit('fnSexChange',sex)">
					<u-radio name='1'>男</u-radio>
					<u-radio name='0'>女</u-radio>
				</u-radio-group>
				<view class="sex-c" >
					<u-button @click="$emit('fnClickNum','C')" size="mini">清空</u-button>
				</view>
			</view>
			<u-grid :col="4">
				<u-grid-item v-for="(item,index) in num" :key="index" @click="$emit('fnClickNum',item)"
					:custom-style="customStyleGrid">
					<view class="grid-text">{{item}}</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			num: {
				type: Array,
				default: function() {
					return [
						'7', '8', '9', 'c',
						'4', '5', '6', '',
						'1', '2', '3', '',
						'0', '00', '.', '删除'
					]
				}
			},
			is_sex:{
				type:Boolean,
				default:function(){
					return false
				}
			}
		},
		data() {
			return {
				customStyleGrid: {
					padding: '50rpx 0',
				},
				sex:'1'
			}
		},
		onLoad() {

		},
		methods: {
			sexChange(){
				this.$parent.fnSexChange(this.sex)
			}
		}
	}
</script>

<style>
	.sex{
		padding: 30rpx 40rpx;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.num {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.grid-text {
		height: 120rpx;
		line-height: 120rpx;
		font-size: 40rpx;
		font-weight: 500;
	}
</style>
