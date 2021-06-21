<template>
	<view class="content">

		<view class="selsect">
			<view class="selsect-left" @click="fnShowClick('show1')">
				<view class="selsect-text">
					{{timeChangeValue1}}
				</view>
				<u-icon name="arrow-down-fill selsect-icon"></u-icon>
			</view>
			<view class="selsect-right">
				<view class="">
					{{inputValueChange}}
				</view>
				<view class="selsect-label">
					{{timeChangeLabel1}}
				</view>
			</view>
		</view>
		<u-line color="#ccc" />
		<view class="selsect">
			<view class="selsect-left" @click="fnShowClick('show2')">
				<view class="selsect-text ccc">
					{{timeChangeValue2}}
				</view>
				<u-icon name="arrow-down-fill" class="ccc"></u-icon>
			</view>
			<view class="selsect-right">
				<view class="ccc">
					{{numComputedValue}}
				</view>
				<view class="selsect-label">
					{{timeChangeLabel2}}
				</view>
			</view>
		</view>
		<u-select v-model="show1" mode="mutil-column-auto" title="选择单位" :list="time1" @confirm="confirm"></u-select>
		<number-key @fnClickNum="fnClickNum"></number-key>
	</view>
</template>

<script>
	import numberKey from '../../components/numberKey/index.vue'
	export default {
		components: {
			numberKey
		},
		data() {
			return {
				show1: false,
				show2: false,
				time: '',
				time1: [{
						value: 'yr',
						label: '年 yr',
						key: ''
					},
					{
						value: 'wk',
						label: '周 wk'
					},
					{
						value: 'day',
						label: '天 day'
					},
					{
						value: 'h',
						label: '小时 h'
					},
					{
						value: 'min',
						label: '分钟 min'
					},
					{
						value: 's',
						label: '秒 s'
					},
					{
						value: 'ms',
						label: '毫秒 ms'
					},
					{
						value: 'us',
						label: '微妙 us'
					},
				],
				timeChangeValue1: '',
				timeChangeLabel1: '',
				timeChangeValue2: '',
				timeChangeLabel2: '',
				inputValueChange: '1',
			}
		},
		onLoad() {
			this.timeChangeValue1 = this.time1[4].label;
			this.timeChangeLabel1 = this.time1[4].value;
			this.timeChangeValue2 = this.time1[5].label;
			this.timeChangeLabel2 = this.time1[5].value;
		},
		computed: {
			numComputedValue() {
				let yr = this.inputValueChange * 1,
					wk = yr * 7 / 365,
					day = yr / 365,
					h = day / 24,
					min = h / 60,
					s = min / 60,
					ms = s / 1000,
					us = ms / 1000000;
				if (this.timeChangeLabel1 == this.timeChangeLabel2) return yr;
				if (this.timeChangeLabel1 == 'yr') return this.computedNum(yr);
				else if (this.timeChangeLabel1 == 'wk') return this.computedNum(wk);
				else if (this.timeChangeLabel1 == 'day') return this.computedNum(day);
				else if (this.timeChangeLabel1 == 'h') return this.computedNum(h);
				else if (this.timeChangeLabel1 == 'min') return this.computedNum(min);
				else if (this.timeChangeLabel1 == 's') return this.computedNum(s);
				else if (this.timeChangeLabel1 == 'ms') return this.computedNum(ms);
				else if (this.timeChangeLabel1 == 'us') return this.computedNum(us);
			}
		},
		methods: {
			computedNum(yr) {
				let computed = 0;
				if (this.timeChangeLabel2 == 'yr') computed = yr;
				else if (this.timeChangeLabel2 == 'wk') computed = (yr * 365) / 7;
				else if (this.timeChangeLabel2 == 'day') computed = yr * 365;
				else if (this.timeChangeLabel2 == 'h') computed = yr * 365 * 24;
				else if (this.timeChangeLabel2 == 'min') computed = yr * 365 * 24 * 60;
				else if (this.timeChangeLabel2 == 's') return (yr * 365 * 24 * 60 * 60).toFixed();
				else if (this.timeChangeLabel2 == 'ms') return (yr * 365 * 24 * 60 * 60 * 1000).toFixed();
				else if (this.timeChangeLabel2 == 'us') return (yr * 365 * 24 * 60 * 60 * 1000000).toFixed();
				return +computed.toFixed(20);
			},
			fnClickNum(key) {
				if (key == '删除' && this.inputValueChange == 0 && this.inputValueChange.length == 0) return
				if (this.inputValueChange == 0 && key != '删除' && key != 'c') {
					if (this.inputValueChange == 0 && this.inputValueChange.length <= 1 && key == '00') console.log();
					 else if (this.inputValueChange == 0 && key == '.') this.inputValueChange = '0.';
					 else if (this.inputValueChange.length == 1 && this.inputValueChange == 0) this.inputValueChange = key;
					 else this.inputValueChange += key;
				} else if (key == 'c') this.inputValueChange = '0';
				 else if (key == '.') {
					if (this.inputValueChange.indexOf('.') == -1) this.inputValueChange += key;
				} else if (key == '删除') {
					this.inputValueChange = this.inputValueChange.slice(0, this.inputValueChange.length - 1);
					if (this.inputValueChange == '') {
						this.inputValueChange += 0;
					}
				} else {
					this.inputValueChange += key;
				}
			},
			fnShowClick(key) {
				this.show1 = true
				this.confirmChange = key
			},
			confirm(e) {
				if (this.confirmChange == 'show1') {
					this.timeChangeValue1 = e[0].label;
					this.timeChangeLabel1 = e[0].value;
				}
				if (this.confirmChange == 'show2') {
					this.timeChangeValue2 = e[0].label;
					this.timeChangeLabel2 = e[0].value;
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.ccc {
		color: #000 !important;
	}

	.selsect {
		width: 100%;
		height: 240rpx;
		text-align: center;
		display: flex;
		flex: 1;
		justify-content: space-around;
		color: #ff5500;
		;

		&-left {
			display: flex;
			flex: 1;
			width: 35%;
			line-height: 240rpx;
			text-align: center;
			padding-left: 30rpx;
		}

		&-text {
			font-size: 40rpx;
			margin-right: 20rpx;
		}

		&-icon {
			color: #333333;
		}

		&-right {
			width: 65%;
			font-size: 42rpx;
			color: #ff5500;
			;
			padding-right: 30rpx;
			padding-top: 70rpx;
			text-align: right;
			word-wrap: break-word;
		}

		&-label {
			font-size: 21rpx;
			color: #333333;
		}
	}
</style>
