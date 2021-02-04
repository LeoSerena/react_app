'use strict';

//CLOCK

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this.state = { date: new Date() };
    return _this;
  }

  _createClass(Clock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timerID = setInterval(function () {
        return _this2.tick();
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.setState({
        date: new Date()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          'It is ',
          this.state.date.toLocaleTimeString()
        )
      );
    }
  }]);

  return Clock;
}(React.Component);

// TABLE


var Table = function (_React$Component2) {
  _inherits(Table, _React$Component2);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this3 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this3.state = {
      table: []
    };
    _this3.sort_by = _this3.sort_by.bind(_this3);
    _this3.renderHeaders = _this3.renderHeaders.bind(_this3);
    return _this3;
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        table: this.props.table
      });
    }
  }, {
    key: 'sort_by',
    value: function sort_by(header) {
      var temp = this.state.table;
      temp.sort(function (a, b) {
        return a[header] > b[header];
      });
      this.setState({ table: temp });
    }
  }, {
    key: 'renderHeaders',
    value: function renderHeaders(names) {
      var _this4 = this;

      return names.map(function (header) {
        return React.createElement(
          'th',
          { key: header, onClick: function onClick(e) {
              return _this4.sort_by(header, e);
            } },
          ' ',
          header.toUpperCase(),
          ' '
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {

      // if no elements are yet stored
      if (this.state.table.length == 0) {
        return React.createElement(
          'p',
          null,
          ' Nothing yet '
        );

        // if elements are retrieved
      } else {

        // builds the headers of the table

        // builds the rows of the table
        var renderRows = function renderRows(rows) {
          return rows.map(function (row, index) {
            return React.createElement(
              'tr',
              { key: index + 10 },
              Object.values(row).map(function (value, index) {
                return React.createElement(
                  'td',
                  { key: index },
                  value
                );
              })
            );
          });
        };

        // gets the key names
        var names = Object.keys(this.state.table[0]);

        return React.createElement(
          'table',
          { className: 'table' },
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              this.renderHeaders(names)
            ),
            renderRows(this.state.table)
          )
        );
      }
    }
  }]);

  return Table;
}(React.Component);

// APP


var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this5 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this5.state = {
      id: 0,
      initialData: []
    };
    return _this5;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this6 = this;

      var FETCH_USR_TABLE_URL = "table/123";
      var res = fetch(FETCH_USR_TABLE_URL, {
        method: 'GET'
      }).then(function (response) {
        response.json().then(function (json) {
          var id = json.id;
          var table = json.table;
          _this6.setState({
            id: id,
            initialData: table
          });
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.initialData.length == 0) {
        return React.createElement(
          'div',
          null,
          React.createElement(Clock, null),
          React.createElement(
            'p',
            null,
            ' Loading table... '
          )
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(Clock, null),
          React.createElement(Table, { id: this.state.id, className: 'table', table: this.state.initialData })
        );
      }
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));