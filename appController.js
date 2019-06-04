changeView = function (view) {
    $('#content').append().load('src/components/' + view + '-card/' + view + '-card.html');
    test();
}
