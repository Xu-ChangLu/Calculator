<template>
	<view class="content">
		<view class="header">
			<view class="header-top">
				到手所得（元）
			</view>
			<view class="header-content">
				{{income}}
			</view>
			<view class="header-bottom">
				税前收入：{{beforeTaxes.price}}元
			</view>
		</view>

		<view class="body">
			<view class="title">
				<view class="title-origin"></view>
				<text class="title-text">税前收入</text>
			</view>
			<view class="list">
				<view class="list-key">
					个人社保：
				</view>
				<view class="list-val">
					0元
				</view>
			</view>

			<view class="list">
				<view class="list-key">
					个人公积金：
				</view>
				<view class="list-val">
					{{beforeTaxes.reserved_funds}}元
				</view>
			</view>
			<view class="list">
				<view class="list-key">
					个人所得税：
				</view>
				<view class="list-val">
					0元
				</view>
			</view>


			<view class="title">
				<view class="title-origin"></view>
				<text class="title-text">税前收入</text>
			</view>

			<view class="list">
				<view class="list-key">
					养老：
				</view>
				<view class="list-val">
					{{beforeTaxes.provide_aged}}元
				</view>
			</view>
			<view class="list">
				<view class="list-key">
					医疗：
				</view>
				<view class="list-val">
					{{beforeTaxes.medical_treatment}}元
				</view>
			</view>
			<view class="list">
				<view class="list-key">
					失业：
				</view>
				<view class="list-val">
					{{beforeTaxes.unemployment}}元
				</view>
			</view>

			<view class="list">
				<view class="list-key">
					工伤：
				</view>
				<view class="list-val">
					{{beforeTaxes.occupational_injury}}元
				</view>
			</view>
			<view class="list">
				<view class="list-key">
					生育：
				</view>
				<view class="list-val">
					{{beforeTaxes.give_birth}}元
				</view>
			</view>

			<view class="list">
				<view class="list-key">
					公积金：
				</view>
				<view class="list-val">
					{{beforeTaxes.reserved_funds}}元
				</view>
			</view>



		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				beforeTaxes: {},
				income: 0
			}
		},
		onLoad(options) {
			/**
			 *  @reserved_funds 公积金
			 *	@medical_treatment 医疗
			 *	@provide_aged 养老
			 *	@unemployment 失业
			 *	@occupational_injury 工伤
			 *	@give_birth 生育
			 * */
			this.beforeTaxes = {
				...options
			}
			let num = 0
			for (var key in options) {
				if (key !== 'price')
					num += parseFloat(options[key])
			}
			this.income = options.price - nu
			this.incomeTax(this.beforeTaxes.price)
		},
		methods: {
			incomeTax(x) {
				let r = 0;
				var z = x - 3500;
				if (x <= 1500) r = "您需要上的税0"
				else if (z <= 1500) {
					r = x - z * 0.03;
				} else if (z <= 4500) {
					r = x - (z * 0.10 - 105);
				} else if (z <= 9000) {
					r = x - (z * 0.20 - 555);
				} else if (z <= 35000) {
					r = x - (z * 0.25 - 1005);
				} else if (z <= 55000) {
					r = x - (z * 0.30 - 2755);
				} else if (z <= 80000) {
					r = x - (z * 0.35 - 5505);
				} else r = x - (z * 0.45 - 13505);
			console.log(r)
			



			return
			if (val <= 5000) {
				return val
			} else {
				let sign = val - 5000
				let aaa = 0
				if (sign <= 3000) {
					sign = sign - 3000

				} else if (sign)

					return 1
			}

		}
	}
	}
</script>

<style scoped lang="scss">
	.header {
		// background-color: #007AFF;
		color: #FFFFFF;
		width: 100%;
		height: 350rpx;
		text-align: center;
		background: url(../../../static/income-result-bg.jpg);

		&-top {
			height: 120rpx;
			line-height: 120rpx;
		}

		&-content {
			height: 140rpx;
			line-height: 140rpx;
			font-size: 42rpx;
			font-weight: 700;
		}

		&-bottom {
			height: 100rpx;
			line-height: 100rpx;
		}
	}

	.body {
		padding: 30rpx;
	}

	.title {
		display: flex;
		justify-content: left;
		margin: 20rpx 0;

		&-origin {
			width: 10rpx;
			background-color: #ff5500;
		}

		&-text {
			font-size: 30rpx;
			height: 30rpx;
			line-height: 30rpx;
			margin-left: 20rpx;
		}
	}

	.list {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
	}
</style>
