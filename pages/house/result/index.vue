<template>
	<view class="content">
		<view class="result">
			<view class="result-key">
				月还款
			</view>
			<view class="result-value">
				{{result.payment}} 元
			</view>
		</view>
		
		<view class="result">
			<view class="result-key">
				贷款总额
			</view>
			<view class="result-value">
				{{result.price}} 万
			</view>
		</view>
		
		<view class="result">
			<view class="result-key">
				支付利息
			</view>
			<view class="result-value">
				{{result.totalinterset}} 元
			</view>
		</view>
		
		<view class="result">
			<view class="result-key">
				本息总额
			</view>
			<view class="result-value">
				{{result.total}} 元
			</view>
		</view>
		
		<view class="result">
			<view class="result-key">
				还款月数
			</view>
			<view class="result-value">
				{{result.payments}} 月
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result:{}
			}
		},
		onLoad(options) {
			console.log(options)
			this.result = options
		},
		computed:{
			total(){
				let num = this.result.price * 10000 + this.result.totalinterset * 1
				return num
			}
		},
		mounted() {
			
		},
		methods: {
			 forDight(_num,_x){
			
			 var n = 1;
			
			 for(var i=0;i<_x;i++){
			    n=n*10;
			 }
			 return Math.round(_num*n)/n;
			}
		}
	}
</script>

<style>
.result{
	display: flex;
	justify-content: space-between;
	padding: 24rpx 30rpx;
	border-bottom: 1rpx solid #dfdfdf;
	font-weight: 700;
	font-size: 28rpx
	
}
</style>
