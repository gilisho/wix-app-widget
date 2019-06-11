'use strict';

var $ = require('jquery');
var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',
  getInitialState: function getInitialState() {
    return {
      rates: {},
      conversion: 'USD',
      base: 0,
      converted: 0
    };
  },
  getRates: function getRates() {
    var _this = this;

    $.getJSON('http://data.fixer.io/api/latest?access_key=e9f65e65859ebc735371117c681436db', function (res) {
      _this.setState({
        rates: res.rates
      });
    });
  },
  componentDidMount: function componentDidMount() {
    this.getRates();
  },
  selectConversion: function selectConversion(e) {
    var _this2 = this;

    this.setState({ conversion: e.target.value }, function () {
      _this2.convertCurrency();
    });
  },
  convertCurrency: function convertCurrency(e) {
    var val = this.state.base;
    if (e && e.target) {
      val = e.target.value;
    }
    var rate = this.state.rates[this.state.conversion];

    this.setState({
      base: val || '',
      converted: (parseInt(val) || 0) * rate
    });
  },


  render: function render() {
    return React.createElement(
      'div',
      { className: 'currency-converter' },
      React.createElement(
        'form',
        { className: 'form-horizontal' },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'div',
            { className: 'column-left col-md-6' },
            React.createElement('input', { className: 'form-control', disabled: true, value: 'EUR', type: 'text' })
          ),
          React.createElement(
            'div',
            { className: 'column-right col-md-6' },
            React.createElement('input', { type: 'text', className: 'form-control', onChange: this.convertCurrency, value: this.state.base })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'div',
            { className: 'column-left col-md-6' },
            React.createElement(
              'select',
              { className: 'form-control', onChange: this.selectConversion },
              React.createElement(
                'option',
                { value: 'USD' },
                'US Dollar'
              ),
              React.createElement(
                'option',
                { value: 'EUR' },
                'Euro'
              )
             
            )
          ),
          React.createElement(
            'div',
            { className: 'column-right col-md-6' },
            React.createElement('input', { type: 'text', className: 'form-control', label: this.state.conversion, onChange: this.convertCurrency, value: this.state.converted })
          )
        )
      )
    );
  }
});