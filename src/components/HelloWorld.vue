<template>
  <div>
    <h3>增删改查</h3>
    <ul>
      <li v-for="(item, index) in arrList" :key="index">
        <span>{{ item.id }}</span>
        <span>{{ item.attributes.testNumber }}</span>
        <span>{{ item.createdAt }}</span>
        <span>
          <button @click="deleteItem(item.id)">删除</button>
        </span>
        <span>
          <button @click="changeItem(item.id)">修改</button>
        </span>
      </li>
    </ul>
    <button @click="create">create</button>
    <div>
      <h3>上传</h3>
      <button @click="upload1">upload1</button><br />
      <input type="file" id="photoFileUpload" @change="fileChange" />
    </div>
  </div>
</template>
<style>
  ul li span {padding:0 20px}
</style>
<script>
export default {
  data () {
    return {
      arrList: [],
      number: 100
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    create () {
      this.number++
      const TestObject = this.$AV.Object.extend('DataTypeTest')
      const string = 'famous film name is ' + this.number
      const date = new Date()
      const array = [string, this.number]
      const object = { number: this.number, string: string }

      const testObject = new TestObject()
      testObject.set('testNumber', this.number)
      testObject.set('testString', string)
      testObject.set('testDate', date)
      testObject.set('testArray', array)
      testObject.set('testObject', object)
      testObject.set('testNull', null)
      testObject.save().then(res => {
        console.log(res)
        this.getList()
      }).catch(err => {
        console.log(err)
      })
    },
    getList () {
      const query = new this.$AV.Query('DataTypeTest')
      query.descending('createdAt') // 按时间，降序排列
      query.greaterThan('testNumber', 100)
      query.find().then(res => {
        this.arrList = res
        console.log(res)
      })
    },
    deleteItem (id) {
      const todo = this.$AV.Object.createWithoutData('DataTypeTest', id)
      todo.destroy().then(res => {
        console.log('delete success')
        this.getList()
      })
    },
    changeItem (id) {
      const todo = this.$AV.Object.createWithoutData('DataTypeTest', id)
      todo.set('testNumber', 1000)
      todo.save().then(res => {
        console.log('change success')
        this.getList()
      })
    },
    upload1 () {
      const file = this.$AV.File.withURL('test.gif', 'http://ww3.sinaimg.cn/bmiddle/596b0666gw1ed70eavm5tg20bq06m7wi.gif')
      file.save().then(res => {
        console.log('success')
      }).catch(err => {
        console.log(err)
      })
    },
    fileChange (e) {
      const imgFile = e.target.files[0]
      const name = 'test.jpg'
      const file = new this.$AV.File(name, imgFile)
      file.save().then(res => {
        console.log('success')
      }).catch(err => {
        console.log(err)
      })
    },
    register () {
      const user = new this.$AV.User()
      user.setUsername('test')
      user.setPassword('123456')
      user.signUp().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    login () {
      this.$AV.User.logIn('test', '123456').then(res => {
        console.log(res._sessionToken)
      }).catch(err => {
        console.log(err)
      })
    },
    sessionLogin (sessionToken) {
      this.$AV.User.become(sessionToken).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
