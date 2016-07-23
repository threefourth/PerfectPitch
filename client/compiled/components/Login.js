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
            browserHistory.push('/');
            console.log('successfully logged in!');
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
          'log in'
        )
      );
    }
  }]);

  return Login;
}(React.Component);

window.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvTG9naW4uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxLOzs7QUFDSixpQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEseUZBQ1gsS0FEVzs7QUFFakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxnQkFBVSxFQURDO0FBRVgsZ0JBQVU7QUFGQyxLQUFiO0FBRmlCO0FBTWxCOzs7O3lDQUVvQixDLEVBQUc7QUFDdEIsV0FBSyxRQUFMLENBQWMsRUFBQyxVQUFVLEVBQUUsTUFBRixDQUFTLEtBQXBCLEVBQWQ7QUFDRDs7O3lDQUVvQixDLEVBQUc7QUFDdEIsV0FBSyxRQUFMLENBQWMsRUFBQyxVQUFVLEVBQUUsTUFBRixDQUFTLEtBQXBCLEVBQWQ7QUFDRDs7O2dDQUVXLEMsRUFBRztBQUNiLFFBQUUsY0FBRjs7QUFFQSxVQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsUUFBMUI7QUFDQSxVQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsUUFBMUI7O0FBRUEsVUFBSSxZQUFZLFFBQWhCLEVBQTBCO0FBQ3hCLGFBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVUsRUFERTtBQUVaLG9CQUFVO0FBRkUsU0FBZDs7QUFLQSxVQUFFLElBQUYsQ0FBTztBQUNMLGVBQUssWUFEQTtBQUVMLGdCQUFNLE1BRkQ7QUFHTCxnQkFBTSxLQUFLLFNBQUwsQ0FBZSxFQUFDLFVBQVUsUUFBWCxFQUFxQixVQUFVLFFBQS9CLEVBQWYsQ0FIRDtBQUlMLHVCQUFhLGtCQUpSO0FBS0wsbUJBQVMsVUFBUyxJQUFULEVBQWU7QUFDdEIsMkJBQWUsSUFBZixDQUFvQixHQUFwQjtBQUNBLG9CQUFRLEdBQVIsQ0FBWSx5QkFBWjtBQUNELFdBSFEsQ0FHUCxJQUhPLENBR0YsSUFIRSxDQUxKO0FBU0wsaUJBQU8sZUFBUyxJQUFULEVBQWU7QUFDcEIsa0JBQU0saUNBQU47QUFDRDtBQVhJLFNBQVA7QUFhRDtBQUNGOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFNLFdBQVUsU0FBaEIsRUFBMEIsVUFBVSxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBcEM7QUFDRTtBQUNFLGdCQUFLLE1BRFAsRUFDYyxhQUFZLFVBRDFCO0FBRUUsaUJBQU8sS0FBSyxLQUFMLENBQVcsUUFGcEI7QUFHRSxvQkFBVSxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CO0FBSFosVUFERjtBQU1FO0FBQ0UsZ0JBQUssVUFEUCxFQUNrQixhQUFZLFVBRDlCO0FBRUUsaUJBQU8sS0FBSyxLQUFMLENBQVcsUUFGcEI7QUFHRSxvQkFBVSxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CO0FBSFosVUFORjtBQVdFO0FBQUE7QUFBQSxZQUFRLFdBQVUsNENBQWxCLEVBQStELE1BQUssUUFBcEUsRUFBNkUsTUFBSyxRQUFsRjtBQUFBO0FBQUE7QUFYRixPQURGO0FBZUQ7Ozs7RUE3RGlCLE1BQU0sUzs7QUFnRTFCLE9BQU8sS0FBUCxHQUFlLEtBQWYiLCJmaWxlIjoiTG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBMb2dpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VybmFtZTogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZVVzZXJuYW1lQ2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt1c2VybmFtZTogZS50YXJnZXQudmFsdWV9KTtcbiAgfVxuXG4gIGhhbmRsZVBhc3N3b3JkQ2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtwYXNzd29yZDogZS50YXJnZXQudmFsdWV9KTtcbiAgfVxuXG4gIGhhbmRsZUxvZ2luKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgdXNlcm5hbWUgPSB0aGlzLnN0YXRlLnVzZXJuYW1lO1xuICAgIHZhciBwYXNzd29yZCA9IHRoaXMuc3RhdGUucGFzc3dvcmQ7XG5cbiAgICBpZiAodXNlcm5hbWUgJiYgcGFzc3dvcmQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB1c2VybmFtZTogJycsXG4gICAgICAgIHBhc3N3b3JkOiAnJ1xuICAgICAgfSk7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9sb2dpblVzZXInLCBcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmR9KSxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy8nKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiEnKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGFsZXJ0KCdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQhJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWN0aW9uXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlTG9naW4uYmluZCh0aGlzKX0+XG4gICAgICAgIDxpbnB1dCBcbiAgICAgICAgICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwidXNlcm5hbWVcIiBcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS51c2VybmFtZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVVc2VybmFtZUNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAvPlxuICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJwYXNzd29yZFwiIFxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVBhc3N3b3JkQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBncmV5IGRhcmtlbi0zXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5sb2cgaW48L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbndpbmRvdy5Mb2dpbiA9IExvZ2luO1xuIl19