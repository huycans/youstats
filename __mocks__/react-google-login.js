// export default jest.mock()
const GoogleLogout = (render) => {
  const onClick = jest.fn();
  const disabled = false;
  return render({ onClick, disabled });
};

const GoogleLogin = () => {};
// module.exports = { GoogleLogout, GoogleLogin };
exports.GoogleLogout = GoogleLogout;
exports.GoogleLogin = GoogleLogin;
