<template>
    <div v-if="loadTrue" class="loading">
        <span>园区资源加载中...</span>
        <div class="loading-process">
            <div class="process-wrapper"></div>
        </div>
    </div>
</template>
<script lang='ts' setup>
const prop = defineProps<{
    loadTrue: boolean;
}>()
console.log(prop.loadTrue);

</script>
<style lang='scss' scoped>
.loading {
    position: absolute;
    left: 66%;
    top: 40%;
    transform: translate(-50%);
    color: #fff;
    text-align: center;

    span {
        display: block;
        font-size: 14px;
        margin-bottom: 16px;
        color: #909399;
    }

    .loading-process {
        width: 280px;
        height: 5px;
        background-color: rgba(255, 255, 255, 0.16);
        border-radius: 10px;
        overflow: hidden;

        .process-wrapper {
            width: 5%;
            height: 100%;
            background: linear-gradient(90deg, #48ffff 0%, #3656ff 100%);
            border-radius: 10px;

            // animation: loading 1.5s;
            //动画执行时间
            animation-duration: 100s;
            //动画名称
            animation-name: loading;
            @keyframes loading {
                0% {
                    width: 5%;
                    // transform: scaleX(1);
                }
                1%{
                    width: 90%;
                    // transform: scaleX(38);
                }
                100% {
                    width: 100%;
                    // transform: scaleX(40);
                }
            }
        }
    }
}
</style>