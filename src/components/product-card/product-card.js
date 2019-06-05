
customElements.define('co-product-card', class extends HTMLElement{
  constructor(){
    super();

    this._shadowRoot = this.attachShadow({mode: 'open'});

    _shadowRoot.innerHTML = '<div id="root-co-product-card">testing</div>';

    this._shadowRoot.getElementById('root-co-product-card');
  }
})

export class ProductCard {
  test() {
    console.log('test')
  }
  render() {
    console.log('inside the profuct')
    return document.querySelector('.co-product-card');
  }
}


window.productCardCtrl = new ProductCard();
