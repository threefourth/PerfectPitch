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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU2lnbnVwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sTTs7O0FBQ0osa0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBGQUNYLEtBRFc7O0FBRWpCLFVBQUssS0FBTCxHQUFhO0FBQ1gsZ0JBQVUsRUFEQztBQUVYLGdCQUFVO0FBRkMsS0FBYjtBQUZpQjtBQU1sQjs7Ozt5Q0FFb0IsQyxFQUFHO0FBQ3RCLFdBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxFQUFFLE1BQUYsQ0FBUyxLQUFwQixFQUFkO0FBQ0Q7Ozt5Q0FFb0IsQyxFQUFHO0FBQ3RCLFdBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxFQUFFLE1BQUYsQ0FBUyxLQUFwQixFQUFkO0FBQ0Q7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7O0FBRUEsVUFBSSxXQUFXLEtBQUssS0FBTCxDQUFXLFFBQTFCO0FBQ0EsVUFBSSxXQUFXLEtBQUssS0FBTCxDQUFXLFFBQTFCOztBQUVBLFVBQUksWUFBWSxRQUFoQixFQUEwQjtBQUN4QixhQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFVLEVBREU7QUFFWixvQkFBVTtBQUZFLFNBQWQ7O0FBS0EsVUFBRSxJQUFGLENBQU87QUFDTCxlQUFLLGdCQURBO0FBRUwsZ0JBQU0sTUFGRDtBQUdMLGdCQUFNLEtBQUssU0FBTCxDQUFlLEVBQUMsVUFBVSxRQUFYLEVBQXFCLFVBQVUsUUFBL0IsRUFBZixDQUhEO0FBSUwsdUJBQWEsa0JBSlI7QUFLTCxtQkFBUyxVQUFTLElBQVQsRUFBZTtBQUN0QiwyQkFBZSxJQUFmLENBQW9CLEdBQXBCO0FBQ0Esb0JBQVEsR0FBUixDQUFZLHlCQUFaO0FBQ0QsV0FIUSxDQUdQLElBSE8sQ0FHRixJQUhFLENBTEo7QUFTTCxpQkFBTyxlQUFTLElBQVQsRUFBZTtBQUNwQixrQkFBTSxxQ0FBTjtBQUNEO0FBWEksU0FBUDtBQWFEO0FBQ0Y7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxXQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQU0sV0FBVSxTQUFoQixFQUEwQixVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFwQztBQUNFO0FBQ0Usa0JBQUssTUFEUCxFQUNjLGFBQVksVUFEMUI7QUFFRSxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxRQUZwQjtBQUdFLHNCQUFVLEtBQUssb0JBQUwsQ0FBMEIsSUFBMUIsQ0FBK0IsSUFBL0I7QUFIWixZQURGO0FBTUU7QUFDRSxrQkFBSyxVQURQLEVBQ2tCLGFBQVksVUFEOUI7QUFFRSxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxRQUZwQjtBQUdFLHNCQUFVLEtBQUssb0JBQUwsQ0FBMEIsSUFBMUIsQ0FBK0IsSUFBL0I7QUFIWixZQU5GO0FBV0U7QUFBQTtBQUFBLGNBQVEsV0FBVSw0Q0FBbEIsRUFBK0QsTUFBSyxRQUFwRSxFQUE2RSxNQUFLLFFBQWxGO0FBQUE7QUFBQTtBQVhGO0FBREYsT0FERjtBQWlCRDs7OztFQS9Ea0IsTUFBTSxTOztBQWtFM0IsT0FBTyxNQUFQLEdBQWdCLE1BQWhCIiwiZmlsZSI6IlNpZ251cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNpZ251cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VybmFtZTogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZVVzZXJuYW1lQ2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt1c2VybmFtZTogZS50YXJnZXQudmFsdWV9KTtcbiAgfVxuXG4gIGhhbmRsZVBhc3N3b3JkQ2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtwYXNzd29yZDogZS50YXJnZXQudmFsdWV9KTtcbiAgfVxuXG4gIGhhbmRsZVNpZ251cChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIHVzZXJuYW1lID0gdGhpcy5zdGF0ZS51c2VybmFtZTtcbiAgICB2YXIgcGFzc3dvcmQgPSB0aGlzLnN0YXRlLnBhc3N3b3JkO1xuXG4gICAgaWYgKHVzZXJuYW1lICYmIHBhc3N3b3JkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgICBwYXNzd29yZDogJydcbiAgICAgIH0pO1xuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvc2lnbnVwTmV3VXNlcicsIFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZH0pLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnLycpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzZnVsbHkgc2lnbmVkIHVwIScpO1xuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgYWxlcnQoJ1VzZXIgYWxyZWFkeSBleGlzdHMhIFBsZWFzZSBzaWduIGluJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWN0aW9uXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU2lnbnVwLmJpbmQodGhpcyl9PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInVzZXJuYW1lXCIgXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS51c2VybmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVVzZXJuYW1lQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cInBhc3N3b3JkXCIgXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVBhc3N3b3JkQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgZ3JleSBkYXJrZW4tM1wiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+c2lnbiB1cDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbndpbmRvdy5TaWdudXAgPSBTaWdudXA7XG4iXX0=