<template>
    <div class="hello">
        <mu-auto-complete hintText="用户名" v-model="newUser.name"/>
        <mu-auto-complete hintText="爱好" v-model="newUser.like"/>
        <mu-raised-button label="新增" class="demo-raised-button" primary @click="addFun" />
        <mu-raised-button label="删除全部" class="demo-raised-button" @click="delAllFun" />
        <!--<ul>-->
            <!--<li v-for="(item, index ) in userList" :key="index">-->
                <!--<mu-chip class="demo-chip"  @click="editFun(item)" @delete="delFun(item)" showDelete>-->
                    <!--{{item.name}} - {{item.like}}-->
                <!--</mu-chip>-->
            <!--</li>-->
        <!--</ul>-->

        <p>log</p>
        <mu-toast v-if="toast" message="请将数据填写完整" @close="hideToast"/>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                newUser : {},
                userList : [],
                toast : false
            }
        },
        created() {
            // 获取用户信息
            // api.getUser({id:0})
            //     .then(res => {
            //         console.log('success', res);
            //     })
            //     .catch(err => {
            //         console.log('error', err);
            //     })
            const logData = {
                "parentShopId":240880,
                "shopId" : 240881,
                "username":"18627801101",
                "deviceId":"qweqweq", //每个终端自动生成一个UUID
                "appId":"n_touchPad",
                "appVersion":"5.145",
                "platfrom":"Android", //Android,iOS,Win,Web
            };

            api.logSetting(logData)
                .then(res => {
                    console.log('success', res);
                })
                .catch(err => {
                    console.log('error', err);
                })

            this.getUserLogListFun();
        },
        methods: {

            getUserLogListFun() {
                api.getUserLogList({})
                    .then(res => {
                        this.userList = res.data;
                        console.log('success', res);
                    })
                    .catch(err => {
                        console.log('error', err);
                    })
            },
            addFun() {
                // const params = this.newUser;
                // if(!this.newUser.name && !this.newUser.like) {
                //     this.showToast();
                //     console.log(this.newUser)
                //     return false;
                // }else {}

                const data = {
                    "parentShopId":240880,
                    "shopId" : 240881,
                    "username":"18627801101",
                    "deviceId":"qweqweq", //每个终端自动生成一个UUID
                    "appId":"n_touchPad",
                    "appVersion":"5.145",
                    "platfrom":"Android", //Android,iOS,Win,Web
                    "logs":[
                        {
                            "ts": new Date().getTime(), //log打印时间
                            "level":"error", //error,warn,debug,info
                            "content":"1111"
                        },
                        {
                            "ts": new Date().getTime(), //log打印时间
                            "level":"warn", //error,warn,debug,info
                            "content":"2222"
                        },
                    ]
                };


                api.saveUserLogs(data)
                    .then(res => {

                    })
                    .catch(err => {
                        console.log('error', err);
                    })

            },
            editFun(item) {
                const params = {
                    // _id : item._id,
                    // editObj : {
                    //     name : 'leo1',
                    //     like : '音乐(电音)'
                    // }
                    _id : item._id,
                    name : 'leo123',
                    like : '篮球-后卫'
                };
                api.editUserInfo(params)
                    .then(res => {
                        console.log(res)
                        this.getUserInfoListFun();
                    })
                    .catch(err => {
                        console.log('error', err);
                    })
            },

            // delFun(item) {
            //     const params = {_id : item._id};
            //     api.delUserLogs(params)
            //         .then(res => {
            //             console.log(res)
            //         })
            //         .catch(err => {
            //             console.log('error', err);
            //         })
            // },
            delAllFun() {
                api.delUserLogs({})
                    .then(res => {
                        console.log('success', res);
                        this.getUserLogListFun();
                    })
                    .catch(err => {
                        console.log('error', err);
                    })
            },
            showToast () {
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
            },
            hideToast () {
                this.toast = false
                if (this.toastTimer) clearTimeout(this.toastTimer)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 10px 10px;
    }

    a {
        color: #42b983;
    }

    .btn-mini {
        min-width: 50;
    }
    .mu-toast {
        top: 50%;
        left: 50%;
        margin-left: -144px;
    }
</style>
