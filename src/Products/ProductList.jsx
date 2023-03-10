import React, { Component } from "react";
import { Layout, TextField,  Select } from "@shopify/polaris";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], // list of all products
      filteredProducts: [], // list of products matching current filter/search
      filterValue: '', // current filter value
      searchValue: '', // current search value
      priceFilter: '', // current price filter value
    };
  }

  componentDidMount() {
    // fetch products data from your database or API and update state
    this.fetchProducts();
  }

  // function to fetch products data from your database or API
  fetchProducts = () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        image: 'https://via.placeholder.com/200x200',
        category: 'Category 1',
        price: 10.99,
        description: 'This is the description for Product 1',
        tags: ['tag1', 'tag2', 'All'],
      },
      {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/200x200',
        category: 'Category 2',
        price: 15.99,
        description: 'This is the description for Product 2',
        tags: ['tag2', 'tag3'],
      },
      {
        id: 3,
        name: 'Product 3',
        image: 'https://via.placeholder.com/200x200',
        category: 'Category 1',
        price: 20.99,
        description: 'This is the description for Product 3',
        tags: ['tag1', 'tag3'],
      },
    ];

    this.setState({
      products,
      filteredProducts: products,
    });
  };

  // function to handle filtering products by tags
  handleFilter = (value) => {
    this.setState({
      filterValue: value,
      filteredProducts:
        value === ''
          ? this.state.products
          : this.state.products.filter((product) => product.tags.includes(value)),
    });
  };
  

  // function to handle searching products by name and description
  handleSearch = (value) => {
    this.setState({
      searchValue: value,
      filteredProducts: this.state.products.filter(
        (product) =>
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.description.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  // function to handle filtering products by price range
  handlePriceFilter = (value) => {
    this.setState({
      priceFilter: value,
      filteredProducts: this.state.products.filter((product) =>
        this.isPriceInRange(product, value)
      ),
    });
  };

  // function to check if a product's price is within the given range
  isPriceInRange = (product, range) => {
    const [minPrice, maxPrice] = range.split('-');
    const price = parseFloat(product.price);
    return (
      (!minPrice || price >= parseFloat(minPrice)) &&
      (!maxPrice || price <= parseFloat(maxPrice))
    );
  };

  render() {
    return (
      <Layout>
        <Layout.Section>
          <Layout wrap={false}>
            <Select
              label="Filter by tag &#8209; "
              options={[
                { label: 'All', value: '' },
                { label: 'Tag 1', value: 'tag1' },
                { label: 'Tag 2', value: 'tag2' },
              ]}
              value={this.state.filterValue}
              onChange={this.handleFilter}
            />
            <TextField
              label="&#8209;Search by name or description&#8209;"
              value={this.state.searchValue}
              onChange={this.handleSearch}
            />
            <Select
              label="&#8209; Filter by price"
              options={[
                { label: 'All', value: '' },
                { label: '$0-$10', value: '0-10' },
                { label: '$10-$50', value: '10-50' },
                { label: '$50+', value: '50-' },
              ]}
              value={this.state.priceFilter}
              onChange={this.handlePriceFilter}
            />
          </Layout>
        </Layout.Section>
        <Layout.Section>
          {this.state.filteredProducts.map((product) => (
            <Layout key={product.id}>
              <img src={product.image} alt={product.name} />
              <Layout.Section>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </Layout.Section>
            </Layout>
          ))}
        </Layout.Section>
      </Layout>
    );
  }
}
  export default ProductList;  