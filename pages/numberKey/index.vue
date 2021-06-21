<template>
	<view>
		<view class="old-input">
			<!-- oldInput -->
			<view class="old-input-item" v-if="oldInput.length >=2">
				{{oldInput[oldInput.length - 2]}}
			</view>
			<view class="old-input-item" v-if="oldInput.length >=1">
				{{oldInput[oldInput.length - 1]}}
			</view>
		</view>
		<view class="present-input">
			{{inputChange}}
		</view>
		<view class="num">
			<u-grid :col="4">
				<u-grid-item v-for="(item,index) in num" @click="fnClickNum(item)" :key="index"
					:custom-style="item == '='?{'background-color':'#F0AD4E','color':'#fff'}:{'padding': '30rpx 0'}">
					<view class="grid-text">{{item}}</view>
				</u-grid-item>
			</u-grid>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: [
					'c', '%', '删除', '÷',
					'7', '8', '9', 'x',
					'4', '5', '6', '-',
					'1', '2', '3', '+',
					'0', '00', '.', '=',
				],
				inputChange: '0',
				count: '',
				oldInput: [],
			}
		},
		methods: {
			fnClickNum(key) {
				console.log(key)
				let operation = this.inputChange[this.inputChange.length - 1]
				if (key == '删除') {
					if (this.inputChange.length <= 1) {
						this.inputChange = '0'
					} else {
						this.inputChange = this.inputChange.slice(0, this.inputChange.length - 1)
					}
				} else if (key == 'c') {
					this.inputChange = '0'
					this.oldInput = []
				} else if (key == '+' || key == '-' || key == 'x' || key == '÷') {
					if (operation !== '+' && operation !== '-' && operation !== 'x' && operation !== '÷') {
						this.inputChange += key
					}
				} else if (key == '.') {
					// -------------------逻辑错误 t
					console.log(this.inputChange)
					if (this.inputChange.indexOf('.') == -1) {
						this.inputChange += key
					}
				} else if (key == '=' || key == '%') {
					if (this.inputChange.indexOf('=') != -1) return
					if (operation == '+' || operation == '-' || operation == 'x' || operation == '÷') {
						// if(['+','-','x','÷'].includes(operation)){
						this.inputChange = this.inputChange.slice(0, this.inputChange.length - 1)
						console.log(111111112)
					}
					this.inputChange += key
					this.oldInput.push(this.inputChange)
					let val = this.inputChange.replace(/x/g, '*').replace(/÷/g, '/').replace(/=/g, '').replace(/%/g,
						'/100')
					try {
						this.count = eval(val)
					} catch (e) {
						console.log('eval is undefined', e)
					}
					this.inputChange = JSON.stringify(JSON.parse(this.count))
				} else if (this.inputChange.length == 1 && this.inputChange == 0) {
					this.inputChange = key
				} else {
					this.inputChange += key
				}


			}
		}
	}
</script>

<style scoped lang="scss">
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
		font-weight: 700;
	}

	.old-input {
		height: 400rpx;
		width: 100%;
		padding-top: 60rpx;
	}

	.old-input-item {
		font-size: 50rpx;
		color: red;
		/* float: right; */
		text-align: right;
		margin: 20rpx 40rpx;

	}

	.present-input {
		text-align: right;
		font-size: 60rpx;
		padding: 0 40rpx;

	}
</style>
