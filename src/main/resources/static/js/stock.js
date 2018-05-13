var current_code = null;
var rowindex = null;
$('#table').bootstrapTable({
    url: basepath + "/stock/list",                     //请求后台的URL（*）
    pageSize: 20,
    //可供选择的每页的行数（*）
    pageList: [10, 20, 30, 100],
    queryParams: function (params) { //重写提交的数据
        return {
            // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit, // 页面大小
            offset: params.offset, // 页码数 * 页面大小
            order: params.order, // 排序方式
            sort: params.sort //排序的字段
            // code: $("#stock").val()
        };
    },
    idField: "sCode",
    cache: false,
    pagination: true,
    detailView: true,
    showColumns: true,
    showRefresh: true,
    detailFormatter: detailFormatter,
    resizable: true,  //启动表格可拖动调整列宽效果,需要bootstrap-table-resizable插件已经其依赖的colResizable-1.5插件
    liveDrag: true,   // 表格拖动时的随动效果
    headerOnly: true,  // 设定拖动表头操作,能优化点击选行的体验
    clickToSelect: true,
    rowStyle: function (row, index, value) {
        //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
        var strclass = "";
        if (row.sRangePrice < 0) {
            strclass = "stock-down";
        } else {
            strclass = "stock-up";
        }
        if (row.sRangePrice.toString().indexOf("%") == -1) {
            row.sRangePrice = row.sRangePrice + "%";
        }
        if (row.sPeDynamic == -1) {
            row.sPeDynamic = "--";
        }
        if (row.sPeStatic == -1) {
            row.sPeStatic = "--";
        }
        if (row.sPb == -1) {
            row.sPb = "--";
        }

        if (row.sTotalValue != -1) {
            if (row.sTotalValue.toString().indexOf("亿") == -1) {
                row.sTotalValue = row.sTotalValue + "亿";
            }

        } else {
            row.sTotalValue = "--";
        }

        if (row.sRoe == -1) {
            row.sRoe = "--";
        } else {
            if (row.sRoe.toString().indexOf("%") == -1) {
                row.sRoe = row.sRoe + "%";
            }

        }
        if (row.sDividendRate == -1) {
            row.sDividendRate = "--";
        } else {
            if (row.sDividendRate.toString().indexOf("%") == -1) {
                row.sDividendRate = row.sDividendRate + "%";
            }

        }
        if (row.sDividendYear == -1) {
            row.sDividendYear = "--";
        }
        row.sVersion = timeStamp2String(row.sVersion);
        return {classes: strclass};
    },
    onClickRow: function (row, $element) {
        //设置所有行样式
        // $(".fixed-table-container tbody tr").css("background-color","rgb(255,255,255)");
        //  $element.css("background-color","#FFFFCC");
        current_code = row.sCode;
        rowindex = $element.data('index');
    }


});
function getChk() {
    var ids = "";
    var rows = $('#table').bootstrapTable('getSelections');
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i].sCode;
        if (i != rows.length - 1) {
            ids += ",";
        }
    }
    return ids;
}
function detailFormatter(index, row) {
    /* var html = [];
     $.each(row, function (key, value) {
     html.push('<p><b>' + key + ':</b> ' + value + '</p>');
     });
     return html.join('');*/
    messageBox.showLoading('正在处理请稍后...');
    var html = "<p style='padding-left: 10%;font-weight: bold;color: darkviolet;'>分红年度&emsp;&emsp;除权日&emsp;&emsp;&emsp;&emsp;分红方案&emsp;&emsp;分红率</p>";
    $.ajax({
        url: basepath + "/stock/dividendRate/" + row.sCode,
        dataType: "json",
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var percent = "--";
                if (item.percent != -1) {
                    percent = "<strong>" + item.percent + "%</strong>";
                }
                html += "<p style='padding-left: 10%;'>" + item.dividendYear + "&emsp;" + item.sdDate + "&emsp;" + item.plan + "&emsp;" + percent + "</p>";
            }
        }
    });
    messageBox.closeLoading();
    return html;
}
function initValidator() {
    $('#stockForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            stock: {
                validators: {
                    notEmpty: {
                        message: '代码不能为空'
                    },
                    regexp: {
                        regexp: /^[0-9]{6}$/,
                        message: '必须为6位有效数字'
                    }
                }
            }
        }
    });
}
function update() {
    $.ajax({
        type: "POST",
        url: basepath + "/stock/refresh",
        success: function (data) {
            if (data == 'success') {
                console.info("ok");
                reload();
            } else {
                messageBox.error('提示', data);
            }

        },
        error: function (data) { // 当提交失败时触发验证,如果验证通过则判断为其他问题
            messageBox.error('提示', '数据提交错误，请联系系统管理员.');
        }
    });
}
$("#updateBtn").click(function () {
    update();
});


$("#addBtn").click(function () {
    //获取表单对象
    var $bootstrapValidator = $("#stockForm").data('bootstrapValidator');
    //手动触发验证
    $bootstrapValidator.validate();
    // 如果验证未通过,则不继续提交
    if (!$bootstrapValidator.isValid()) {
        return;
    }
    messageBox.showLoading('正在加载数据请稍后...');
    $.ajax({
        type: "POST",
        url: basepath + "/stock/add/" + $("#stock").val(),
        /*data: $("#form").serialize(),*/
        success: function (data) {
            messageBox.closeLoading();
            if (data == 'success') {
                $('#stock').val("");
                resetValidator();
                reload();
            } else {
                messageBox.error('提示', data);
            }

        },
        error: function (data) { // 当提交失败时触发验证,如果验证通过则判断为其他问题
            messageBox.error('提示', '数据提交错误，请联系系统管理员.');
        }
    });
});
// 提交按钮事件
$("#queryBtn").click(function () {
    //获取表单对象
    var $bootstrapValidator = $("#stockForm").data('bootstrapValidator');
    //手动触发验证
    $bootstrapValidator.validate();
    // 如果验证未通过,则不继续提交
    if (!$bootstrapValidator.isValid()) {
        return;
    }
    reload();
});
$("#delBtn").click(function () {
    if (getChk() == "") {
        messageBox.notify("请选择要删除的股票!", "danger");
        return;
    }

    messageBox.confirm("是否删除选中的股票？", function (result) {
        messageBox.showLoading('正在处理请稍后...');
        $.ajax({
            type: "POST",
            url: basepath + "/stock/del",
            data: {codes: getChk().split(",")},
            success: function (data) {
                messageBox.closeLoading();
                if (data == 'success') {
                    reload();
                } else {
                    messageBox.error('提示', data);
                }

            },
            error: function (data) { // 当提交失败时触发验证,如果验证通过则判断为其他问题
                messageBox.error('提示', '数据提交错误，请联系系统管理员.');
            }
        });
    });


});
$("#hisSylBtn").click(function () {
    var ids = getChk().split(',');
    if (getChk() == "") {
        messageBox.notify("请选择股票!", "danger");
        return;
    } else if (ids.length > 5) {
        messageBox.notify("最多选择5支股票对比!", "danger");
        return;
    }
    var imgurl = "http://biz.finance.sina.com.cn/company/compare/img_syl_compare.php?stock_code=" + getChk() + "&limit=2555";
    swal({
        width: 660,
        title: '历史市盈率',
        text: '过去7年数据',
        imageUrl: imgurl,
        imageWidth: 600,
        imageHeight: 400,
        showCloseButton: true,
        allowOutsideClick: false,
        animation: true
    })
});
$("#hisSjlBtn").click(function () {
    var ids = getChk().split(',');
    if (getChk() == "") {
        messageBox.notify("请选择股票!", "danger");
        return;
    } else if (ids.length > 5) {
        messageBox.notify("最多选择5支股票对比!", "danger");
        return;
    }
    var imgurl = "http://biz.finance.sina.com.cn/company/compare/img_sjl_compare.php?stock_code=" + getChk() + "&limit=2555";
    swal({
        width: 660,
        title: '历史市净率',
        text: '过去7年数据',
        imageUrl: imgurl,
        imageWidth: 600,
        imageHeight: 400,
        showCloseButton: true,
        allowOutsideClick: false,
        animation: true
    })
});
$("#hisFhBtn").click(function () {
    if (rowindex == null) {
        messageBox.notify("请选择需要查看的股票!", "danger");
        return;
    }
    $('#table').bootstrapTable('expandRow', rowindex);
});

function reload() {
    // 表格自带的刷新方法
    $('#table').bootstrapTable('refresh', {
        url: basepath + '/stock/list'
    });
}
function resetValidator() {
    /*-------------------重置表单所有验证规则--------------------*/
    // 获取验证器
    var validator = $('#stockForm').data("bootstrapValidator");
    // 先销毁验证器
    validator.destroy();
    // 再重新初始化
    initValidator();
}
window.onload = function () {
    initValidator();
    // window.setInterval("reload()",2000);
}