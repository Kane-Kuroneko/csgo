/**
 * 正多边形作画器
 * 该作画器定义了多边形的静态及动态绘画特效.使用多边形作画器可以快速的构建多边形形成动画和绘制
 *
 *
 * 作者:pony
 * 微信:zt4030612
 *
 *
 * v1.0.01 定义了基于canvas正多边形动画的绘画动画效果.从第1条线起点开始,逐步绘画到完成正多边形的绘画效果.
 *      多边形属性定义说明:
 *          size: 画布大小 长宽比例按照绝对锁定 默认=100
 *          length: 代表每条线的长度 默认100,长度建议小于size
 *          num: 代表几条边 默认4边,不能小于4边
 *          step: 代表每次绘画显示多少像素.默认 step=num
 *          stepTime: 每次间隔毫秒数
 *          offsetIndex:从第几个开始勾画
 *
 * v1.0.02(待开发)
 *        1.多线同步渲染
 *        2.清空渲染途径,可正消失,可负消失
 *        3.球型运动效果
 */
 const PolygonAnimation = {
    length: 100,
    fillColor: "#000",
    num: 4,
    step: length,
    offsetIndex: 0,
    maxIndex: 0,
    coordinates: new Array(),
    jishu: 0,
    stopNum: -1,
    isStop: false,

    /**
     *计算每个内角度数
     */
    _getDegree: function (vertices, index) {
        return 360 / vertices * (index + 0.5) + 90;
    },

    /**
     * 计算外角幅度
     */
    _getRadian: function (degree) {
        return degree * Math.PI / 180;
    },
    /**
     * 获取x坐标值
     */
    _getCoord: function (lastx, nowx, lasty, nowy, length) {
        let xiejiao = this._getXiejiao(lastx, nowx, lasty, nowy)
        let rx = x * length / xiejiao;
        let ry = y * length / xiejiao;

        return {
            "x": rx + lastx,
            "y": ry + lasty
        }
    },

    _getXiejiao: function (lastx, nowx, lasty, nowy) {
        let x = nowx - lastx
        let y = nowy - lasty
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    },
    /**
     * 计算直线点阵图
     */
    _calculationSharp: function (last, now, drawLength, coordinates) {
        //次数
        var xiejiao = this._getXiejiao(last.x, now.x, last.y, now.y);
        var maxi = xiejiao / drawLength;//可以绘画多少次
        var i = 1
        for (; i < maxi; i++) {
            var tdl = i == maxi ? drawLength * i + surplus : drawLength * i;
            this.jscount++;
            coordinates[i - 1] = this._getCoord(last.x, now.x, last.y, now.y, tdl);
        }
        coordinates[i - 1] = {
            "x": now.x,
            "y": now.y,
        }

    },

    /**
     * 计算多边型每个边的坐标系
     */
    calculation: function () {
        for (var i = 0; i < this.num; i++) {
            // 计算偏转
            var degree = this._getDegree(this.num, i),
                radian = this._getRadian(degree);
            // 增加1/3的canvas大小位移量以免被边缘挡住
            this.coordinates[i] = {
                "x": Math.cos(radian) * length + length,
                "y": Math.sin(radian) * length + length,
                "datas": []
            };

            //开始把线还原成直线数组
            if (i == 0) {
                continue;
            }

            this._calculationSharp(this.coordinates[i - 1], this.coordinates[i], this.step, this.coordinates[i].datas)

        }

        //开始赋值第0个数组
        this._calculationSharp(this.coordinates[this.coordinates.length - 1], this.coordinates[0], this.step, this.coordinates[0].datas)

        console.log(this.coordinates)


    },
    _begin: function () {
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.context.beginPath();
        this.context.strokeStyle = this.fillColor;
    },
    _darw: function (i, j) {
        this.context.lineTo(this.coordinates[i].datas[j].x, this.coordinates[i].datas[j].y);
        this.context.moveTo(this.coordinates[i].datas[j].x, this.coordinates[i].datas[j].y);
        this.context.stroke();
    },
    /**
     * 判断j是否已经超出合理范围.如果超出,则i需要递增.本方法返回是否进行了一场大轮回
     * i增加到一个无法增加的数值时,需要对i进行清除
     * @private
     */
    _isAgain: function () {

    },
    /**
     * 以动画形式绘制多边形图像.自动开始和回清图像
     */
    darwAniStart: function (stepTime) {
        this.jishu = 0;
        this._begin();
        this._darw(this.maxIndex, this.coordinates[this.maxIndex].datas.length - 1);
        window.setTimeout(this._darwAni, stepTime, this, this.offsetIndex, 0, stepTime);
    },
    /**
     * 正向开始绘画,从哪里开始,到哪里结束
     * @param i
     * @param j
     * @private
     */
    _darwAni: function (self, i, j, stepTime) {
        if (self.isStop) {
            return;
        }
        if (self.stopNum == self.jishu++ && self.stopNum > 0) {
            return;
        }
        //判断结束
        if (i == self.maxIndex && j == self.coordinates[self.maxIndex].datas.length - 1) {
            window.setTimeout(self._darwAniClear, stepTime, self, i, j, stepTime);
            return;
        }
        //开始绘画
        self._darw(i, j);
        if (++j == self.coordinates[i].datas.length) {
            j = 0;
            if (++i == self.coordinates.length) {
                i = 0;
            }
        }
        self.jishu++;
        window.setTimeout(self._darwAni, stepTime, self, i, j, stepTime);
    },
    /**
     * 清除画像,逆向
     * @private
     */
    _darwAniClear: function (self, i, j, stepTime) {
        if (self.isStop) {
            return;
        }
        var lastI = i;
        var lastJ = j;
        //判断结束
        if (i == self.offsetIndex && j == 0) {
            self.darwAniStart(stepTime);
            return;
        }

        if (--j == -1) {
            if (--i == -1) {
                i = self.coordinates.length - 1;
            }
            j = self.coordinates[i].datas.length - 1;
        }
        self._clearSteep(self, i, j, lastI, lastJ);
        window.setTimeout(self._darwAniClear, stepTime, self, i, j, stepTime);
    },
    /**
     * 清除直线,当使用stroe进行绘画的时候,调用该方法进行直线清除
     * @private
     */
    _clearSteep: function (self, i, j, lastI, lastJ) {

        var a = self.coordinates[i].datas[j];
        var b = self.coordinates[lastI].datas[lastJ];

        var offsetAX, offsetAY, offsetBX, offsetBY;
        if (a.x - b.x <= 0) {
            offsetAX = 1;
            offsetBX = -2
        } else {
            offsetAX = -1;
            offsetBX = 2
        }
        if (a.y - b.y <= 0) {
            offsetBY = -2;
            offsetAY = 1
        } else {
            offsetAY = -2
            offsetBY = 3;
        }

        self.context.fillStyle = "#000"
        self.context.clearRect(b.x + offsetAX,
            b.y + offsetAY,
            a.x - b.x + offsetBX,
            a.y - b.y + offsetBY)
    },
    /**
     * 动画停止,num停止到x位置
     * @param num
     */
    darwAniStop: function (num) {
        if (num == undefined) {
            this.isStop = true;
        } else {
            var snm = end * (this.jscount / 100) * 100;
            this.stopNum = parseInt(snm);
        }

    },
    /**
     * 绘制静态的多边型
     * end:代表在什么位置结束.数值在0~1之间. 读取2位小数
     */
    darwStatic: function (end) {
        this._begin();

        var k = 0;
        for (var i = this.offsetIndex; i < this.coordinates.length; i++) {
            for (var j = 0; j < this.coordinates[i].datas.length; j++) {
                this._darw(i, j);
                if (k++ == stopNum) {
                    return;
                }
            }
        }
        for (i = 0; i < this.offsetIndex; i++) {
            for (var j = 0; j < this.coordinates[i].datas.length; j++) {
                this._darw(i, j);
                if (k++ == stopNum) {
                    return;
                }
            }
        }
    },

    newObject: function (elid) {
        this.canvas = document.getElementById(elid)
        this.context = this.canvas.getContext("2d");
        var tmpLength = parseInt(this.canvas.getAttribute("length"));
        if (tmpLength != undefined && tmpLength > 0) {
           this.length = tmpLength;
        }
        this.size = this.canvas.getAttribute("size");
        if (this.size == undefined) {
            this.size = length * 3;
        }

        this.darwI = this.offsetIndex;

        var color = this.canvas.getAttribute("color");
        if (color != undefined) {
            this.fillColor = color;
        }
        var tmpNum = parseInt(this.canvas.getAttribute("num"));
        if (tmpNum != undefined && tmpNum > 3) {
            this.num = tmpNum;
        }

        this.offsetIndex = this.canvas.getAttribute("offsetIndex");
        this.offsetIndex = this.offsetIndex == undefined ? 0 : this.offsetIndex;
        if (this.offsetIndex == 0) {
            this.maxIndex = this.num - 1;
        }


        var tmpStep = parseInt(this.canvas.getAttribute("step"));
        if (tmpStep != undefined) {
            this.step = tmpStep;
        }
        this.calculation();
        return this;
    },
}
export {PolygonAnimation}
