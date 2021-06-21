<template>
	<view class="content">
		<view class="title">
			{{reverse?'他/她称呼我:':'我称呼他/她:'}}
		</view>
		<view class="input">
			{{inputValueChange}}
		</view>
		<view class="result">
			{{currentValue}}
		</view>
		<number-key @fnClickNum="fnClickNum" @fnSexChange="fnSexChange" :num="num" :is_sex="true"></number-key>
	</view>
</template>

<script>
	import relationship from '../../config/relationship.js'
	import numberKey from '../../components/numberKey/index.vue'
	export default {
		components: {
			numberKey
		},
		data() {
			return {
				num: [
					// '父', '母', 'C', '删除',
					// '兄', '姐', '夫', '妻',
					// '弟', '妹', '', '互查',
					// '子', '女', '', '='
					'父', '母', '互查', '删除',
					'兄', '弟', '夫', '妻',
					'姐', '妹', '子', '女',
				],
				inputValueChange: '我',
				currentValue: '',
				reverse: false,
				sex:'1'
			}
		},
		methods: {
			fnSexChange(val){
				this.sex = val
				this.fnResult()
			},
			fnClickNum(key) {
				let str = ''
				if (key == 'C') {
					this.inputValueChange = '我'
					this.currentValue = ''
					return
				}
				if(key == '删除'){
					if(this.inputValueChange.length > 1 ){
						this.inputValueChange = this.inputValueChange.slice(0, -3)
						if(this.inputValueChange.length == 1) this.currentValue = ''
					}
				}
				if (key == '反向') this.reverse = !this.reverse
				if (key == '父') str = '爸爸'
				if (key == '母') str = '妈妈'
				if (key == '兄') str = '哥哥'
				if (key == '姐') str = '姐姐'
				if (key == '夫') str = '老公'
				if (key == '妻') str = '老婆'
				if (key == '弟') str = '弟弟'
				if (key == '妹') str = '妹妹'
				if (key == '子') str = '儿子'
				if (key == '女') str = '女儿'
				if (str !== '') this.inputValueChange += '的' + str
				this.fnResult()
			},
			fnResult(){
				let current = relationship({
					text: this.inputValueChange,
					sex: this.sex,
					reverse: this.reverse
				})
				if (current.length == 0) {
					if(this.inputValueChange.length > 1) this.currentValue = '貌似他/她跟你不是很熟哦!'
				} else if(current.length == 1) this.currentValue = current[0]
				 else {
					let arr = ''
					current.forEach(item => {
						if (current.length !== 1) arr += item + ' ,'
						else arr += item
					})
					this.currentValue = arr.slice(0, arr.length - 1)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.content{
	padding: 30rpx;
}
.input{
	text-align: right;
	font-size: 40rpx;
	color: #C0C0C0;
	height: 180rpx;
	overflow: hidden;
	color: #ff5500;
}
.result{
	text-align: right;
	font-size: 42rpx;
}
</style>
