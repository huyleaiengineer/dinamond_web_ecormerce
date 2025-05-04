// Main của chương trình
// 1.Đăng ký
signUp();
// 2. Slideshow
slideShow();
// 3.login()
login();
// Show Content in Body
showContentInBody();
//4. hàm tìm kiếm
timKiem();
//5. tìm kiếm nâng cao
advancedSearch();



var contenAppBodyDefault = document.getElementById("app-body1").innerHTML;

/************************** I. ĐĂNG KÝ - ĐĂNG NHẬP **************************************/
// Đóng form
function closeModalForm()
{
    document.getElementById("modalForm").style.display = "none";
}

var closeFormBtns = document.querySelectorAll(".closeBtn");
for (var x of closeFormBtns)
{
    x.onclick = function()
    {
        closeModalForm();
    }
}
// Hàm đăng ký
function signUp(){
    var signUpBtn = document.getElementById("signupBtn");
    signUpBtn.onclick = function(){
        var registationForm = document.getElementById("modalForm");
        registationForm.style.display = "block";
         window.scrollTo({
            top: 0,
            behavior: `smooth`
        })
        checkSignUp();
        submitSignUp();
    }
}

// Hàm đăng nhập
function login(){
    var loginBtn = document.getElementById("loginBtn");
    loginBtn.onclick = function(){
        var registationForm = document.getElementById("modalForm");
        registationForm.style.display = "block";
        window.scrollTo({
            top: 0,
            behavior: `smooth`
        })
        checkLogin();
        submitLogin();
    }
}
 
 

/******************** LẤY RA DANH SÁCH */
// 1. DS khách hàng
function getCustomerList()
{
    return JSON.parse(localStorage.getItem("customers"));
}




/*********************** III. Các hàm liên quan đến sản phẩm ************************** */
// Hàm hiển thị slide show
function slideShow(){
    let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (slides.length === 0)
    return;
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
}

/*********************** III. Các hàm liên quan đến sản phẩm ************************** */
// Hàm tính khuyến mãi
function tinhKM(x, y)
{
    var km = 100;
    if (y != '0')
        km = parseInt(y.substr(1, y.length-1));
    return x*km/100;
}

// Hàm chuyển hiển thị giá tiền
function hienThiGiaTien(x){
    var x1 = x.toString();
    var res = "";
    var len = x1.length;
    var i = 3;
    while (x/1000 > 0 && x > 999)
    {
        x = x/1000;
        res += x1.substr(0, len-i) + "." +x1.substr(len-i);
    }
    return res;
}
// III.1 1: Hàm hiển thị card sản phẩm
function showProductCard(product)
{
    return `
    <div class="gallery-content">
        <p style="display:none">${product.id}</p>
        <img src=${(product.hinh_anh)} alt="">
        <h3>${product.name}</h3>
        <div class="price">
            <h5 class="old-price">${hienThiGiaTien(product.gia_ban)}. 000 VNĐ</h5>
            <h5 class="new-price">${hienThiGiaTien(tinhKM(product.gia_ban, product.khuyen_mai))}.000 VNĐ</h5>
        </div>
        
        <button class="buyBtn" onclick="MuaSanPham(this)">Mua Ngay</button>
    </div>
    `
}

// III.2. Hiển thị Product trên các trang sản phẩm
function showPage(heading, typeProducts, x)
{
    var s = "";
    s += '<div class="app-main">';
    s += `<h2 class="row-heading">${heading}</h2>`
    var listProduct = JSON.parse(localStorage.getItem("products"));
    var mangSP = [];
    for (var i of listProduct)
        if(i.loai === typeProducts) 
            mangSP.push(i);
    s += `<div class="gallery">`;
    // 4 biến phục vụ phân trang, mỗi trang có 4 sản phẩm
    var currentPage = x+1;
    // var perProducts = [];
    var perpage = 4;
    var totalPage = Math.ceil(mangSP.length/4);
    var perProducts = mangSP.slice((currentPage-1)*perpage, currentPage*perpage);
    for (var i = 0; i < perProducts.length; i++)
        s += showProductCard(perProducts[i]);
    s += "</div>";
    s += "</div>";
    // Hiển thị bảng phân trang
    s += `<div class="product-page">`;
    for (var i = 0; i < totalPage; i++)
        s += `<div class="page-cell" onclick='showPage("${heading}", ${typeProducts}, ${i})'>${i+1}</div>`;
    s += "</div>";
    document.getElementById("app-body1").innerHTML = s;
    return s;
}

// III.3. Show Nội dung của web
function showContentInBody(){
    var contentWeb = document.getElementById("app-body1");
    var home = document.getElementById("home");
    var jewel = document.getElementById("jewel");
    var jewelMary = document.getElementById("jewelMary");
    var watch = document.getElementById("watch");
    var dinamod = document.getElementById("dinamod");
    // Khi bấm vào nút jewel
    home.addEventListener('click', function(){
        contentWeb.innerHTML = contenAppBodyDefault;
    })
    // Hiển thị nội dung jewel
    jewel.addEventListener('click', function(){
        showPage( "DANH SÁCH TRANG SỨC", 1, 1);
    })
    jewelMary.addEventListener('click', function(){
        showPage( "DANH SÁCH CÁC SẢN PHẨM TRANG SỨC CƯỚI", 2, 1);
    })
    watch.addEventListener('click', function(){
        showPage( "DANH SÁCH ĐỒNG HỒ", 3, 1);

    })
    dinamod.addEventListener('click', function(){
        showPage( "DANH SÁCH KIM CƯƠNG", 4, 1);
    })
}

// III.4. Chức năng mua hàng

function MuaSanPham(btn)
{
    var customerList = JSON.parse(localStorage.getItem("customers")); 
    var productList = JSON.parse(localStorage.getItem("products")); 
    var modal = document.getElementById("modal");
    // 1. Kiểm tra đăng nhập chưa? --> chưa thì yêu cầu đăng nhập, rồi thì qua bước 2
    var usname = document.getElementById("signupBtn").innerHTML;
    if (usname.toLowerCase() === "Đăng ký".toLowerCase()){
        alert("Vui lòng đăng nhập trước khi thực hiện việc mua hàng!");
        return;
    }

    // 2. Hiển thị modal
    modal.style.display = "flex";
    window.scrollTo({
        top: 0,
        behavior: `smooth`
    })
   
    // 3. Đổ dữ liệu vào modal
    // 3.1. Lấy ra phần tử cha của nó
    var gallery = btn.parentElement;
    // 3.2. Lấy ra id của sản phẩm
    var id = gallery.querySelector("p").innerHTML;
    // 3.3. Lấy ra sản phẩm theo ID
    var dssp = JSON.parse(localStorage.getItem("products"))
    var product;
    var index  = 0;
    for (let x of dssp){
        if (x.id === id){
            product = x;
            break;
        }
        index++;
    }
    // 3.4. Đổ dữ liệu lên thẻ chi tiết
    if (product){
        var chitietHTML = `
        <div class="chitietsp">
        <div class="chitietsp-heading">
            <h3>CHI TIẾT SẢN PHẨM</h3>
            <span id="dongCTSP"><i class="fas fa-times"></i></span>
        </div>
        <div class="chitietsp-body">
            <div class="chitietsp-img">
                <img src="${product.hinh_anh}" alt="Hình ảnh sản phẩm">
            </div>
            <div class="chitietsp-thongtin">
                <div class="tensp">Tên sản phẩm <h3>${product.name}</h3></div>
                <div class="gia">Giá (đã áp dụng khuyến mãi) <h3>${hienThiGiaTien(product.gia_ban)}.000 VNĐ</h3></div>
                <div class="soluong">
                    <label for="soluong">Số lượng</label>
                    <input type="number" name="soluong" id="soluong" value=1 min=1>
                </div>
                <div class="thanhtien">Thành tiền <h3>${hienThiGiaTien(tinhTien(product.gia_ban, 1))}.000 VNĐ</h3></div>
                <button class="dathang" id="dathang">ĐẶT HÀNG</button>
            </div>
        </div>
    </div>
        `
        modal.innerHTML = chitietHTML;
        modal.style.display = "flex";
    }
    // 3.5. Thực hiện tính tiền 
    var sl = document.getElementById("soluong");
    // Kiểm tra số lượng có hợp lệ hay ko? sl <= số hàng hiện có!
    if (sl > product.soluong)
    {
        alert("Chúng tôi không còn đủ hàng, xin bạn nhập lại số lượng")
        return;
    }
    if (sl <= 0)
    {
        alert("Số lượng sản phẩm không hợp lệ");
        return;
    }
        sl.onchange = function(){
        document.querySelector(".thanhtien h3").innerHTML = hienThiGiaTien(tinhTien(product.gia_ban, sl.value)) + ".000 VNĐ";
    }
    
    // 3. Bấm nút đặt hàng
    var dathangBtn = document.getElementById("dathang")
    dathangBtn.onclick = function(){
        var isConfirm = confirm("Bạn có muốn đặt hàng hay không?")
        if (!isConfirm)
            return;
        // 1. Tạo hóa đơn mới --> lưu vào localStorage
        var listBill = [];
        if(localStorage.getItem("bills"))
            listBill = JSON.parse(localStorage.getItem("bills"));
        if(listBill.length === 0)
        {
            var a = [];
            var masp = product.id;
            var makh = getMaKh(usname);
            alert("Mã khách hàng" + makh)
            var soluong = sl.value;
            var tongtien = tinhTien(product.gia_ban, sl.value);
            a.push(new Bill(1, masp, makh, new Date(), "", soluong, tongtien, 0));
            localStorage.setItem("bills", JSON.stringify(a));
        }else{
            var mahd = listBill[listBill.length-1].id_hd +1;
            var masp = product.id;
            var makh = getMaKh(usname);
            var soluong = sl.value;
            var tongtien = tinhTien(product.gia_ban, sl.value);
            listBill.push(new Bill(mahd, masp, makh, new Date(), "", soluong, tongtien, 0));
            localStorage.setItem("bills", JSON.stringify(listBill   ));
        }
        // 2. Thêm vào list_id_hoadon customer
        // Tìm index của danh sách khách hàng
        var indexKH = 0;
        var customer;
        for (let x of customerList){
            if (x.usname === usname){
                customer = x;
                break;
            }
            indexKH++;
        }
        var dshd = JSON.parse(localStorage.getItem("bills"))
        //Thêm vào list_id_hoadon customer
        if (!customer){
            alert("Quý khách vui lòng đăng nhập lại để mua hàng");
            return;
        }
        customer.id_bill.push(dshd[dshd.length-1].id_hd);
        customerList[indexKH] = customer;
        localStorage.setItem("customers", JSON.stringify(customerList));
        // 3. Thêm vào list_id_hoadon product
        product.id_bill.push(dshd[dshd.length-1].id_hd);
        productList[index] = product;
        localStorage.setItem("products", JSON.stringify(productList));
        // 4. Hiển thị thông báo bạn đã đặt hàng thành công
        alert("Bạn đã đặt hàng thành công");

    }
    // 4. Đóng modal
     var closeModal = document.getElementById("dongCTSP");
     if (closeModal)
         closeModal.addEventListener('click', function(){
             modal.style.display = "none";
    })
}

function getMaKh(usname)
{
    console.log("User name truyền vào", usname)
    var a = JSON.parse(localStorage.getItem("customers"));
    for (x of a)
        if (x.usname === usname)
            return x.id_customer;
    return "";
}

function tinhTien(a, b)
{
    return a*b
}

// III. 5. Hiển thị Giỏ hàng!
// showCart();
function showCart(btn, x){
    var s = "";
    var billListLS = localStorage.getItem("bills");
    var cusListLS = localStorage.getItem("customers");
    var proListLS = localStorage.getItem("products");
    
    if (!billListLS || !cusListLS || !proListLS ){
        alert("Xin lỗi, dữ liệu bị lỗi!")
        return;
    }
    var billList = JSON.parse(billListLS);
    var cusList = JSON.parse(cusListLS);
    var proList = JSON.parse(proListLS);
    var headerUserList = document.querySelector(".header-user-list");
    var username = document.getElementById("signupBtn").innerHTML;

    // Tim ra khach hang
    var customer;
    var indexCustomer = 0;

   for (var x of cusList)
   {
        if (x.usname === username)
        {
            customer = x;
        }
        indexCustomer++;
   }

  
var s = "";
var giohang = document.getElementById("GioHang");
console.log(giohang)
   if (customer.id_bill.length === 0)
   {
         s += ` 
         <div class="GioHangHeading">
            <h2>LỊCH SỬ MUA HÀNG</h2> 
            <span id="dongGioHang" onclick="dongGioHang()"> <i class="fas fa-times"></i> </span>
         </div>
    <div>
        <div class="rowGioHang">
            <p>Bạn chưa mua sản phẩm, hãy dạo xem thử nhé!</p>
        </div>
        <div class="rowGioHang">
            <img src = "./asset/img/emptyCart.png"> </img>
        </div>
     `
   }
   else{
    s += `
    <div class="GioHangHeading"><h2>LỊCH SỬ MUA HÀNG</h2> <span id="dongGioHang" onclick="dongGioHang()"> <i class="fas fa-times"></i> </span></div>
    <div>`
    for (var i = 0; i < customer.id_bill.length; i++)
        s += dienRowCart( customer.id_bill[i]);
    s += `</div> `      
   }
    giohang.innerHTML = s;
    giohang.style.display = "block"  
}

function dongGioHang(){
    var giohang = document.getElementById("GioHang");
    console.log(giohang)
    giohang.style.display = "none";
}

// k mã số hóa đơn (id_bill)
function dienRowCart(k)
{
    // alert("Hàm điền hàng gọi rồi")
    //  Bước 1: tìm ra hóa đơn
    var bill;
    var billListLS = localStorage.getItem("bills");
    var billList = []
    if (billListLS)
        billList = JSON.parse(billListLS);
    else
        return;
    for (x of billList)
        if (x.id_hd === k)
            bill = x;
    if (!bill)
    {
        alert("Không tìm thấy BILL")
        return;
    }
    // Bước 2: Tìm 1 sản phẩm theo id bill
    var sp;
    var spLS = localStorage.getItem("products");
    var spL = []
    if (spLS)
        spL = JSON.parse(spLS);
    else
        return;
    for (let x of spL)
        if (x.id === bill.id_sp)
            sp = x;
    console.log(spL)
    if (!sp)
    {
        alert("Không tìm thấy Sản phẩm")
        return;
    }
    console.log("huyyyyyyyyyyyyyyysp", sp)
    console.log("huyyyyyyyyyyyyyyyyybill",bill)
    return `<div class="rowGioHang">
        <p>${sp.name}</p>
        <p>${bill.tong_tien}</p>
        <p>${ktr(bill.trang_thai)}</p>
    </div>`
}
function ktr(x)
{
    if (x == 0)
        return "Chưa được xác nhận";
    else 
        return  "Đã mua";
}

// III.6. Chức năng tìm kiếm
function timKiem()
{
    var reasultSearch = document.getElementById("reasultSearch");
    var searchBtn = document.getElementById("searchBtn");
    searchBtn.onclick = function(){
        if (!reasultSearch.value)
            alert("Bạn chưa nhập thông tin để tìm kiếm")
        else
           showSearchResultPage(reasultSearch.value, 1)
    }
    
}

function showSearchResultPage(tukhoa, x)
{
    tukhoa = tukhoa.toLowerCase();
    var s = "";
    s += '<div class="app-main">';
    s += `<h2 class="row-heading">KẾT QUẢ TÌM KIẾM VỚI TỪ KHÓA "${tukhoa}"</h2>`
    var listProduct = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    var mangSP = [];
    for (var i of listProduct)
        if(i.name.toLowerCase().includes(tukhoa)) 
            mangSP.push(i);
    s += `<div class="gallery">`;
    // 4 biến phục vụ phân trang, mỗi trang có 4 sản phẩm
    var currentPage = x+1;
    // var perProducts = [];
    var perpage = 4;
    var totalPage = Math.ceil(mangSP.length/4);
    var perProducts = mangSP.slice((currentPage-1)*perpage, currentPage*perpage);
    for (var i = 0; i < perProducts.length; i++)
        s += showProductCard(perProducts[i]);
    s += "</div>";
    s += "</div>";
    // Hiển thị bảng phân trang
    s += `<div class="product-page">`;
    for (var i = 0; i < totalPage; i++)
        s += `<div class="page-cell" onclick='showSearchResultPage("${tukhoa}", ${i})'>${i+1}</div>`;
    s += "</div>";
    document.getElementById("app-body1").innerHTML = s;
    return s;
}

// III.7. Tìm kiếm nâng cao
function advancedSearch()
{
    var fillterBtn = document.getElementById("fillterBtn");
    fillterBtn.onclick = function()
    {
        document.getElementById("app-body1").innerHTML = `<div class="fillter-container">
        <h2>TÌM KIẾM THEO TỪ KHÓA CHO TRƯỚC</h2>
            <div class="dsLuaChonCuaBan">
                <h4>
                  Sự lựa chọn của bạn (Mỗi mục chỉ chọn 1 thẻ)
                  <span class="removeIcon" title="Nhấn vào đây để làm mới danh sách" 
                  onclick="remove(this)"><i class="fas fa-times"></i></span>
                </h4>
                <span class="" onclick="remove(this)">
                <ul id="dsLuaChonCuaBan">
                    
                </ul>
            <button id="filterSearchBtn">TÌM KIẾM</button>
            </div>
            <div class="fillter-container-row">
                <h3 class="labelFillter">Loại sản phẩm</h3>
                <div class="detailFillter">
                    <div class="boxFilter" onclick="add(this)">Nhẫn</div>
                    <div class="boxFilter" onclick="add(this)">Bông tai</div>
                    <div class="boxFilter" onclick="add(this)">Lắc</div>
                    <div class="boxFilter" onclick="add(this)">Vòng</div>
                    <div class="boxFilter" onclick="add(this)">Dây chuyền</div>
                    <div class="boxFilter" onclick="add(this)">Kiềng</div>
                    <div class="boxFilter" onclick="add(this)">Đồng hồ</div>
                    <div class="boxFilter" onclick="add(this)">Kim cương viên</div>
                </div>
            </div>
            <div class="fillter-container-row">
                <h3 class="labelFillter">THƯƠNG HIỆU</h3>
                <div class="detailFillter">
                    <div class="boxFilter" onclick="add(this)">Emily Carter</div>
                    <div class="boxFilter" onclick="add(this)">Rochet</div>
                    <div class="boxFilter" onclick="add(this)">Tissot</div>
                    <div class="boxFilter" onclick="add(this)">Citizen</div>
                    <div class="boxFilter" onclick="add(this)">Dissey</div>
                    <div class="boxFilter" onclick="add(this)">Style</div>
                </div>
            </div>
            <div class="fillter-container-row">
                <h3 class="labelFillter">GIÁ</h3>
                <div class="detailFillter">
                    <div class="boxFilter" onclick="add(this)">Dưới 1 triệu</div>
                    <div class="boxFilter" onclick="add(this)">Từ 1 triệu -> 5 triệu</div>
                    <div class="boxFilter" onclick="add(this)">Từ 5 triệu -> 10 triệu</div>
                    <div class="boxFilter" onclick="add(this)">Từ 10 triệu -> 15 triệu</div>
                    <div class="boxFilter" onclick="add(this)">Từ 15 triệu -> 50 triệu</div>
                    <div class="boxFilter" onclick="add(this)">Từ 50 triệu -> 100 triệu</div>
                    <div class="boxFilter" onclick="add(this)">Trên 100 triệu</div>
                </div>
            </div>
            <div class="fillter-container-row">
                <h3 class="labelFillter">CHẤT LIỆU</h3>
                <div class="detailFillter">
                    <div class="boxFilter" onclick="add(this)">Vàng</div>
                    <div class="boxFilter" onclick="add(this)">Bạc</div>
                    <div class="boxFilter" onclick="add(this)">Kim cương</div>
                    <div class="boxFilter" onclick="add(this)">Ngọc trai</div>
                    <div class="boxFilter" onclick="add(this)">Đồng</div>
                    <div class="boxFilter" onclick="add(this)">Da</div>
                </div> 
            </div>
            <div class="fillter-container-row">
                <h3 class="labelFillter">GIỚI TÍNH</h3>
                <div class="detailFillter">
                    <div class="boxFilter" onclick="add(this)">Nam</div>
                    <div class="boxFilter" onclick="add(this)">Nữ</div>
                    <div class="boxFilter" onclick="add(this)">Unisex</div>
                </div> 
            </div>
        </div>`
        var btn = document.getElementById("filterSearchBtn");
        console.log(btn)
        btn.onclick = function()
        {
            var ds = document.querySelectorAll("#dsLuaChonCuaBan li");
            var dstk = [];
            for (var x of ds)
                dstk.push(x.innerText);
            showAdvancedSearchResultPage(dstk, 1)
        }
    }
}

function showAdvancedSearchResultPage(dstk, x)
{
    // Tìm kiếm theo nhiều điền kiện
    for (var i = 0; i <dstk.length; i++)
        dstk[i] = dstk[i].toLowerCase();
    console.log(dstk)
    
    // Lọc ra thẻ giá (Đúng nguyên tắc chỉ chọn 1)
    var thegia = []
    var indexthegia = -1;
    for (var i = 0; i <dstk.length; i++)
        if (dstk[i].startsWith('dưới') || dstk[i].startsWith('từ') || dstk[i].startsWith('trên'))
        {
            thegia.push(dstk[i]);
            indexthegia = i;
        }
    
    if (thegia.length > 1)
    {
        alert("Không tìm thấy sản phẩm như yêu cầu")
    }
    var tien = [];
    if (thegia.length === 1)
    {
        // Xử lý thẻ giá
        var a = thegia[0].split(" ");
        if (a[0] === 'dưới')
            tien = [parseInt(a[1] + "000")]
        else if (a[0] === 'trên')
            tien = [parseInt(a[1] + "000")]
        else{
            tien = [parseInt(a[1] + "000"), parseInt(a[4] + "000")]
        }
    }

   // xóa giá tiền
   if (indexthegia != -1)
            dstk.splice(indexthegia)

    var s = "";
    s += '<div class="app-main">';
    s += `<h2 class="row-heading">KẾT QUẢ TÌM KIẾM"</h2>`
    // Bắt đầu tìm kiếm sản phẩm
    var listProduct = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    var mangSP = [];
    console.log(dstk)
    for (var i of listProduct)
    {
        console.log(i.name)
        var f = 1;
        for (var j of dstk)
        {
            console.log(i.name.toLowerCase().includes(j))
            if (!(i.name.toLowerCase().includes(j))){
                f = 0;
                break;
            }
        }
        if (f === 1)
        {
            if (tien.length === 0)
                mangSP.push(i)
            if (tien.length === 1)
                if ((tien[0] === 1000 && i.gia_ban < 1000) || (tien[0] === 100000 && i.gia_ban > 100000))
                    mangSP.push(i)
            if (tien.length === 2)
                if ((i.gia_ban >= tien[0] && i.gia_ban < tien[1] ))
                        mangSP.push(i)
            
        }
    }

    s += `<div class="gallery">`;
    // 4 biến phục vụ phân trang, mỗi trang có 4 sản phẩm
    var currentPage = x+1;
    // var perProducts = [];
    var perpage = 4;
    var totalPage = Math.ceil(mangSP.length/4);
    var perProducts = mangSP.slice((currentPage-1)*perpage, currentPage*perpage);
    for (var i = 0; i < perProducts.length; i++)
        s += showProductCard(perProducts[i]);
    s += "</div>";
    s += "</div>";
    // Hiển thị bảng phân trang
    s += `<div class="product-page">`;
    for (var i = 0; i < totalPage; i++)
        s += `<div class="page-cell" onclick='showSearchResultPage("${dstk}", ${i})'>${i+1}</div>`;
    s += "</div>";
    document.getElementById("app-body1").innerHTML = s;
    return s;
    
}


function add(box)
{
    var dsLuaChonCuaBan = document.getElementById("dsLuaChonCuaBan");
    var s = `<li>
                <span>${box.innerHTML}</span>
        </li>`
    dsLuaChonCuaBan.innerHTML += s;
}

function remove(a)
{
    if (document.getElementById("dsLuaChonCuaBan"))
        document.getElementById("dsLuaChonCuaBan").innerHTML = ""
}