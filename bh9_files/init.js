$(function () {
    postHeight();
    var pop = $("#tooltip-span");

    $(document).on('mouseenter', '.tooltip, #tooltip-span', function (e) {
        pop.css("right", '');
        pop.css("left", e.pageX - 5 + "px");
        pop.css("top", e.pageY + 20 + "px");
        pop.css("transform", "");
        var txt = $(this).data("tooltip");
        pop.find("p").html(txt);
        pop.show();
    });

    $(document).on('mouseenter', '.tooltip1, #tooltip-span', function (e) {
        pop.css("right", '');
        pop.css("left", e.pageX - 5 + "px");
        pop.css("top", e.pageY + 20 + "px");
        pop.css("transform", "");
        var txt = $(this).data("tooltip");
        pop.find("p").html(txt);
        pop.show();
    });

    $(document).on('mouseleave', '.tooltip,#tooltip-span', function (e) {
        pop.hide();
    });

    $(document).on('mouseleave', '.tooltip1,#tooltip-span', function (e) {
        pop.hide();
    });

    ////下方警示
    $(document).on('mouseenter', '.tooltip2,#tooltip-span ', function (e) {
        if (e.pageX <= 50) {
            pop.css("right", e.pageX - 11 + "px");
        } else {
            pop.css("right", '');
        }

        pop.css("left", e.pageX - 11 + "px");
        pop.css("top", e.pageY + "px");
        pop.css("transform", "translate(0%,-130%)");
        var txt = $(this).data("tooltip");
        pop.find("p").html(txt);

        pop.show();
    });

    $(document).on('mouseleave', '.tooltip2,#tooltip-span', function (e) {

        pop.hide();
    });


    $(window).on("load resize", function () {
        const windowH = window.innerHeight;
        const windowW = window.innerWidth;
        if (windowW > 767) {
            // // pc版的捲軸判斷
            // // 可視範圍超過第一屏出現卷軸
            // const grayBoxH_pc =
            //   windowH - $(".header").height() - $(".hint").height() - 70;
            // console.log("grayBoxH_pc: ", grayBoxH_pc);
            // $(".gray-box").css({
            //   height: grayBoxH_pc,
            //   "overflow-y": "scroll",
            // });
            $(".gray-box").css({
                height: "",
                "overflow-y": "",
            });
        } else {
            // m版的捲軸判斷
            // 內容超過六個item出現卷軸
            const item = $(".gray-box").find(">div");
            const itemQuantity = item.length;
            const itemH = item.outerHeight();
            if (itemQuantity > 6) {
                $(".gray-box").css({
                    height: itemH * 3 + 60,
                    "overflow-y": "scroll",
                });
            }
        }
    });

    //// 以下提供demo步驟，後端開發可移除
    //$(".reload").on("click", function () {
    //    window.location.href = "1.html";
    //});

    //$(".goprev").on("click", function () {
    //    window.location.href = `${getPageNumber() - 1}.html`;
    //});

    //$(".gray-box").on("click", ".item", function () {
    //    window.location.href = `${getPageNumber() + 1}.html`;
    //});
});

function getPageNumber() {
    const {
        location: { pathname },
    } = window;
    const pageNumber = Number(pathname.replace("/", "").replace(".html", ""));
    return pageNumber;
}
