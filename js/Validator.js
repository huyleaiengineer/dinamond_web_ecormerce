// A. Kiểm tra các ô input

// Dùng chung

// Bắt sự kiện gõ xuống
function checkTyping(forms1){
    for (var x of forms1)
    {
        x.onkeydown = function (){
        removeErr(this);
    }}
}

// A.1. Các hàm kiểm tra

// 1. Không được trống
function isRequired(input)
{
  return input.value === "" ? "Vui lòng điền dữ liệu": undefined;
}

// 2. Nhập họ tên hợp lệ
function isValidName(input){
  return /\d/.test(input.value) ? "Vui lòng chỉ nhập chữ cái!" : undefined;
}

// 3. Nhập max ký tự
function maxLength(input, max)
{
  return input.value.length> max ? "Vui lòng nhập tối đa " + max + " ký tự" : undefined;
  
}
// 3. Nhập min ký tự
function minLength(input, min)
{
  return input.value.length < min ? "Vui lòng nhập tối thiểu " + min + " ký tự" : undefined;
  
}
// 4. Kiểm tra email hợp lệ
function isValidEmailName(input)
{
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value) ? undefined : "Email không hợp lệ!";
}

// 5. kiểm tra mật khẩu hợp lệ
function isPassWord(input)
{
  var v = input.value;
    if(!(/\d/.test(v))) return "Cần ít nhất 1 ký tự số";
    if(!(/[A-Z]/.test(v))) return "Cần ít nhất một chữ viết hoa";
    if(!(/[a-z]/.test(v))) return "Cần ít nhất một chữ viết thường";
    if(!(/[\W]/.test(v))) return "Cần ít nhất 1 ký tự đặc biệt";

  return undefined;
  
}

// 6. Kiểm tra mật khẩu xác nhận trùng mật khẩu đã nhập
function validName(inputc, input)
{
  return inputc.value === input.value ? undefined : "Mật khẩu không trùng với mật khẩu đã nhập";
  
}


// A.2.
// Hàm show err messagee 
function showErrMessage(input, message)
{
  input.style.boxShadow = "0 0 5px red, 0 0 30px red";
  input.classList.add("errmess");
  document.querySelector(`#${input.id} ~ .erricon`).style.display="block";
  document.querySelector(`#${input.id} ~ .erricon`).title=message;
}
//hàm removeErr
function removeErr(input)
{
  input.style.boxShadow = "0px 0px 5px #ff44f8, 0px 0px 30px #ff44f8";
  input.classList.remove("errmess");
  if (document.querySelector(`#${input.id} ~ .erricon`))
    document.querySelector(`#${input.id} ~ .erricon`).style.display="none";
}


// A.3. Bắt đầu kiểm tra
// Kiểm tra input họ tên
function nameInput(input, f){
    if (isRequired(input)){
      f = 1;
       showErrMessage(input, isRequired(input)); 
    }
    else if (isValidName(input)){
      f = 1;
       showErrMessage(input, isValidName(input));
    }
    else if (maxLength(input, 100)){
      f = 1;
       showErrMessage(input, maxLength(input, 100))
    }
    else{
       removeErr(input);
    }
    
}

function userNameInput(input, f)
{
    if (isRequired(input)){
      f = 1;
       showErrMessage(input, isRequired(input)); 
    }
    else if (maxLength(input, 100)){
      f = 1;
       showErrMessage(input, maxLength(input, 100));
    }
    else if (minLength(input, 8)){
      f = 1;
       showErrMessage(input, minLength(input, 8));
    }
    else
       removeErr(input);
    
}

function emailInput(input, f)
  {
    if (isRequired(input)){
      f = 1;
       showErrMessage(input, isRequired(input)); 
       }
    else if (isValidEmailName(input)){
      f = 1;
      showErrMessage(input, isValidEmailName(input));
   }
    else
       removeErr(input);
  }


function passwordInput(input, f)
{
    if (isRequired(input)){
      f = 1;
      showErrMessage(input, isRequired(input)); 
    }

    else if (maxLength(input, 20)){
      f = 1;
      showErrMessage(input, maxLength(input, 20));
    }

    else if (minLength(input, 8)){
      f = 1;
      showErrMessage(input, minLength(input, 8));
    }

    else if (isPassWord(input)){
      f = 1;
      showErrMessage(input, isPassWord(input));
    }

    else
       removeErr(input);
}

function confirmPassInput(input, input_truoc, flag)
{
  if (isRequired(input)){
     showErrMessage(input, isRequired(input)); 
     flag = 1;
  }
  var pass1 = input_truoc.value;
  if (pass1)
    if (!(input.value === pass1)){
         showErrMessage(input, "Mật khẩu nhập không chính xác");
         flag = 1;
    }
}

// Form đăng ký

function checkSignUp()
{
    var forms1 = document.forms['frm1'];  
    checkTyping(forms1)  ;
    //  ho va ten
    forms1.name1.onblur = function(){nameInput(forms1.name1)}
    // Tên đăng nhập
    forms1.un1.onblur = function(){userNameInput(forms1.un1)}
    // Email
    forms1.email1.onblur = function(){emailInput(forms1.email1)}
    // Mật khẩu
    forms1.pass1.onblur = function(){passwordInput(forms1.pass1)}
    // Nhập lại mật khẩu
    forms1['pass1-c'].onblur =function(){confirmPassInput(forms1["pass1-c"], forms1.pass1)};
}

function submitInput(flag)
{
  var forms1 = document.forms['frm1'];  
  nameInput(forms1.name1, flag);    
  userNameInput(forms1.un1, flag);
  emailInput(forms1.email1, flag);
  passwordInput(forms1.pass1, flag);
  confirmPassInput(forms1["pass1-c"], forms1.pass1, flag);
  
}
// Form đang nhập



function submitSignUp(){
    var btn = document.getElementById('btnSignup');//input
    btn.onclick = () => {
        var forms1 = document.forms['frm1'];  
        // Bước 1: Kiểm tra lại 1 lần các điều kiện
        var flag = 0
        submitInput(flag);
        if (flag === 1)
          return;
        // Bước 2: Kiểm tra điều kiện trùng khi lưu trữ localStorage --> email và tên đăng nhập phải khác nhau
        // Xóa sau khi xài xong nhe!!!!!!
        if (localStorage.getItem("customers")){
          var customerList = JSON.parse(localStorage.getItem("customers")); 
          var emailList = customerList.map(value => {return value.email});
          var usnameList = customerList.map(value => {return value.usname});
          if (emailList.includes(forms1.email1.value)){
            showErrMessage(btn, "Email đã tồn tại trong hệ thống");
            return;
          }
          else if (usnameList.includes(forms1.un1.value)){
            showErrMessage(btn, "Tên đăng nhập đã tồn tại trong hệ thống");
            return;
          }
          else {
          // Bước 3: Lưu dữ liệu vào local storage
          // Tạo ID cho khách hàng
          var idList = customerList.map(value => {return value.id_customer;});
          var max =idList.reduce((max, value) => {return max > value ? max : value});
          if (parseInt(max.substr(2)) + 1 < 10)
            max = "KH00" + (parseInt(max.substr(2)) + 1);
          else if (parseInt(max.substr(2)) + 1 < 100)
            max = "KH00" + (parseInt(max.substr(2)) + 1);
          customerList.push(
            new Customer(
              max,
              forms1.name1.value,
              forms1.un1.value,
              forms1.email1.value,
              forms1.pass1.value,
              [],
              1
              )
          )
          localStorage.setItem("customers", JSON.stringify(customerList));
          alert("Đăng ký thành công");
          
          var btn = document.getElementById("signupBtn");
          btn.addEventListener("click", function(){
            let flag = confirm("Bạn có muốn đăng xuất không?")
            if (flag)
            {
              var s = `
                <li class="header-user-item" id="signupBtn" title="Đăng xuất">Đăng ký</li>
                <li class="header-user-item" id="loginBtn">Đăng nhập</li>
              `;
              headerUserList.innerHTML = s;
            }
          })

          // Tạm thời ẩn form đăng ký
          closeModalForm();
        } 
      }
      else{
        // Tạo phần tử đầu tiên
        var customerList = [];
        customerList.push(
          new Customer(
            "KH001",
            forms1.name1.value,
            forms1.un1.value,
            forms1.email1.value,
            forms1.pass1.value,
            [],
            1
            )
        )
        localStorage.setItem("customers", JSON.stringify(customerList));
        alert("Đăng ký thành công");
          headerUserList.innerHTML = s;
          // Tạm thời ẩn form đăng ký
          closeModalForm();
      }
     }
}

// Form đăng nhập

function checkLogin(){
  var forms2 = document.forms['frm2'];  
    checkTyping(forms2);
    // Tên đăng nhập
    forms2.name2.onblur = function(){userNameInput(forms2.name2)}
    // Mật khẩu
    forms2.pass2.onblur = function(){passwordInput(forms2.pass2)}
}
function submitInputLogin(flag)
{
  var forms1 = document.forms['frm2'];  
  userNameInput(forms1.name2, flag);
  passwordInput(forms1.pass2, flag);
}

function submitLogin(){
  var btn = document.getElementById('btnLogin');
  var forms2 = document.forms['frm2']; 
  console.log(btn); 
  btn.onclick = ()=>{
    // Bước 1: Kiểm tra lại 1 lần các điều kiện
    var flag = 0
    submitInputLogin(flag);
    if (flag === 1)
      return;
    // Bước 2: Kiểm tra điều kiện trùng khi lưu trữ localStorage --> thành công
    var isAdmin = confirm("Bạn có phải là admin hay không?");
    var usname = forms2.name2.value;
    var pass = forms2.pass2.value;
    console.log(usname)
    console.log(pass)
    if (isAdmin)
    {
      var f = 0;
      var dsnv = localStorage.getItem("employees") ? JSON.parse( localStorage.getItem("employees")) : [];
      for (x of dsnv)
        if (x.ten_dang_nhap === usname && x.matkhau === pass)
        {
          alert("Đăng nhập tài khoản admin thành công");
          f = 1;
          window.location = "admin.html";
        }
      if (f == 0)
       alert("Tài khoản của bạn không tồn tại, vui lòng kiểm tra lại!");
        
    }else{
      var f = 0;
      var dskh = localStorage.getItem("customers") ? JSON.parse( localStorage.getItem("customers")) : [];
      for (x of dskh)
        if (x.usname === usname && x.password === pass)
        {
          alert("Đăng nhập tài khoản thành công")
          f = 1;
          document.querySelector(".header-user-list").innerHTML = `
          <li class="header-user-item" id="signupBtn" title="Đăng xuất" onclick="dangxuat()">${usname}</li>
          <li class="header-user-item" id="loginBtn" title="Hiển thị lịch sử mua hàng" onclick="showCart(this)"><i class="fa-solid fa-cart-shopping"></i></li>
          <div id="GioHang"></div>
          `
          closeModalForm();
        }
      if (f == 0)
        alert("Tên đăng nhập hoặc mật khẩu sai, vui lòng nhập lại");
    }
  }
}

function dangxuat(){
  let flag = confirm("Bạn có muốn đăng xuất không?")
  if (flag)
  {
    var s = `
      <li class="header-user-item" id="signupBtn">Đăng ký</li>
      <li class="header-user-item" id="loginBtn">Đăng nhập</li>
      <div id="GioHang"></div>
    `;
    document.querySelector(".header-user-list").innerHTML = s;
    signUp();
    login();
  }
}
/*
var btn = document.getElementById('btnLogin');
  var forms2 = document.forms['frm2']; 
  console.log(btn); 
  btn.onclick = ()=>{
    // Bước 1: Kiểm tra lại 1 lần các điều kiện
    var flag = 0
    submitInputLogin(flag);
    alert("huy" + flag)
    if (flag === 1)
      return;
    // Bước 2: Kiểm tra điều kiện trùng khi lưu trữ localStorage --> thành công
    if (localStorage.getItem("customers")){
      var customerList = JSON.parse(localStorage.getItem("customers")); 
      var passwordList = customerList.map(value => {return value.password});
      var usnameList = customerList.map(value => {return value.usname});
      var dsnv = JSON.parse(localStorage.getItem("employees"))
      var f = 0;
      for (let i = 0; i < n; i++){
        if (usnameList[i] === forms2.name2.value)
          if (passwordList[i] === forms2.pass2.value)
            f = 1;
      for (let i = 0; i < n; i++){
        if (dsnv[i].ten_dang_nhap === forms2.name2.value)
          if (dsnv[i].matkhau === forms2.pass2.value)
            f = 1;
      alert("Biến lính canh " + f);
      var n = passwordList.length;
      if (f == 1)
            {
              var isAdmin = confirm("Bạn có muôn đăng nhập với tư cách quản trị viên không?");
              if (!isAdmin)
              {
                var headerUserList = document.querySelector(".header-user-list");
                var s = `
                    <li class="header-user-item" id="signupBtn">${forms2.name2.value}</li>
                    <li class="header-user-item" id="loginBtn" onclick="showCart(this)"><i class="fa-solid fa-cart-shopping"></i></li>
                `;
                headerUserList.innerHTML = s;
                // Tạm thời ẩn form đăng nhập
                closeModalForm();
                f = 1;
                var btn = document.getElementById("signupBtn");
                btn.addEventListener("click", function(){
                  let flag = confirm("Bạn có muốn đăng xuất không?")
                  if (flag)
                  {
                    var s = `
                      <li class="header-user-item" id="signupBtn" title="Đăng xuất">Đăng ký</li>
                      <li class="header-user-item" id="loginBtn">Đăng nhập</li>
                    `;
                    headerUserList.innerHTML = s;
                    signUp();
                    login();
                  }});
                break;
              }
              else{
                var dsnvLS = localStorage.getItem("employees")
                if (!dsnvLS)
                {
                  alert("Dsnv bị lỗi")
                  return;
                }
                else{
                  var dsnv = JSON.parse(dsnvLS);
                  for (let x of dsnv)
                  {
                    if (x.ten_dang_nhap === forms2.name2.value && x.matkhau === forms2.pass2.value)
                    {
                      alert("Đăng nhập admin thành công!");
                      window.location="admin.html";
                    }

                  }
                }
              }
       }
      }
      if (f == 0)
        alert("Tên đăng nhập/mật khẩu không hợp lệ!")
    }
  }
}
*/