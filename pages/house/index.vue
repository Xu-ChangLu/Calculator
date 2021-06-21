<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" active-color="#ff5500" bar-width="100" :current="current"
			@change="change"></u-tabs>
		<view class="u-tabs-item" v-show="current == 0 || current == 1">
			<u-form :model="form" ref="uForm">
				<u-form-item label="贷款金额:" label-width="240">
					<u-input v-model="form.price" /><text>万</text>
				</u-form-item>
				<u-form-item label="结算方式:" label-width="240">
					<u-radio-group v-model="form.payment">
						<u-radio v-for="(item, index) in payment" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="贷款年限:" label-width="240">
					<u-input v-model="form.year" /><text>年</text>
				</u-form-item>
				<u-form-item label="商业年利率:" label-width="240" v-show="current !== 1">
					<view style="width: 100%;" @click="selectShow = true">
						{{form.select}}
					</view>
					<u-select v-model="selectShow" @confirm="confirm" :list="options"></u-select>
				</u-form-item>
				<u-form-item label="商业年利率:" label-width="240">
					<u-input v-model="form.interest" /><text>%</text>
				</u-form-item>
			</u-form>
		</view>
		<view class="u-tabs-item" v-show="current == 2">
			<u-form :model="form" ref="uForm">
				<u-form-item label="公积金贷款金额:" label-width="240">
					<u-input v-model="form.price" /><text>万</text>
				</u-form-item>
				<u-form-item label="商业贷款金额:" label-width="240">
					<u-input v-model="form.price1" /><text>万</text>
				</u-form-item>
				<u-form-item label="结算方式:" label-width="240">
					<u-radio-group v-model="form.payment">
						<u-radio v-for="(item, index) in payment" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="贷款年限:" label-width="240">
					<u-input v-model="form.year" /><text>年</text>
				</u-form-item>
				<u-form-item label="商业年利率:" label-width="240">
					<view style="width: 100%;" @click="selectShow = true">
						{{form.select}}
					</view>
					<u-select v-model="selectShow" @confirm="confirm" :list="options"></u-select>
				</u-form-item>
				<u-form-item label="公积金年利率:" label-width="240">
					<u-input v-model="form.interest1" /><text>%</text>
				</u-form-item>
				<u-form-item label="商业年利率:" label-width="240">
					<u-input v-model="form.interest" /><text>%</text>
				</u-form-item>
			</u-form>
		</view>
		<view class="button">
			<u-button class="button-u" style="background-color: #ff5500;color: #FFFFFF;" @click="submit">开始计算</u-button>
		</view>
	</view>
</template>

<script>
	import calcute from './js/calculate.js'
	export default {
		data() {
			return {
				selectShow: false,
				form: {
					price: '1',
					price1: '1',
					payment: '等额本息',
					year: '1',
					interest: '',
					interest1: 3.25,
					select: ''
				},
				options: [{
						label: '最基准利率7折',
						value: 3.43,

					},
					{
						label: '最基准利率7.5折',
						value: 3.68,
					},
					{
						label: '最基准利率8折',
						value: 3.92,
					},
					{
						label: '最基准利率8.5折',
						value: 4.17,
					},
					{
						label: '最基准利率9折',
						value: 4.41,
					},
					{
						label: '最基准利率9.5折',
						value: 4.66,
					},
					{
						label: '最基准利率',
						value: 4.90,
					},
					{
						label: '最基准利率1.1倍',
						value: 5.39,
					},

					{
						label: '最基准利率1.2倍',
						value: 5.88,
					},

					{
						label: '最基准利率1.3倍',
						value: 6.37,
					}
				],
				payment: [{
						name: '等额本息'
					},
					{
						name: '等额本金'
					}
				],
				list: [{
					name: '商业贷款'
				}, {
					name: '公积金贷款'
				}, {
					name: '组合贷款',
				}],
				current: 0,
				tog: 0
			}
		},
		onLoad() {
			this.form.select = this.options[6].label;
			this.form.interest = this.options[6].value;
		},
		watch: {
			current(val, oldVal) {
				if ([0, 2].includes(val)) {
					this.form.select = this.options[6].label;
					this.form.interest = this.options[6].value;
				} else if (val == 1) {
					this.form.interest = 3.25
				}
			}
		},
		methods: {
			change(index) {
				this.current = index;
			},
			confirm(e) {
				this.form.select = e[0].label;
				this.form.interest = e[0].value;
			},
			submit() {
				/**
				 * @type 结算方式
				 * @num 贷款金额
				 * @gnum 组合贷款中公积金的金额   
				 * @year 贷款年限 
				 * @live 商贷利率
				 * @glive 公积金贷款利率
				 * */
				let type = this.form.payment == '等额本息' ? 1 : 2;
				let num = this.form.price;
				let gnum = this.form.price1;
				let year = this.form.year;
				let live = +this.form.interest / 100;
				let glive = +this.form.interest1 / 100;
				let result = [];
				if (this.current == 2)
					result = calcute.zuhe(type, num, gnum, year, year, live, glive)
				else
					result = calcute.singleDk(type, num, year, live)
				/**
				 * @price 贷款总额
				 * @payment 月还款 -> @monthlyPayment
				 * @totalinterset 支付利息   
				 * @total 本息总额 
				 * @payments 还款月数
				 * */
				let {
					yuegong: payment,
					totalLixi: totalinterset,
					totalPrice: total,
				} = result
				let monthlyPayment = payment.toFixed(2)
				totalinterset = totalinterset.toFixed(2)
				total = total.toFixed(2)
				if (type == 2) {
					let {
						yuegongdijian
					} = result
					yuegongdijian = yuegongdijian.toFixed(1)
					monthlyPayment = `首月${payment.toFixed(2)},月减${yuegongdijian}`

				}
				if (this.current == 2) num = +num + +gnum
				uni.navigateTo({
					url: `./result/index?price=${num}&payments=${year*12}&payment=${monthlyPayment}&total=${total}&totalinterset=${totalinterset}`
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.u-tabs-item {
		padding: 10rpx 40rpx;
	}

	.button {
		position: fixed;
		left: 0;
		bottom: 8%;
		width: 100%;
		padding: 0 40rpx;

	}
</style>
