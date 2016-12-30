
		$(function(){


            $.ajax({
                url:"pagingdom.html",
                success:function(data){
                    $("body").after(data);

            //------分页-------
            $paging = $('#paging');
            $prevPageBtn = $('#prevPageBtn');
            $nextPageBtn = $('#nextPageBtn');


            function requestData(){
                console.log("发送请求");
                initPages();
            }

            //生成分页按钮
            function createpagebtn(startno, endno) {
                $pageStr = "";
                for (i = startno; i <= endno; i++) {
                    $pageStr += "<li>" + i + "</li>";
                }
                $paging.html($prevPageBtn.prop('outerHTML') + $pageStr + $nextPageBtn.prop('outerHTML'));
                $pagebtn = $paging.children('li');
                for (var i = 1; i < $pagebtn.length - 1; i++) {

                    //分页中间按钮绑定事件
                    $pagebtn.eq(i).click(function () {
                        __inPage = parseInt($(this).html());
                        requestData(1);
                    });

                    if (parseInt($pagebtn.eq(i).html()) == __inPage) {
                        $pagebtn.eq(i).attr('class', 'inthispage');
                    }
                }
                //上一页事件
                $pagebtn.eq(0).click(function () {
                    if (__inPage > 1) {
                        __inPage = __inPage - 1;
                        requestData(1);
                    } else {
                        alert('已经到第一页了');
                    }
                });
                //下一页事件
                $pagebtn.eq($pagebtn.length - 1).click(function () {
                    if (__inPage < __totalPage) {
                        __inPage = __inPage + 1;
                        requestData(1);
                    } else {
                        alert('已经到最后一页了');
                    }
                });
            }

            //初始化分页数据(计算分页显示)
            function initPages() {

                $paging.html('');
                
                $("#dqy").html(__inPage);
                $("#zgy").html(__totalPage);

                //如果小于5页，直接显示
                if (__totalPage < 5 || __totalPage == 5) {
                    createpagebtn(1, __totalPage);
                }
                    //如果大于5页，当前页小于3
                else if (__totalPage > 5 && __inPage <= 3) {
                    createpagebtn(1, 5);
                }
                    //如果大于5页，当前页在尾页-3
                else if (__totalPage > 5 && __inPage >= __totalPage - 3) {
                    createpagebtn(__totalPage - 4, __totalPage);
                }
                    //如果大于5页，当前页在中间(正常情况)
                else if (__totalPage > 5) {
                    createpagebtn(__inPage - 2, __inPage + 2);
                }
            }


            initPages();
            //------分页结束-------

                }
            });


            })
			
