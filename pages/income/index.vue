<template>
	<view class="content">
		<view class="">
			<u-form :model="form" ref="uForm">
				<u-form-item label="" label-width="200" :border-bottom="false">
					<view class="title">
						<view class="title-origin"></view>
						<text class="title-text">税前收入</text>
					</view>
				</u-form-item>
				<u-form-item label="税前收入" label-width="200" class="aaa">
					<u-input v-model="form.price" type="number" placeholder="请输入" input-align="center" :clearable="false" />
					<text style="margin-left: 40rpx;">元</text>
				</u-form-item>
				<u-form-item label="所在地" label-width="200" class="aaa">
					<u-input v-model="form.city" type="select" @click="fnClickCity" input-align="center"
						:clearable="false" />
					<u-select v-model="cityShow" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
				</u-form-item>
				<u-form-item label="" label-width="200" :border-bottom="false">
					<view class="title">
						<view class="title-origin"></view>
						<text class="title-text">五险一金</text>
					</view>
				</u-form-item>
				<u-form-item label="公积金" label-width="200" class="aaa">
					<view class="form-item">
						<u-input v-model="form.reserved_funds" type="number" placeholder="请输入" input-align="center "
							:clearable="false" />
						<text>%</text>
					</view>
				</u-form-item>
				<u-form-item label="医疗" label-width="200" class="aaa">
					<view class="form-item">
						<u-input v-model="form.medical_treatment" type="number" placeholder="请输入" input-align="center "
							:clearable="false" />
						<text>%</text>
					</view>
				</u-form-item>
				<u-form-item label="养老" label-width="200" class="aaa">
					<view class="form-item">
						<u-input v-model="form.provide_aged" type="number" placeholder="请输入" input-align="center "
							:clearable="false" />
						<text>%</text>
					</view>
				</u-form-item>
				<u-form-item label="失业" label-width="200" class="aaa">
					<view class="form-item">
						<u-input v-model="form.unemployment" type="number" placeholder="请输入" input-align="center "
							:clearable="false" />
						<text>%</text>
					</view>
				</u-form-item>
				<u-form-item label="工伤" label-width="200" class="aaa">
					<view class="form-item">
						<u-input v-model="form.occupational_injury" type="number" placeholder="请输入" input-align="center "
							:clearable="false" />
						<text>%</text>
					</view>
				</u-form-item>
				<u-form-item label="生育" label-width="200" class="aaa">
					<view class="form-item">
						<u-input v-model="form.give_birth" type="number" placeholder="请输入" input-align="center " :clearable="false" />
						<text>%</text>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="button">
			<u-button class="button-u"  style="background-color: #ff5500;color: #FFFFFF;" @click="submit">开始计算</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityShow: false,
				form: {
					price: '10000',
					city: '', //所在城市
					reserved_funds: '1', // 公积金
					medical_treatment: '2', // 医疗
					provide_aged: '3', // 养老
					unemployment: '4', // 失业
					occupational_injury: '5', // 工伤
					give_birth: '6', // 生育
				},
				list: [{
						value: 1,
						label: '中国',
						children: [{
								value: 2,
								label: '广东',
								children: [{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					},
					{
						value: 8,
						label: '美国',
						children: [{
							value: 9,
							label: '纽约',
							children: [{
								value: 10,
								label: '皇后街区'
							}]
						}]
					}
				]
			}
		},
		methods: {
			confirm(e) {
				console.log(e)
				var aaa = ''
				e.forEach(item => {
					aaa += item.label + ' - '
				})
				this.form.city = aaa.substr(0, aaa.length - 2)
			},
			fnClickCity() {
				this.cityShow = true
			},
			submit() {
				console.log(this.form.price)
				/**
				 *  @reserved_funds 公积金
				 *	@medical_treatment 医疗
				 *	@provide_aged 养老
				 *	@unemployment 失业
				 *	@occupational_injury 工伤
				 *	@give_birth 生育
				 * */
				let data = {}
			
				data.reserved_funds = this.percentage(this.form.price, this.form.reserved_funds)
				data.medical_treatment = this.percentage(this.form.price, this.form.medical_treatment)
				data.provide_aged = this.percentage(this.form.price, this.form.provide_aged)
				data.unemployment = this.percentage(this.form.price, this.form.unemployment)
				data.occupational_injury = this.percentage(this.form.price, this.form.occupational_injury)
				data.give_birth = this.percentage(this.form.price, this.form.give_birth)

				// data.forEach(item =>{
				// 	num += item
				// })
				

				uni.navigateTo({
					url:`./result/index?price=${this.form.price}&reserved_funds=${data.reserved_funds}&medical_treatment=${data.medical_treatment}&provide_aged=${data.provide_aged}&unemployment=${data.unemployment}&occupational_injury=${data.occupational_injury}&give_birth=${data.give_birth}` ,
				})


			},
			percentage(key, val) {
				return key * (val / 100).toFixed(2)
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-tabs-item {
		padding: 10rpx 40rpx;
	}

	.form-item {
		width: 140rpx;
		margin-left: 350rpx;
		display: flex;
		justify-content: center;
	}

	.button {
		position: fixed;
		left: 0;
		bottom: 8%;
		width: 100%;
		padding: 0 40rpx;

	}

	.content {
		padding: 0 30rpx;
	}

	.title {
		display: flex;
		justify-content: left;
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

	.submit {
		position: fixed;
		bottom: 5%;
		left: 8%;
		padding: 20rpx;
		margin: 0 20rpx;
		width: 80%;
		color: #FFFFFF;
		text-align: center;
		background-color: #ff5500;
	}

	.aaa {
		// background-color: pink;
		padding: 14rpx 0;
		// margin: 0;
	}
</style>
