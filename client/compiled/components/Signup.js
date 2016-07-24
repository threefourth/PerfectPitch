'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup(props) {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signup).call(this, props));

    _this.state = {
      username: '',
      password: ''
    };
    return _this;
  }

  _createClass(Signup, [{
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
    key: 'handleSignup',
    value: function handleSignup(e) {
      e.preventDefault();

      var username = this.state.username;
      var password = this.state.password;

      if (username && password) {
        this.setState({
          username: '',
          password: ''
        });

        $.ajax({
          url: '/signupNewUser',
          type: 'POST',
          data: JSON.stringify({ username: username, password: password }),
          contentType: 'application/json',
          success: function (data) {
            browserHistory.push('/');
            console.log('successfully signed up!');
          }.bind(this),
          error: function error(data) {
            alert('User already exists! Please sign in');
            browserHistory.push('/login');
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
          'form',
          { className: 'section', onSubmit: this.handleSignup.bind(this) },
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
            'sign up'
          )
        )
      );
    }
  }]);

  return Signup;
}(React.Component);

window.Signup = Signup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU2lnbnVwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sTTs7O0FBQ0osa0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBGQUNYLEtBRFc7O0FBRWpCLFVBQUssS0FBTCxHQUFhO0FBQ1gsZ0JBQVUsRUFEQztBQUVYLGdCQUFVO0FBRkMsS0FBYjtBQUZpQjtBQU1sQjs7Ozt5Q0FFb0IsQyxFQUFHO0FBQ3RCLFdBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxFQUFFLE1BQUYsQ0FBUyxLQUFwQixFQUFkO0FBQ0Q7Ozt5Q0FFb0IsQyxFQUFHO0FBQ3RCLFdBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxFQUFFLE1BQUYsQ0FBUyxLQUFwQixFQUFkO0FBQ0Q7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7O0FBRUEsVUFBSSxXQUFXLEtBQUssS0FBTCxDQUFXLFFBQTFCO0FBQ0EsVUFBSSxXQUFXLEtBQUssS0FBTCxDQUFXLFFBQTFCOztBQUVBLFVBQUksWUFBWSxRQUFoQixFQUEwQjtBQUN4QixhQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFVLEVBREU7QUFFWixvQkFBVTtBQUZFLFNBQWQ7O0FBS0EsVUFBRSxJQUFGLENBQU87QUFDTCxlQUFLLGdCQURBO0FBRUwsZ0JBQU0sTUFGRDtBQUdMLGdCQUFNLEtBQUssU0FBTCxDQUFlLEVBQUMsVUFBVSxRQUFYLEVBQXFCLFVBQVUsUUFBL0IsRUFBZixDQUhEO0FBSUwsdUJBQWEsa0JBSlI7QUFLTCxtQkFBUyxVQUFTLElBQVQsRUFBZTtBQUN0QiwyQkFBZSxJQUFmLENBQW9CLEdBQXBCO0FBQ0Esb0JBQVEsR0FBUixDQUFZLHlCQUFaO0FBQ0QsV0FIUSxDQUdQLElBSE8sQ0FHRixJQUhFLENBTEo7QUFTTCxpQkFBTyxlQUFTLElBQVQsRUFBZTtBQUNwQixrQkFBTSxxQ0FBTjtBQUNBLDJCQUFlLElBQWYsQ0FBb0IsUUFBcEI7QUFDRDtBQVpJLFNBQVA7QUFjRDtBQUNGOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQSxZQUFNLFdBQVUsU0FBaEIsRUFBMEIsVUFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBcEM7QUFDRTtBQUNFLGtCQUFLLE1BRFAsRUFDYyxhQUFZLFVBRDFCO0FBRUUsbUJBQU8sS0FBSyxLQUFMLENBQVcsUUFGcEI7QUFHRSxzQkFBVSxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CO0FBSFosWUFERjtBQU1FO0FBQ0Usa0JBQUssVUFEUCxFQUNrQixhQUFZLFVBRDlCO0FBRUUsbUJBQU8sS0FBSyxLQUFMLENBQVcsUUFGcEI7QUFHRSxzQkFBVSxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CO0FBSFosWUFORjtBQVdFO0FBQUE7QUFBQSxjQUFRLFdBQVUsNENBQWxCLEVBQStELE1BQUssUUFBcEUsRUFBNkUsTUFBSyxRQUFsRjtBQUFBO0FBQUE7QUFYRjtBQURGLE9BREY7QUFpQkQ7Ozs7RUFoRWtCLE1BQU0sUzs7QUFtRTNCLE9BQU8sTUFBUCxHQUFnQixNQUFoQiIsImZpbGUiOiJTaWdudXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTaWdudXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVVc2VybmFtZUNoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH1cblxuICBoYW5kbGVQYXNzd29yZENoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH1cblxuICBoYW5kbGVTaWdudXAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciB1c2VybmFtZSA9IHRoaXMuc3RhdGUudXNlcm5hbWU7XG4gICAgdmFyIHBhc3N3b3JkID0gdGhpcy5zdGF0ZS5wYXNzd29yZDtcblxuICAgIGlmICh1c2VybmFtZSAmJiBwYXNzd29yZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgICAgcGFzc3dvcmQ6ICcnXG4gICAgICB9KTtcblxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL3NpZ251cE5ld1VzZXInLCBcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmR9KSxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy8nKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IHNpZ25lZCB1cCEnKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGFsZXJ0KCdVc2VyIGFscmVhZHkgZXhpc3RzISBQbGVhc2Ugc2lnbiBpbicpO1xuICAgICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9sb2dpbicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VjdGlvblwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVNpZ251cC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJ1c2VybmFtZVwiIFxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVVc2VybmFtZUNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJwYXNzd29yZFwiIFxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVQYXNzd29yZENoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGdyZXkgZGFya2VuLTNcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPnNpZ24gdXA8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuU2lnbnVwID0gU2lnbnVwO1xuIl19