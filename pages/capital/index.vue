<template>
	<view class="content">
		<view class="input color">
			{{inputValueChange}}
		</view>
		<u-divider border-color="#ccc" half-width="100%" :use-slot="false"></u-divider>
		<view class="input">
			{{capitalValue}}
		</view>
		<number-key @fnClickNum="fnClickNum"></number-key>
	</view>
</template>

<script>
	import numberKey from '../../components/numberKey/index.vue'
	export default {
		components:{
			numberKey
		},
		data() {
			return {
				
				
				inputValueChange: '',
				capitalValue: ''
			}
		},
		watch: {
			inputValueChange(val) {
				this.capitalValue = this.changeNumMoneyToChinese(val)
			}
		},
		onLoad() {
			this.inputValueChange = '0'
		},
		methods: {
			fnClickNum(key) {
				let optios = this.inputValueChange.split('.')
				if(key == '00'||key == '0'){
					if(optios.length > 1 && optios[1] == '00'){
						return
					}
				}
				if (key == '删除' && this.inputValueChange == 0 && this.inputValueChange.length == 0) return
				if (this.inputValueChange == 0 && key != '删除' && key != 'c') {
					if (this.inputValueChange == 0 && this.inputValueChange.length <= 1 && key == '00') {} else
					if (this.inputValueChange == 0 && key == '.') {
						this.inputValueChange = '0.';
					} else if (this.inputValueChange.length == 1 && this.inputValueChange == 0) {
						this.inputValueChange = key;
					} else {
						this.inputValueChange += key;
					}
				} else if (key == 'c') {
					this.inputValueChange = '0';
				} else if (key == '.') {
					if (this.inputValueChange.indexOf('.') == -1) {
						this.inputValueChange += key;
					}
				} else if (key == '删除') {
					this.inputValueChange = this.inputValueChange.slice(0, this.inputValueChange.length - 1)
					if (this.inputValueChange == '') {
						this.inputValueChange += 0
						this.changeNumMoneyToChinese(0)
					} else if (this.inputValueChange == '0') {
						this.changeNumMoneyToChinese(0)
					}
				} else {
					console.log(optios.length)
					if(optios.length == 2){
						if (optios[optios.length - 1].length <= 3 && this.inputValueChange * 1 < 999999999999) {
							this.inputValueChange += key;
						}
					}else {
						if(this.inputValueChange * 1 < 999999999999){
							this.inputValueChange += key;
						}
						
					}
					
				}
			},
			// 把数字金额转换成中文大写数字
			changeNumMoneyToChinese(money) {
				let numReg = /^[0-9]*[1-9][0-9]*$/
				var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
				var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
				var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
				var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
				var cnInteger = "整"; //整数金额时后面跟的字符
				var cnIntLast = "元"; //整型完以后的单位
				var maxNum = 999999999999999.9999; //最大处理的数字
				var IntegerNum; //金额整数部分
				var DecimalNum; //金额小数部分
				var ChineseStr = ""; //输出的中文金额字符串
				var parts; //分离金额后用的数组，预定义    
				var Symbol = ""; //正负值标记
				if (money == "") {
					return "";
				}
				money = parseFloat(money);
				if (money >= maxNum) {
					console.log('超出最大处理数字')
					// return "";
				}
				if (money == 0) {
					ChineseStr = cnNums[0] + cnIntLast + cnInteger;
					return ChineseStr;
				}
				if (money < 0) {
					money = -money;
					Symbol = "负 ";
				}
				money = money.toString(); //转换为字符串
				if (money.indexOf(".") == -1) {
					IntegerNum = money;
					DecimalNum = '';
				} else {
					parts = money.split(".");
					IntegerNum = parts[0];
					DecimalNum = parts[1].substr(0, 4);
				}
				if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
					var zeroCount = 0;
					var IntLen = IntegerNum.length;
					for (var i = 0; i < IntLen; i++) {
						var n = IntegerNum.substr(i, 1);
						var p = IntLen - i - 1;
						var q = p / 4;
						var m = p % 4;
						if (n == "0") {
							zeroCount++;
						} else {
							if (zeroCount > 0) {
								ChineseStr += cnNums[0];
							}
							zeroCount = 0; //归零
							ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
						}
						if (m == 0 && zeroCount < 4) {
							ChineseStr += cnIntUnits[q];
						}
					}
					ChineseStr += cnIntLast;
					//整型部分处理完毕
				}
				if (DecimalNum != '') { //小数部分
					var decLen = DecimalNum.length;
					for (var i = 0; i < decLen; i++) {
						var n = DecimalNum.substr(i, 1);
						if (n != '0') {
							ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
						}
					}
				}
				if (ChineseStr == '') {
					ChineseStr += cnNums[0] + cnIntLast + cnInteger;
				} else if (DecimalNum == '') {
					ChineseStr += cnInteger;
				}
				ChineseStr = Symbol + ChineseStr;
				return ChineseStr;
			}
		}
	}
</script>

<style>
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

	.input {
		/* height: 120rpx; */
		
		width: 100%;
		text-align: right;
		padding: 80rpx;
		font-size: 40rpx;
	}
	.color{
		color: #ff5500;
	}
</style>
