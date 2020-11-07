(function() {
    // 列表数据、X轴分类数据、上下图表展示数据；
    var list = [],
        nameArr = [],
        scoreArr = [],
        moneyArr = [];

    // 页面元素
    var $name = $("#name");
    var $score = $("#score");
    var $money = $("#money");
    var $list = $("#list");

    // 是否为编辑模式
    var mode = false;
    // 新增
    $("#add").on("click", function() {
        // 进入编辑模式，不能进行其他操作；
        if (mode) { 
            return alert("请完成编辑"); 
        }

        var name = $name.val().trim();
        var score = $score.val().trim();
        var money = $money.val().trim();

        // 判断为空
        if (name == "" || score == "" || money == "") {
            return alert("请输入信息");
        }

        // 添加数据
        list.push({
            name: name,
            score: score,
            money: money,
        })

        // 列表重新加载及图表重新设置
        getList();

        // 重置表单
        $name.val("");
        $score.val("");
        $money.val("");
    });

    // 删除
    $list.on("click", ".del", function(e) {
        // 进入编辑模式，不能进行其他操作；
        if (mode) {
            return alert("请完成编辑");
        }

        // 删除一条数据
        var index = $(this).parents(".one").index();
        list.splice(index, 1);

        // 列表重新加载及图表重新设置
        getList();
    });

    // 修改
    $list.on("click", ".upd", function(e) {
        // 进入编辑模式，不能进行其他操作；
        if (mode) {
            return alert("请完成编辑");
        }

        // 添加准备好的类名
        $(this).parents(".one").addClass("editMode");

        // 新增、删除修改不能操作的标识
        mode = true;
    });

    // 修改下确认
    $list.on("click", ".yes", function(e) {
        // 找到当前父级
        var p = $(this).parents(".one");

        // 判断当前下的输入框信息为空
        if (p.find(".name").val() == "" || p.find(".score").val() == "" || p.find(".money").val() == "") {
            return alert("请输入信息");
        }
        // 找到当前数据下标
        var index = $(this).parents(".one").index();

        // 修改数据
        list[index].name = p.find(".name").val();
        list[index].score = p.find(".score").val();
        list[index].money = p.find(".money").val();

        // 列表重新加载及图表重新设置
        getList();

        // 新增、删除修改恢复操作
        mode = false;
    });

    // 修改下取消
    $list.on("click", ".no", function(e) {
        // 找到当前父级取消类名
        $(this).parents(".one").removeClass("editMode");

        // 新增、删除修改恢复操作
        mode = false;
    });

    /* 
     * 函数说明：
     *  opt：为形参，实参传入一个对象{}
     *  opt.el:为DOM容器的id值
     *  opt.title:echarts的标题内容
     *  opt.data:图表数据
     *  opt.type:图表数据的展示类型
     */
    function ecInit(opt) {
        var myChart = echarts.init(document.getElementById(opt.el));
        var option = {
            title: {
                top: 5,
                left: 5,
                text: opt.title,
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: {
                axisLabel: {
                    color: "#fff",
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff",
                    }
                },
                data: nameArr
            },
            yAxis: {
                axisLabel: {
                    color: "#fff",
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff",
                    }
                },
                splitLine: {
                    show: false
                }
            },
            grid: { //网格边框控制
                // show: true,
                containLabel: true,
                left: 5,
                bottom: 5,
                right: 5,
            },
            tooltip: {},
            series: [{
                name: opt.title,
                type: opt.type,
                data: opt.data
            }],
            color: ["#1E90FF"],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    // 获取数据列表展示
    function getList() {
        // 循环前置空
        $list.html("");

        // 将其置空
        nameArr = [];
        scoreArr = [];
        moneyArr = [];

        // 渲染数据到页面中
        list.forEach((ele, index) => {
            // 生成和添加DOM结构
            $list.append('<div class="one"> ' +
                '<span class="item"> ' +
                '<span class="info">' + ele.name + '</span>' +
                '<input type="text" class="ipt name" value=' + ele.name + '>' +
                '</span>' +

                '<span class="item">' +
                '<span class="info">' + ele.score + '</span>' +
                '<input type="number" class="ipt score" value=' + ele.score + '>' +
                '</span>' +

                '<span class="item">' +
                '<span class="info">' + ele.money + '</span> ' +
                '<input type="number" class="ipt money" value=' + ele.money + '>' +
                '</span>' +

                '<span class="item">' +
                '<i class="upd" title="修改"></i>' +
                '<i class="del" title="删除"></i>' +
                '<i class="yes" title="确认"></i>' +
                '<i class="no" title="取消"></i>' +
                '</span>' +
                '</div>');

            nameArr.push(ele.name);
            scoreArr.push(ele.score);
            moneyArr.push(ele.money);
        });

        // 列表渲染时，调用echarts封装的函数，达到联动的效果；
        ecInit({
            el: "up",
            title: "评分图示",
            data: scoreArr,
            type: "bar"
        });

        ecInit({
            el: "down",
            title: "薪资图示",
            data: moneyArr,
            type: "line"
        });
    }
})()
