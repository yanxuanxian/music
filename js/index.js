$(function () {
    $(document).on('contextmenu', false);
    var database = [
        {
            "filename": "./musics/いけないボーダーライン (禁绝边境线) .mp3",
            "duration": "04:38",
            "title": "いけないボーダーライン (禁绝边境线)",
            "artist": "ワルキューレ"
        },
        {
            "filename": "./musics/aLIEz.mp3",
            "duration": "04:28",
            "title": "aLIEz",
            "artist": "澤野弘之"
        },
        {
            "filename": "./musics/학교를 안갔어 (没去学校).mp3",
            "duration": "04:06",
            "title": "학교를 안갔어 (没去学校)",
            "artist": "梁玄梁夏"
        },
        {
            "filename": "./musics/바보사랑 (傻瓜爱情).mp3",
            "duration": "03:22",
            "title": "바보사랑 (傻瓜爱情)",
            "artist": "李准基"
        },
        {
            "filename": "./musics/lubov.mp3",
            "duration": "03:02",
            "title": "lubov",
            "artist": "Ross Tallanma"
        },
        {
            "filename": "./musics/Breakin' It Down.mp3",
            "duration": "03:45",
            "title": "Breakin' It Down",
            "artist": "Flying Steps"
        },
        {
            "filename": "./musics/Flash Funk.mp3",
            "duration": "03:22",
            "title": "Flash Funk",
            "artist": "纯音乐"
        }
    ]
    var makelist = function () {
        $(database).each(function (i, v) {
            $('<li index="' + i + '" class="li"><strong class="music_name" title="' + v.title + '">' + v.title + '</strong>  <strong class="singer_name" title="' + v.artist + '">' + v.artist + '</strong> <strong class="play_time">' + v.duration + '</strong>  <div class="list_cp">  <strong class="btn_like" title="喜欢" name="" mid="004fQTu016b9W4">   <span>我喜欢</span>   </strong>   <strong class="btn_share" title="分享"> <span>分享</span> </strong>  <strong class="btn_fav" title="收藏到歌单"> <span>收藏</span> </strong>  <strong class="btn_del" title="从列表中删除"> <span>删除</span> </strong></div> </li>)').appendTo($('#cc'))
        })
    }
    makelist();
    $('.open_list span').text(database.length)
    var a = $('audio').get(0)
// 设置开始和暂停
    $('#btnplay').on('click', function () {
        var src = $('audio').attr('src')
        if (!src) {   //解决和下面歌曲点击的冲突 判断audio属性值src是否为空
            a.src = database[0].filename
            $('#cc li:nth-child(1)').addClass('play_current')
            $('#music_name').text(database[0].title)
            $('.singerr_name').text(database[0].artist)
            $('.play_date').text(database[0].duration)
        }
        if (a.paused === true) {
            a.play()
        } else {
            a.pause()
        }
    })
    //界面
    $('#btnplay').on('click', function () {
        if ($(this).hasClass('play_bt')) {
            $(this).removeClass('play_bt')
            $(this).addClass('pause_bt')
        } else {
            $(this).removeClass('pause_bt')
            $(this).addClass('play_bt')
        }
    })
//设置进度条的进度
    a.ontimeupdate = function () {
        var jjtd = ((a.currentTime / a.duration).toFixed(2)) * 100 + '%';
        $('#spanplaybar').css('width', jjtd)
        $('#spanprogress_op').css('left', jjtd)
    }
//点击设置音量
    $('#spanvolume').on('click', function (e) {
        var yl = (e.offsetX / this.offsetWidth).toFixed(2);
        var yll = (e.offsetX / this.offsetWidth).toFixed(2) * 71 + 'px';
        a.volume = yl;
        $('.volume_bar').css('width', yll)
        $('.volume_op').css('left', yll)
    })
//拖动设置音量
    $('.volume_op').on('mousedown', function () {
        $(document).on('mousemove', function (e) {
            var regulate = $('.volume_regulate');
            e.preventDefault();
            var left = (e.clientX - regulate.offset().left - $('.volume_op').width() / 2).toFixed(0);
            if (left < 0 || left > regulate.width()) {
                return;
            }
            a.volume = left / regulate.width();
        })
        $(document).on('mouseup', function () {
            $(this).off('mousemove');
        })
    })
//设置静音和非静音
    var cc = a.volume
    $('#spanmute').on('click', function () {
        if (a.volume === 0) {
            a.volume = cc;
            $('.volume_op').css('left', 71)
        } else {
            a.volume = 0;
            $('.volume_op').css('left', 0)
        }
    })
    $('#spanmute').on('click', function () {
        if ($(this).hasClass('volume_icon')) {
            $(this).removeClass('volume_icon')
            $(this).addClass('volume_mute')
        } else {
            $(this).removeClass('volume_mute')
            $(this).addClass('volume_icon')
        }
    })
//点击展开列表
    $('#spansongnum1').on('click', function () {
        if ($('.play_list_fram').hasClass('style')) {
            $('.play_list_fram').removeClass('style').animate({opacity: '0'}, "slow");
        } else {
            $('.play_list_fram').addClass('style').animate({opacity: '1'}, "slow");
        }
    })
    $('.close_list').on('click',function(){
        $('#spansongnum1').trigger('click');
    })
//界面展开关闭
    $('.folded_bt').on('click', function () {
        if ($('.m_player').hasClass('style')) {
            $('.m_player').removeClass('style').animate({left: '-548px'}, "slow");
            var cc = window.screen.height
            $('body').css({width: '100%', height: cc})
            document.documentElement.webkitRequestFullScreen()
            $('.kk').show()
        } else {
            $('.m_player').addClass('style').animate({left: '0'}, "slow")
        }
    })
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            $('.kk').hide()
        }
    })
    $('.kk').on('click', function () {
        document.webkitCancelFullScreen();
        $(this).toggle()
    })
//点击那首唱那首
    var dangqian = 0;
    var bofang = function () {
        a.play()
        $('#cc li').removeClass('play_current').eq(dangqian).addClass('play_current')
        $('#music_name').text(database[dangqian].title)
        $('.singerr_name').text(database[dangqian].artist)
        $('.play_date').text(database[dangqian].duration)
        $('#btnplay').addClass('pause_bt')
    }
    $('#cc').on('click', 'li', function () {
        dangqian = $(this).index()
        a.src = database[dangqian].filename
        bofang()
    })
//点击设置播放时间
    $('.player_bar').on('click', function (e) {
        var src = $('audio').attr('src')
        if (!src) {
            return;
        }
        a.currentTime = a.duration * e.offsetX / this.offsetWidth
    })
    $('.player_bar').on('mouseenter mouseleave', function () {
        $('.time_show').toggle()
        var bfsj = (a.currentTime).toFixed(2)
        $('.time_show p').text(bfsj)
    })
//拖动设置播放时间
    $('.progress_op').on('mousedown', function () {
        $(document).on('mousemove', function (e) {
            var regulate = $('.play_bar');
            e.preventDefault();
            var left = (e.clientX - $('.progress_op').width() / 2).toFixed(0);
            if (left < 0 || left > regulate.width()) {
                return;
            }
            a.currentTime = left / regulate.width() * audio.duration;
        })
        $(document).on('mouseup', function () {
            $(this).off('mousemove');
        })
    })
//上一首
    $('#prevbt').on('click', function () {
        if (dangqian === 0) {
            dangqian = database.length;
        }
        dangqian -= 1
        a.src = database[dangqian].filename
        bofang()
    })
//下一首
    $('#nextbt').on('click', function () {
        if (dangqian === database.length - 1) {
            dangqian = -1;
        }
        dangqian += 1
        a.src = database[dangqian].filename
        bofang()
    })
//鼠标移上去出现删除
    $('#cc').on('mouseenter mouseleave', 'li', function () {
        $(this).toggleClass('play_hover')
    })
//点击删除删除一条歌曲
    $('.single_list ul').on('click', '.btn_del', function () {
        var _i = $('.single_list .btn_del').index(this);
        //正在播放切到下一首
        if ($(this).closest('li').hasClass('play_current')) {
            dangqian = _i + 1;
            bofang();
        }
        database = $.grep(database, function (v, i) {
            return _i !== i;
        })
        $(this).closest('li').remove();
        $('#spansongnum1 span').text(database.length)
        return false; //阻止事件默认行为和默认事件
    })
//唱完一首接下一首
    var xunhuan = function () {
        var ms = $('#btnPlayway').attr('class')
        //单曲循环
        if (ms === 'cycle_single_bt') {
            dangqian = dangqian
        } else if (ms === 'unordered_bt') {
            var sj = Math.floor(Math.random() * database.length)
            dangqian = sj
        } else if (ms === 'ordered_bt') {
            dangqian = dangqian + 1;
            if (dangqian === database.length) {
                a.pause();
                return;
            }
        } else {
            dangqian += 1;
            if (dangqian === database.length) {
                dangqian = 0;
            }
        }
        a.src = database[dangqian].filename
        bofang()
    }
    $(a).on('ended', xunhuan)

//播放模式
    $('#btnPlayway').on('click', function () {
        $('#divselect').show()
    })
    $('#divselect').on('click', 'strong', function () {
        $('#btnPlayway').removeClass().addClass($(this).attr('class'))
        $('#divselect').hide()
    })

})