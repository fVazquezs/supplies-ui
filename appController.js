import { ProductCard } from './src/components/product-card/product-card.js';

window.changeView = changeView;

function changeView(view) {
    $('#content').append().load('src/components/' + view + '-card/' + view + '-card.html');
}


