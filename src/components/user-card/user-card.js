

export class userCard {
  test() {
    console.log('testing the user card')
  }
  render() {
    console.log('inside the profuct')
    return document.querySelector('.co-user-card');
  }
}


window.userCardCtrl = new userCard();
