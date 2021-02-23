
var picitem = document.getElementById('picitem').innerHTML
document.getElementById('piclist').innerHTML = ""
var page = 1;

$(function () {
    getPage(page)
})

$(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        morePage()
    }
});
$('.portfolio-menu button.btn').on('click', function () {
    debugger
    if ($(this).hasClass('active'))
        $(this).removeClass('active');
    else
        $(this).addClass('active');
    searchPage()
})

function morePage() {
    getPage(++page)
}

function searchPage() {
    document.getElementById('piclist').innerHTML = ""
    page = 1
    getPage(page)
}

function getPage(page) {
    var url = 'https://wallhaven.cc/api/v1/search?'
    url += 'page=' + page
    url += '&categories=' + categories()
    url += '&purity=' + purity()


    $.getJSON(url, function (result) {
        result.data.map(function (item) {
            return $('#piclist').append(picitem
                .replace('#category#', item.category)
                .replace('#thumbs.original#', item.thumbs.original))
        })
    })
}

function categories() {
    return ($('#btnGeneral').hasClass('active') ? '1' : '0') + ($('#btnAnime').hasClass('active') ? '1' : '0') + ($('#btnPeople').hasClass('active') ? '1' : '0')
}
function purity() {
    return ($('#btnSfw').hasClass('active') ? '1' : '0') + '00'//($('#btnSketchy').hasClass('active') ? '1' : '0') + '0'
}