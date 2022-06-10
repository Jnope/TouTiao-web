<template>
<div class="foot">
    <div class="left">
        <ul class="row">
            <li><a>加入头条</a></li>
            <li><a>用户协议</a></li>
            <li><a>隐私政策</a></li>
            <li><a>媒体合作</a></li>
            <li><a>广告合作</a></li>
            <li><a>友情链接</a></li>
        </ul>
    </div>
    <div class="middle">
        <ul class="row">
            <li class="choose">
                <div class="hide">
                    <ul class="non">
                        <li><a>媒体报道</a></li>
                        <li><a>产品合作</a></li>
                        <li><a>联系我们</a></li>
                        <li><a>廉洁举报</a></li>
                        <li><a>企业认证</a></li>
                        <li><a>肺炎求助</a></li>
                        <li><a>辟谣专区</a></li>
                        <li><a>免责声明</a></li>
                    </ul>
                </div>
                <div class="bu">更多</div>
            </li>
        </ul>
    </div>
    <div class="right">
        <ul class="row">
            <li>北京字节跳动科技有限公司</li>
            <li>违法和不良信息举报：xxx-xxx-xxxx</li>
            <li>举报邮箱：xxx@xxxxx.com</li>
        </ul>
    </div>
</div>
</template>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
    font-size: 10px;
    color: grey;
}
.foot{
    width: 100%;
    position: fixed;
    bottom: 0%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    background-color: white;
    // align-content: flex-end;
}
.right{
    margin-left: auto;
    // flex:1;
    // text-align: right;
    margin-right: 3%;
}
.row{
    list-style-type: none;
    white-space: nowrap;
    // width: fit-content;
}
.row>li{
    display: inline;
    margin-left: 1%;
    // white-space: nowrap;
}
.non{
    list-style-type: none;
    padding: 0;
}
.hide{
    display: none;
}
.choose:hover .hide{
    display: block;
}
.bu{
    display: inline-block;
}
// *{
//     vertical-align: bottom;
// }
li:hover{
    background-color: lightgray;
}
</style>