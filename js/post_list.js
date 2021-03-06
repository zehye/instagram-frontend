// Token값을 가져오는 함수
function getToken(username, password) {
  axios.post('http://localhost:8000/api/users/auth-token/', {
    username: username,
    password: password,
  })
  .then(function (response) {
    var token = response.data.token;
    setCookie('token', token, 10);
  })
  .catch(function (error) {
    console.log(error);
  })
}

function authTest() {
  axios({
    method: 'get',
    url: 'http://localhost:8000/api/users/auth-test/',
    headers: {
      'Authorization': 'Token ' + getCookie('token')
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
// /api/posts/에 GET요청
axios.get('http://localhost:8000/api/posts/')
  // 성공시
  .then(function (response) {
    // response,data가 가진 요소들을 순회
    // console.log(response.data);
    for (var i = 0; i < response.data.length; i++) {
      // 각 순회에 해당하는 요소는 curPost
      var curPost = response.data[i];
      console.log(curPost);

      // curPost의 내용을 '.content'요소에 append(뒤에 붙여놓음)
      // var curElement = '<p>' + curPost.pk + '</p>';
      var curElement = '<div class="card mb-3">';
      curElement    +=   '<div class="card-header">' + curPost.author + '(pk:' + curPost.pk +')'+ '</div>';
      curElement    +=   '<div class="card-body p-0">';
      curElement    +=     '<img src="' + curPost.photo + '" width="100%">'
      curElement    +=   '</div>';
      curElement    += '</div>';
      $(".content").append(curElement);

      var curElement = `<div class="card mb-3">
                          <div class="card-header"></div>
                          <div class="card-body p-0">
                            <img src="${curPost.photo}" width="100%">
                          </div>
                        </div>`
    }
  })
  .catch(function (error) {
    console.log(error);
  });
