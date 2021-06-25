import React, { Component } from 'react';

export default class Filter extends Component {
    render() {
        return (
        <div className = "filter">
            <div className="filter-result">{this.props.count} Products</div>
            <div className="filter-sort">
                Order {" "} <select value = {this.props.size} onChange={this.props.sortProducts}>
                    <option value = "">Latest</option>
                    <option value = "lowest">Lowest</option>
                    <option value = "highest">Highest</option>
                </select>
            </div>
            <div className="filter-size">Filter {" "}<select value ={this.props.size} onChange={this.props.filterProducts}>
                <option value = "">ALL</option>
                <option value = "6">6</option>
                <option value = "6.5">6.5</option>
                <option value = "7">7</option>
                <option value = "7.5">7.5</option>
                <option value = "8">8</option>
                <option value = "8.5">8.5</option>
                <option value = "9">9</option>
                <option value = "9.5">9.5</option>
                <option value = "10">10</option>

            </select>
            </div>
        </div>
    


        );
    }
}
