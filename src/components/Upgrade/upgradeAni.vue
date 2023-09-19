<template>
    <canvas id="demo" length="100" num="8" step="5" stepTime="5" color="#3df221"></canvas>
</template>

<script>
    export default {
        name: "upgradeAni",
        data(){
            return{
                length: 100,
                canvas: '',
                fillColor: "#000",
                num: 4,
                step: length,
                offsetIndex: 0,
                maxIndex: 0,
                coordinates: new Array(),
                jishu: 0,
                stopNum: -1,
                isStop: false,
                x: '',
                y: '',
                size: ''
            }
        },
        mounted() {
           this.newObject('demo').darwAniStart(.3)
        },
        methods:{
            newObject(elid) {
                this.canvas = document.getElementById(elid)
                this.context = this.canvas.getContext("2d");
                let tmpLength = parseInt(this.canvas.getAttribute("length"));
                if (tmpLength != undefined && tmpLength > 0) {
                    this.length = tmpLength;
                }
                this.size = this.canvas.getAttribute("size");
                if (this.size == undefined) {
                    console.log('size',this.size)
                    this.size = this.length * 3;
                }
                this.darwI = this.offsetIndex;

                let color = this.canvas.getAttribute("color");
                if (color != undefined) {
                    this.fillColor = color;
                }
                let tmpNum = parseInt(this.canvas.getAttribute("num"));
                if (tmpNum != undefined && tmpNum > 3) {
                    this.num = tmpNum;
                }

                this.offsetIndex = this.canvas.getAttribute("offsetIndex");
                this.offsetIndex = this.offsetIndex == undefined ? 0 : this.offsetIndex;
                if (this.offsetIndex == 0) {
                    this.maxIndex = this.num - 1;
                }
                let tmpStep = parseInt(this.canvas.getAttribute("step"));
                if (tmpStep != undefined) {
                    this.step = tmpStep;
                }
                this.calculation();
            },
            calculation() {
                for (let i = 0; i < this.num; i++) {
                    // 计算偏转
                    let degree = this.getDegree(this.num, i),
                        radian = this.getRadian(degree);
                    // 增加1/3的canvas大小位移量以免被边缘挡住
                    this.coordinates[i] = {
                        "x": Math.cos(radian) * this.length + this.length,
                        "y": Math.sin(radian) * this.length + this.length,
                        "datas": []
                    };
                    //开始把线还原成直线数组
                    if (i == 0) {
                        continue;
                    }
                    this.calculationSharp(this.coordinates[i - 1], this.coordinates[i], this.step, this.coordinates[i].datas)
                }
                //开始赋值第0个数组
                this.calculationSharp(this.coordinates[this.coordinates.length - 1], this.coordinates[0], this.step, this.coordinates[0].datas)
            },
            getDegree(vertices, index) {
                return 360 / vertices * (index + 0.5) + 90;
            },
            /**
             * 计算外角幅度
             */
            getRadian(degree) {
                return degree * Math.PI / 180;
            },
            /**
             * 计算直线点阵图
             */
            calculationSharp(last, now, drawLength, coordinates) {
                //次数
                let xiejiao = this.getXiejiao(last.x, now.x, last.y, now.y);
                let maxi = xiejiao / drawLength;//可以绘画多少次
                let i = 1
                for (; i < maxi; i++) {
                    let tdl = i == maxi ? drawLength * i + surplus : drawLength * i;
                    this.jscount++;
                    coordinates[i - 1] = this.getCoord(last.x, now.x, last.y, now.y, tdl);
                }
                coordinates[i - 1] = {
                    "x": now.x,
                    "y": now.y,
                }
            },
            getXiejiao(lastx, nowx, lasty, nowy) {
                this.x = nowx - lastx
                this.y = nowy - lasty
                return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
            },

            /**
             * 获取x坐标值
             */
            getCoord(lastx, nowx, lasty, nowy, length) {
                let xiejiao = this.getXiejiao(lastx, nowx, lasty, nowy)
                let rx = this.x * length / xiejiao;
                let ry = this.y * length / xiejiao;
                return {
                    "x": rx + lastx,
                    "y": ry + lasty
                }
            },
            darwAniStart(stepTime) {
                this.jishu = 0;
                this.begin();
                this.darw(this.maxIndex, this.coordinates[this.maxIndex].datas.length - 1);
                window.setTimeout(this.darwAni, stepTime, this, this.offsetIndex, 0, stepTime);
            },
            begin() {
                this.canvas.width = this.size;
                this.canvas.height = this.size;
                this.context.beginPath();
                this.context.strokeStyle = this.fillColor;
            },
            darw(i, j) {
                this.context.lineTo(this.coordinates[i].datas[j].x, this.coordinates[i].datas[j].y);
                this.context.moveTo(this.coordinates[i].datas[j].x, this.coordinates[i].datas[j].y);
                this.context.stroke();
            },
            darwAni(self, i, j, stepTime) {
                if (self.isStop) {
                    return;
                }
                if (self.stopNum == self.jishu++ && self.stopNum > 0) {
                    return;
                }
                //判断结束
                if (i == self.maxIndex && j == self.coordinates[self.maxIndex].datas.length - 1) {
                    window.setTimeout(self.darwAniStart, stepTime, self, i, j, stepTime);
                    return;
                }
                //开始绘画
                self.darw(i, j);
                if (++j == self.coordinates[i].datas.length) {
                    j = 0;
                    if (++i == self.coordinates.length) {
                        i = 0;
                    }
                }
                self.jishu++;
                window.setTimeout(self.darwAni, stepTime, self, i, j, stepTime);
            },
        }
    }
</script>

<style scoped>

</style>
