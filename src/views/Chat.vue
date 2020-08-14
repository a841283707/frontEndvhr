<template>
    <div id="app">
        <div class="sidebar">
            <card></card>
            <list></list>
        </div>
        <div class="main">
            <message></message>
            <usertext></usertext>
        </div>
    </div>
</template>

<script>
    import card from '../views/commonView/chat/card'
    import list from '../views/commonView/chat/list'
    import message from '../views/commonView/chat/message'
    import usertext from '../views/commonView/chat/usertext'

    export default {
        name: 'app',
        data () {
            return {

            }
        },
        mounted:function() {
            this.$store.dispatch('initData');
        },
        components:{
            card,
            list,
            message,
            usertext
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        margin: 20px auto;
        width: 800px;
        height: 600px;
        overflow: hidden;
        border-radius: 10px;
        .sidebar, .main {
            height: 100%;
        }
        .sidebar {
            float: left;
            color: #f4f4f4;
            background-color: #2e3238;
            width: 200px;
        }
        .main {
            position: relative;
            overflow: hidden;
            background-color: #eee;
        }
    }
</style>
