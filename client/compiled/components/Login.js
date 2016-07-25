'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props));

    _this.state = {
      username: '',
      password: ''
    };
    return _this;
  }

  _createClass(Login, [{
    key: 'handleUsernameChange',
    value: function handleUsernameChange(e) {
      this.setState({ username: e.target.value });
    }
  }, {
    key: 'handlePasswordChange',
    value: function handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: 'handleLogin',
    value: function handleLogin(e) {
      e.preventDefault();

      var username = this.state.username;
      var password = this.state.password;

      if (username && password) {
        this.setState({
          username: '',
          password: ''
        });

        $.ajax({
          url: '/loginUser',
          type: 'POST',
          data: JSON.stringify({ username: username, password: password }),
          contentType: 'application/json',
          success: function (data) {
            this.props.updateStateAfterLogin(data);
            browserHistory.push('/');
          }.bind(this),
          error: function error(data) {
            alert('Incorrect username or password!');
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'h3',
          null,
          'Welcome back!'
        ),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col s6 offset-s3' },
            React.createElement(
              'form',
              { className: 'section', onSubmit: this.handleLogin.bind(this) },
              React.createElement('input', {
                type: 'text', placeholder: 'username',
                value: this.state.username,
                onChange: this.handleUsernameChange.bind(this)
              }),
              React.createElement('input', {
                type: 'password', placeholder: 'password',
                value: this.state.password,
                onChange: this.handlePasswordChange.bind(this)
              }),
              React.createElement(
                'button',
                { className: 'btn waves-effect waves-light grey darken-3', type: 'submit', name: 'action' },
                'login'
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(React.Component);

window.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvTG9naW4uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxLOzs7QUFDSixpQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEseUZBQ1gsS0FEVzs7QUFFakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxnQkFBVSxFQURDO0FBRVgsZ0JBQVU7QUFGQyxLQUFiO0FBRmlCO0FBTWxCOzs7O3lDQUVvQixDLEVBQUc7QUFDdEIsV0FBSyxRQUFMLENBQWMsRUFBQyxVQUFVLEVBQUUsTUFBRixDQUFTLEtBQXBCLEVBQWQ7QUFDRDs7O3lDQUVvQixDLEVBQUc7QUFDdEIsV0FBSyxRQUFMLENBQWMsRUFBQyxVQUFVLEVBQUUsTUFBRixDQUFTLEtBQXBCLEVBQWQ7QUFDRDs7O2dDQUVXLEMsRUFBRztBQUNiLFFBQUUsY0FBRjs7QUFFQSxVQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsUUFBMUI7QUFDQSxVQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsUUFBMUI7O0FBRUEsVUFBSSxZQUFZLFFBQWhCLEVBQTBCO0FBQ3hCLGFBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVUsRUFERTtBQUVaLG9CQUFVO0FBRkUsU0FBZDs7QUFLQSxVQUFFLElBQUYsQ0FBTztBQUNMLGVBQUssWUFEQTtBQUVMLGdCQUFNLE1BRkQ7QUFHTCxnQkFBTSxLQUFLLFNBQUwsQ0FBZSxFQUFDLFVBQVUsUUFBWCxFQUFxQixVQUFVLFFBQS9CLEVBQWYsQ0FIRDtBQUlMLHVCQUFhLGtCQUpSO0FBS0wsbUJBQVMsVUFBUyxJQUFULEVBQWU7QUFDdEIsaUJBQUssS0FBTCxDQUFXLHFCQUFYLENBQWlDLElBQWpDO0FBQ0EsMkJBQWUsSUFBZixDQUFvQixHQUFwQjtBQUNELFdBSFEsQ0FHUCxJQUhPLENBR0YsSUFIRSxDQUxKO0FBU0wsaUJBQU8sZUFBUyxJQUFULEVBQWU7QUFDcEIsa0JBQU0saUNBQU47QUFDRDtBQVhJLFNBQVA7QUFhRDtBQUNGOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLHVDQUZGO0FBR0UsdUNBSEY7QUFJRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFNLFdBQVUsU0FBaEIsRUFBMEIsVUFBVSxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBcEM7QUFDRTtBQUNFLHNCQUFLLE1BRFAsRUFDYyxhQUFZLFVBRDFCO0FBRUUsdUJBQU8sS0FBSyxLQUFMLENBQVcsUUFGcEI7QUFHRSwwQkFBVSxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CO0FBSFosZ0JBREY7QUFNRTtBQUNFLHNCQUFLLFVBRFAsRUFDa0IsYUFBWSxVQUQ5QjtBQUVFLHVCQUFPLEtBQUssS0FBTCxDQUFXLFFBRnBCO0FBR0UsMEJBQVUsS0FBSyxvQkFBTCxDQUEwQixJQUExQixDQUErQixJQUEvQjtBQUhaLGdCQU5GO0FBV0U7QUFBQTtBQUFBLGtCQUFRLFdBQVUsNENBQWxCLEVBQStELE1BQUssUUFBcEUsRUFBNkUsTUFBSyxRQUFsRjtBQUFBO0FBQUE7QUFYRjtBQURGO0FBREY7QUFKRixPQURGO0FBd0JEOzs7O0VBdEVpQixNQUFNLFM7O0FBeUUxQixPQUFPLEtBQVAsR0FBZSxLQUFmIiwiZmlsZSI6IkxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTG9naW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVVc2VybmFtZUNoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH1cblxuICBoYW5kbGVQYXNzd29yZENoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH1cblxuICBoYW5kbGVMb2dpbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIHVzZXJuYW1lID0gdGhpcy5zdGF0ZS51c2VybmFtZTtcbiAgICB2YXIgcGFzc3dvcmQgPSB0aGlzLnN0YXRlLnBhc3N3b3JkO1xuXG4gICAgaWYgKHVzZXJuYW1lICYmIHBhc3N3b3JkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgICBwYXNzd29yZDogJydcbiAgICAgIH0pO1xuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvbG9naW5Vc2VyJywgXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSksXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlQWZ0ZXJMb2dpbihkYXRhKTtcbiAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvJyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBhbGVydCgnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkIScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgzPldlbGNvbWUgYmFjayE8L2gzPlxuICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczYgb2Zmc2V0LXMzXCI+XG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWN0aW9uXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlTG9naW4uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJ1c2VybmFtZVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlVXNlcm5hbWVDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUGFzc3dvcmRDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGdyZXkgZGFya2VuLTNcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPmxvZ2luPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuTG9naW4gPSBMb2dpbjtcblxuIl19