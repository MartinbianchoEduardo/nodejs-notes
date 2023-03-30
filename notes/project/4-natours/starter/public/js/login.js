const login = async (email, password) => {
  try {
    //axios returns a promise
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        //email and password here are the names of the user properties expected
        //(the same name as the login parameters, so leave it just email and password - email:email password:password)
        email,
        password
      }
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  login(email, password);
});
