import React from 'react';
import ReactDom from 'react-dom';

const order = {
    title: 'Fresh fruits package',
    image: 'http://images.all-free-download.com/images/graphiclarge/citrus_fruit_184416.jpg',
    initialQty: 3
};

class CartItem extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    initialQty: React.PropTypes.number
  };

  static defaultProps = {
    title: 'Undefined Product',
    price: 100,
    initialQty: 0
  };

  state = {
    qty: this.props.initialQty,
    image: this.props.image,
    title: this.props.title,
    price: this.props.price,
    total: 0
  };

  componentWillMount() {
    this.recalculateTotal();
  }
  increaseQty() {
    this.setState({qty: this.state.qty + 1}, this.recalculateTotal);
  }
  decreaseQty() {
    let newQty = this.state.qty > 0 ? this.state.qty - 1 : 0;
    this.setState({qty: newQty}, this.recalculateTotal);
  }
  recalculateTotal() {
    this.setState({total: this.state.qty * this.props.price});
  }

  render() {
    return <article className="row large-4">
      <figure className="text-center">
        <p>
          <img src={this.state.image}/>
        </p>
        <figcaption>
          <h2>{this.state.title}</h2>
        </figcaption>
      </figure>
      <p className="large-4 column"><strong>Quantity: {this.state.qty}</strong></p>

      <p className="large-4 column">
        <button onClick={this.increaseQty.bind(this)} className="button success">+</button>
        <button onClick={this.decreaseQty.bind(this)} className="button alert">-</button>
      </p>

      <p className="large-4 column"><strong>Price per item:</strong> ${this.state.price}</p>

      <h3 className="large-12 column text-center">
        Total: ${this.state.total}
      </h3>
    </article>;
  }
}

ReactDom.render(
  <CartItem title={order.title} 
    image={order.image} 
    initialQty={order.initialQty} 
    price={order.price}/>,
  document.getElementById('root')
);
