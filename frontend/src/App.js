  import React from "react";
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Items from "./components/Items";
  import Categories from "./components/Categories";
  import ShowFullItem from "./components/ShowFullItem";
  import Notification from './components/Notification';

  class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        orders: [],
        currentItems: [],
        items: [],
        showFullItem: false,
        fullItem: {},
        searchQuery: '',
        notificationMessage: '',
        showNotification: false
      }
      this.state.currentItems = this.state.items
      this.addToOrder = this.addToOrder.bind(this)
      this.deleteOrder = this.deleteOrder.bind(this)
      this.chooseCategory = this.chooseCategory.bind(this)
      this.onShowItem = this.onShowItem.bind(this)
    }

    componentDidMount() {
      fetch('http://62.217.179.55:3001/api/product')
        .then((response) => {
          return response.json();
        })
        .then(data => this.setState({ items: data }));
      }

    render(){
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} onSearch={this.handleSearch.bind(this)} />
        <Categories chooseCategory={this.chooseCategory} />
        <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder} />
  
        {this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem} />}
        <Footer />  
        {this.state.showNotification && (
        <Notification message={this.state.notificationMessage} />
      )}
      </div>
      )
    }
  
    handleSearch(query) {
      this.setState({ searchQuery: query }, () => {
        this.filterItems(); 
      });
    }

    filterItems() {
      const { items, searchQuery } = this.state;
      const filteredItems = items.filter(item => {
        const title = item.title.toLowerCase();
        const category = item.category.toLowerCase();
        const query = searchQuery.toLowerCase();
        return title.includes(query) || category.includes(query);
      });
      this.setState({ currentItems: filteredItems });
    }

    onShowItem(item) {
      this.setState({fullItem: item})
      this.setState({showFullItem: !this.state.showFullItem})
    }
  
    chooseCategory(category){
      if(category === 'all') {
        this.setState({currentItems: this.state.items})
        return
      }
  
      this.setState({
        currentItems: this.state.items.filter(el => el.category === category)
      })
    }
  
    deleteOrder(id){
      this.setState({orders: this.state.orders.filter(el => el.id !== id)})
    }
  
    addToOrder(item) {
      const isInArray = this.state.orders.some(el => el.id === item.id);
    
      if (!isInArray) {
        const updatedOrders = [...this.state.orders, item];
        this.setState({ orders: updatedOrders }, () => {
          this.showNotification(`Товар "${item.title}" добавлен в корзину!`, item);
        });
      }
    }

    showNotification(message, item) {
      this.setState({ notificationMessage: message, showNotification: true, notificationItem: item });  
    
      setTimeout(() => {
        this.setState({ showNotification: false });
      }, 3000);
    }
  }
  export default App;
