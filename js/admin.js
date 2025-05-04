
// Hiển thị nội dung Main form
showInterface();
// Hàm hiển thị danh sách khách hàng
showCustomerList();
// Hàm hiển thị danh sách sản phẩm
showProductList();
// Hàm hiển thị danh sách nhân viên 
showEmployeeList();
// Hiển thị danh sách hóa đơn
showBillList();
// Nhập hàng
showNhapHang();
// Đăng xuất admin
function dangxuatAdmin(btn)
{
    var x = confirm("Bạn có muốn đăng xuất khỏi tài khoản admin không?")
    if (x)
        window.location = "index.html";
}

/***************************** DANH SÁCH CÁC HÀM *******************************************/
// Hàm dùng chung 

// Chung 1: Hàm upload hình ảnh từ 1 file và hiển thị chúng trên thẻ img
function uploadImg(input, imgContainer) {
    input.onchange = function(){
        var img = "";
        const reader = new FileReader()
        reader.onload = function() {
            img = reader.result;
            imgContainer.src = img; 
        }
        reader.readAsDataURL(this.files[0]);
    }
}

// Chung 2: Chuyển đổi input value thành file đường dẫn chính
function transformInputImgValue(inputImg)
{
    var s = inputImg.value; // Mặc định giá trị file input là c:\fakepath\
    if (s){
        s = s.substring(12);
        s = "./asset/img/"+s;
    }
    return s;
}

// Chung 3 hienThiGiaTien
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

// SIDEBAR TOGGLE
var sidebarOpen = false;
var sidebar = document.getElementById("admin-sidebar");

function openSidebar() {
if(!sidebarOpen) {
    sidebar.classList.add("admin-sidebar-responsive");
    sidebarOpen = true;
    var closeBtn = document.querySelector("#admin-sidebar .sidebar-title>span");
    closeBtn.style.lineHeight = '20px';
    closeBtn.style.display = "inline-block";
}
}

function closeSidebar() {
    if(sidebarOpen) {
        sidebar.classList.remove("admin-sidebar-responsive");
        sidebarOpen = false;
    }
}

function showChart(){
    // Dữ liệu vô bar chart --> top 5 sản phẩm
    var sp = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    var sortSp = sp.sort((c, d) => {return d.loi_nhuan-c.loi_nhuan})
    var top5sp = [];
    var top5Series = []
    for (var i = 0; i < 5 && i < sortSp.length; i++)
    {
        top5sp.push(sortSp[i].id);
        top5Series.push(sortSp[i].loi_nhuan);

    }
    // BAR CHART
    var barChartOptions = {
    series: [{
        data: top5Series
    }],
    chart: {
        type: 'bar',
        height: 350,
        toolbar: {
        show: false
        },
    },
    colors: [
        "#246dec",
        "#cc3c43",
        "#367952",
        "#f5b74f",
        "#4f35a1"
    ],
    plotOptions: {
        bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: top5sp,
    },
    yaxis: {
        title: {
        text: "Count"
        }
    }
    };

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();

    // Dữ liệu vô bar chart --> top 5 khách hàng
    var kh = localStorage.getItem("customers") ? JSON.parse(localStorage.getItem("customers")) : [];
    var sortKH = kh.sort((c, d) => {return d.id_bill.length-c.id_bill.length})
    var top5kh = [];
    top5Series = []
    for (var i = 0; i < 5 && i < sortKH.length; i++)
    {
        top5kh.push(sortKH[i].name);
        top5Series.push(sortSp[i].id_bill.length);
    }
    // BAR CHART
    var barChartOptions = {
    series: [{
        data: top5Series
    }],
    chart: {
        type: 'bar',
        height: 350,
        toolbar: {
        show: false
        },
    },
    colors: [
        "#246dec",
        "#cc3c43",
        "#367952",
        "#f5b74f",
        "#4f35a1"
    ],
    plotOptions: {
        bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: top5kh,
    },
    yaxis: {
        title: {
        text: "Count"
        }
    }
    };

    var barChart = new ApexCharts(document.querySelector("#area-chart"), barChartOptions);
    barChart.render();
}

function showDashBoard()
{
    document.getElementById("dashboard").style.display = "block";
    var cards = document.querySelectorAll("#dashboard .admin-main-cards .card span.text-primary");
    var sp = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    var hd = localStorage.getItem("bills") ? JSON.parse(localStorage.getItem("bills")) : [];
    // Tính doanh thu --> Tổng tiền của bill
    var doanhthu = 0;
    for (var hoadon of hd)
    {
        doanhthu += hoadon.tong_tien;
    }
    // Tính lợi nhuận ròng
    var loinhuan = 0;
    for (var sanpham of sp)
    {
        loinhuan += sanpham.loi_nhuan;
    }

    // Thực vốn
    var thucvon = 0;
    for (var sanpham of sp)
    {
        thucvon += sanpham.soluong * sanpham.gia_nhap;
    }
    thucvon += doanhthu - loinhuan;

    cards[0].innerHTML = sp.length;
    cards[1].innerHTML = doanhthu;
    cards[2].innerHTML = loinhuan;
    cards[3].innerHTML = thucvon;
    showChart();
}
function showInterface()
{
    // Mảng lưu các ids để hiện thị
    // 0 -> 5: dashboard, customer, products, nhập hàng, nhavien
    var ids = [];
    ids.push(document.getElementById("dashboard"));
    ids.push(document.getElementById("admin-customer"));
    ids.push(document.getElementById("admin-product"));
    ids.push(document.getElementById("nhap-hang"))
    ids.push(document.getElementById("admin-employee"))
    ids.push(document.getElementById("admin-bill"))

    // Hiển thị mặc định
    for (var id of ids)
        id.style.display = "none";
    showDashBoard();


    // Các sự kiện onclick
    document.getElementById("dashboardBtn").addEventListener('click',function(){
        for (var id of ids)
            id.style.display = "none";
        showDashBoard();
    });

    document.getElementById("customerBtn").addEventListener('click', function(){
        for (var id of ids)
            id.style.display = "none";
        ids[1].style.display = "block";
    });
    
    document.getElementById("productBtn").addEventListener('click', () =>{
        for (var id of ids)
            id.style.display = "none";
        ids[2].style.display = "block";
    })

    document.getElementById("nhapHangBtn").addEventListener('click', () =>{
        for (var id of ids)
            id.style.display = "none";
        ids[3].style.display = "block";
    })


    document.getElementById("employeeBtn").addEventListener('click', () =>{
        for (var id of ids)
            id.style.display = "none";
        ids[4].style.display = "block";
    })
    
    document.getElementById("billBtn").addEventListener('click', () =>{
        for (var id of ids)
            id.style.display = "none";
        ids[5].style.display = "block";
    })
}

function showCustomerList()
{
    var area = document.getElementById("customer-table");
    area.innerHTML = renderCustomerList();
    // area.onload = renderCustomerList();
}


function showProductList()
{
    var area = document.getElementById("product-table");
    var suaBtn = document.getElementById("suaSanPham");
    var xoaBtn = document.getElementById("xoaSanPham");
    area.innerHTML = renderProductList();
    var selectedRow;
    // Bảng các sản phẩm
    var productRows = document.querySelectorAll("#product-table .admin-table-row");
    for (row of productRows)
    {
        row.onclick = function(){
            for (r of productRows){
                r.style.cursor = "pointer";
                r.style.backgroundImage = "none";
            }
            this.style.backgroundImage = "linear-gradient(45deg, #8000ff, #ff00c4)";
            selectedRow = this; 
        }
    }
    
    suaBtn.onclick = function()
    {
        if (selectedRow === undefined)
            alert("Bạn chưa chọn sản phẩm để sửa!");
        else{
            id_product = selectedRow.querySelector("td").innerHTML;
            suaThongTinSanPham(id_product);
        }
    }

    xoaBtn.onclick = function()
    {
        if (selectedRow === undefined)
            alert("Bạn chưa chọn sản phẩm để xóa!");
        else{
            var x = confirm("Bạn có chắc chắc muốn xóa sản phẩm này khỏi danh sách sản phẩm")
            if (x){
                var dssp = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
                var id_product = selectedRow.querySelector("td").innerHTML;
                // 1. Tìm sản phẩm
                var index;
                for (var x = 0; x < dssp.length; x++)
                {
                    if (dssp[x].id === id_product)
                    {
                        index = x;
                        break;
                    }
                }
                console.log(index)
                if (index != undefined){
                    dssp.splice(index, 1)
                    localStorage.setItem("products", JSON.stringify(dssp))
                    alert("Xóa sản phẩm thành công!")
                    location.reload();
                }
                else{
                    alert("Không tìm thấy sản phẩm!")
                }
            }
        }
    }


}

function showEmployeeList()
{
    var area = document.getElementById("employee-table");
    area.innerHTML = renderDSNV();
}

function showBillList()
{
    var area = document.getElementById("bill-table");
    area.innerHTML = renderBillList();
    // Hiển thị những sản phẩm chưa xác nhận
    var rows = area.querySelectorAll(".admin-table-row");
    for (var row of rows)
    {
        row.style.cursor = "pointer";
        var id = row.querySelectorAll('td')[0].innerHTML;
        var value = row.querySelectorAll('td')[5].innerHTML.toLowerCase()
        if(value === "chưa xác nhận!"){
            row.style.backgroundImage = "linear-gradient(45deg, #8000ff, #ff00c4)";
        }
    }
    // chọn row để xem chi tiết
    var selectedRow;
    for (var r of rows)
    {
        r.onclick = function() {
            for (var r1 of rows){
                r1.style.backgroundImage = "none";
                r1.style.cursor = "pointer";
            }
            this.style.backgroundImage = "linear-gradient(45deg, #8000ff, #ff00c4)"
            selectedRow = this;
        }
    }
    
    var showDetailBtn = document.getElementById("showDetails");
    showDetailBtn.onclick = function(){
        if(selectedRow === undefined)
            alert("Bạn chưa chọn hàng")
        else   
            showDetail(selectedRow) 
    }

    var locSanPhamBtn = document.getElementById("locSanPham")
    locSanPhamBtn.onclick = function(){
        var ngaybdInput = document.getElementById("ngayBd")
        var ngayktInput = document.getElementById("ngayKt")
        if (!ngaybdInput.value || !ngayktInput.value)
            alert("Vui lòng nhập ngày cần điền vào!")
        else{
            if (hienThiNgay(ngaybdInput, ngayktInput))
                area.innerHTML = hienThiNgay(ngaybdInput, ngayktInput)
        }
    }

}

function showDetail(selectedRow) 
{
    var id = selectedRow.querySelector('td').innerHTML;
    console.log(id);

    var dshd = localStorage.getItem("bills") ? JSON.parse(localStorage.getItem("bills")) : [];
    console.log(dshd)
    var hd;
    for (var x of dshd)
        if (x.id_hd === parseInt(id))
        {
            hd = x;
            break;
        }

    var modal = document.getElementById("admin-modal");
    var s = `<div class="chitiethoadon">
    <div class="heading">
      <h2>CHI TIẾT HÓA ĐƠN</h2>
      <span class="material-icons-outlined" onclick="closeCTHD(this)">close</span>
    </div>
  <!-- id_hd, id_sp, id_kh, ngay_mua, ngay_xac_nhan, so_luong, tong_tien, trang_thai -->
    
   <div class="rowct">
    <div class="colct">Mã hóa đơn</div>
    <div class="colct">${hd.id_hd}</div>
   </div>

   <div class="rowct">
    <div class="colct">ID sản phẩm</div>
    <div class="colct">${hd.id_sp}</div>
   </div>

   <div class="rowct">
    <div class="colct">Mã khách hàng</div>
    <div class="colct">${hd.id_kh}</div>
   </div>

   <div class="rowct">
    <div class="colct">Ngày mua</div>
    <div class="colct">${showNgay(hd.ngay_mua)}</div>
   </div>

   <div class="rowct">
    <div class="colct">Ngày xác nhận</div>
    <div class="colct">${showNgay(hd.ngay_xac_nhan)}</div>
   </div>

   <div class="rowct">
    <div class="colct">Số lượng</div>
    <div class="colct">${hd.so_luong}</div>
   </div>
   
   <div class="rowct">
    <div class="colct">Tổng tiền</div>
    <div class="colct">${hd.tong_tien}</div>
   </div>

   <div class="rowct">
    <div class="colct">Trạng thái</div>
    <div class="colct">${uncode(hd.trang_thai)}</div>
   </div>
  </div>`;

    modal.innerHTML = s;
    modal.style.display = "flex";
}

function hienThiNgay(ngaybdInput, ngayktInput)
{
    var bd = new Date(ngaybdInput.value)
    var kt = new Date(ngayktInput.value)
    var d = 0;
    var dshd = localStorage.getItem("bills") ? JSON.parse(localStorage.getItem("bills")) : [];

    var selecteddshd = []
    for (var x of dshd)
        if (new Date(x.ngay_mua) >= bd && new Date(x.ngay_mua) <= kt)
            selecteddshd.push(x)
    if (selecteddshd.length === 0){
        alert("Không có sản phẩm nào để chọn")
        return;
    }

    var s = `  <table class="admin-table">
    <tr class="admin-table-heading">
      <th>ID</th>
      <th>Sản phẩm đã mua</th>
      <th>Ngày mua</th>
      <th>Ngày xác nhận</th>
      <th>Tổng tiền</th>
      <th>Trạng thái</th>
    </tr>`

    selecteddshd.forEach(bill => {
        s += `
        <tr class="admin-table-row" onclick="xacNhanBanHang(this)">
            <td>${bill.id_hd}</td>
            <td>${tensp(bill.id_sp)}</td>
            <td>${showNgay(bill.ngay_mua)}</td>
            <td>${showNgay(bill.ngay_xac_nhan)}</td>
            <td>${bill.tong_tien}</td>
            <td>${uncode(bill.trang_thai)}</td>
        </tr>
    `
    });
    s = s + "</table>";
    s += "<h2 onclick=showAll()> XEM TẤT CẢ </h2>"
    alert(`Có ${selecteddshd.length} hóa đơn trong khoảng thời gian giao dịch`)
    return s;
}

function showAll()
{
    var area = document.getElementById("bill-table");
    area.innerHTML = renderBillList();
}

function closeCTHD(a)
{
    document.getElementById("admin-modal").style.display = "none";
}

function xacNhanBanHang(row) {
    var value = row.querySelectorAll('td')[5].innerHTML.toLowerCase()
    console.log(value)
    if(!(value === "chưa xác nhận!")){
        return;
    }
    var x = confirm("Bạn có xác nhận bán hàng hay không?")
    var id = parseInt(row.querySelectorAll('td')[0].innerHTML);
    
    if (x)
    {
        row.style.backgroundImage = "none";
        row.querySelectorAll('td')[5].innerHTML = "Đã xác nhận"
        row.querySelectorAll('td')[3].innerHTML = showNgay(new Date())
        var dshd = localStorage.getItem("bills") ? JSON.parse(localStorage.getItem("bills")) : [];
        var dssp = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
        var len = dshd.length;
        var len1 = dssp.length;
        var hoadon;
        for (var i = 0; i < len; i++)
            if (dshd[i].id_hd === id)
            {
                console.log("id hoa don ", id)
                dshd[i].trang_thai = 1;
                dshd[i].ngay_xac_nhan = new Date();
                hoadon = dshd[i];
                break;
            }else{
                console.log(dshd[i].id_hd)
            }
        localStorage.setItem('bills', JSON.stringify(dshd))
        console.log("Hoa don ", hoadon)
        for (var i = 0; i < len1; i++)
            if (dssp[i].id === hoadon.id_sp)
            {
                dssp[i].soluong -= hoadon.so_luong;
                break;
            }
        localStorage.setItem('products', JSON.stringify(dssp))
        
    }
}

// Hàm render ds khách hàng
function renderCustomerList()
{
    var customers = localStorage.getItem('customers') ? JSON.parse( localStorage.getItem('customers')) : [];
    // table heading
    var res =  `
    <table class="admin-table">
    <tr class="admin-table-heading">
      <th>ID</th>
      <th>Họ và tên</th>
      <th>Tên đăng nhập</th>
      <th>Email</th>
      <th>Mật khẩu</th>
      <th>Đã thanh toán (Nghìn VNĐ)</th>
    </tr>
  
    `;
    // table content
    if (customers)
        customers.forEach(customer=> {
            res += `
            <tr class="admin-table-row">
                <td>${customer.id_customer}</td>
                <td>${customer.name}</td>
                <td>${customer.usname}</td>
                <td>${customer.email}</td>
                <td>${customer.password}</td>
                <td>${tongTien(customer.id_bill)}</td>
            </tr>
        `
        });
    // Hàm tính tổng tiền dựa theo mảng ID hóa đơn
    function tongTien(id_bill){
        var s = 0;
        var dshd = localStorage.getItem("bills") ? JSON.parse(localStorage.getItem("bills")) : [];
        for (var id_hd of id_bill)
            for (var x of dshd)
                if (x.id_hd === id_hd)
                    s += x.tong_tien;
        return s;
    }
    return res + "</table>";
}

// Hàm render ds sản phẩm
function renderProductList()
{
    var products = localStorage.getItem('products') ? JSON.parse( localStorage.getItem('products')) : [];
    // table heading
    var res = `
    <table class="admin-table">
    <tr class="admin-table-heading">
      <th>ID</th>
      <th>Tên sản phẩm</th>
      <th>Tồn kho</th>
      <th>Doanh thu(nghìn VNĐ)</th>
      <th> Lợi nhuận (nghìn VNĐ) </th>
      <th>Hình ảnh</th>
    </tr>
    `;
    // table content
    if (products)
        products.forEach(product=> {
            res += `
            <tr class="admin-table-row">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.soluong}</td>
                <td>${tongTien(product.id_bill)}</td>
                <td>${product.loi_nhuan}</td>
                <td><img src=${product.hinh_anh} width=100px"></td>
            </tr>
        `
        });
    res = res + "</table>";
        
    // Hàm tính tổng tiền dựa theo mảng ID hóa đơn
    function tongTien(id_bill){
        var s = 0;
        var dshd = localStorage.getItem("bills") ? JSON.parse(localStorage.getItem("bills")) : [];
        if(id_bill.length === 0)
            return 0;
        for (var id_hd of id_bill)
            for (var x of dshd)
                if (x.id_hd === id_hd)
                    s += x.tong_tien;
        return s;
    }
    return res;
}


// Hàm rednder ds nhân viên
function renderDSNV()
{
    var employees = localStorage.getItem('employees') ? JSON.parse( localStorage.getItem('employees')) : [];
    // console.log(employees)
    // table heading
    var res = `
    <table class="admin-table">
    <tr class="admin-table-heading">
      <th>ID</th>
      <th>Tên nhân viên</th>
      <th>Tên đăng nhập</th>
      <th>Mật khẩu</th>
      <th>Chức vụ</th>
    </tr>
    `;
    // table content
    if (employees)
    employees.forEach(employee => {
            res += `
            <tr class="admin-table-row">
                <td>${employee.id_nv}</td>
                <td>${employee.hoten}</td>
                <td>${employee.ten_dang_nhap}</td>
                <td>${employee.matkhau}</td>
                <td>${employee.chucvu}</td>
            </tr>
        `
        });
    res = res + "</table>";
    // console.log(res)
    return res;
}

// hàm render ds hóa đơn
function renderBillList(){
    var bills = localStorage.getItem('bills') ? JSON.parse( localStorage.getItem('bills')) : [];
    var res = `
    <table class="admin-table">
    <tr class="admin-table-heading">
      <th>ID</th>
      <th>Sản phẩm đã mua</th>
      <th>Ngày mua</th>
      <th>Ngày xác nhận</th>
      <th>Tổng tiền</th>
      <th>Trạng thái</th>
    </tr>
    `;
    // table content
    if (bills)
    bills.forEach(bill => {
            res += `
            <tr class="admin-table-row" onclick="xacNhanBanHang(this)">
                <td>${bill.id_hd}</td>
                <td>${tensp(bill.id_sp)}</td>
                <td>${showNgay(bill.ngay_mua)}</td>
                <td>${showNgay(bill.ngay_xac_nhan)}</td>
                <td>${bill.tong_tien}</td>
                <td>${uncode(bill.trang_thai)}</td>
            </tr>
        `
        });
    res = res + "</table>";
    return res;
}

function tensp(id_sp)
{
    var dssp = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    for (var x of dssp)
        if (x.id === id_sp){
            return x.name;
        }
    return "";
}

function uncode(x)
{
    if (x == 0)
        return "Chưa xác nhận!";
    return "Đã xác nhận!";
}
function showNgay(ngay1)
{
    if (!ngay1)
        return ""
    var ngay = new Date(ngay1);
    return ngay.getDate() + "-" + (ngay.getMonth()+1) + "-" + ngay.getFullYear();
}

/*******************ADMIN MODAL***************** */

// CHỨC NĂNG QUẢN LÝ SẢN PHẨM
// 1. Sửa thông tin sản phẩm
function suaThongTinSanPham(id_sanpham){
    var DSsanpham = JSON.parse(localStorage.getItem("products"))
    var sanpham;
    var index = 0; // index của danh sách sản phẩm
    for(var x of DSsanpham){
        if (x.id === id_sanpham){
            sanpham = x;
            break;
        }
        index++;
    }
    var changedsanpham = new Products();
    if (sanpham){
        for (var x in sanpham)
            changedsanpham[x] = sanpham[x]
    }
    // Hiện modal sửa thông tin sản phẩm
    var modal = document.getElementById("admin-modal");
    var closeBtnModalAdmin;
    modal.style.display = "flex";
    modal.innerHTML = `
    <div id="suaThongTinSanPham">
    <div class="heading">
        <h3>CHỈNH SỬA THÔNG TIN SẢN PHẨM</h3>
        <span id="closeBtnModalAdmin"><i class="fas fa-times"></i></span>
    </div>
    <div id="sanphamInputs">
        <div class="sanpham-left">
        <div class="hinhAnhSP">
            <img src=${sanpham.hinh_anh} width="100%" height=100% style="object-fit: cover;">
        </div>
        <input type="file" name="file" id="hinhAnhSP" style="display: none;" required>
        <label for="hinhAnhSP"><i class="fa-solid fa-upload"></i>Tải ảnh lên</label>
        </div>
        <div class="sanpham-right">
        <div>
        <label for='tenSP' style="text-align: left;">Tên sản phẩm</label>
        <input required type="text" name="" id="tenSP" placeholder="Tên sản phẩm" value='${sanpham.name}'>
        </div>
        <label for='giaNhapSP'>Giá nhập sản phẩm</label>
        <input required type="text" name="" id="giaNhapSP" disabled placeholder="Giá nhập" value=${sanpham.gia_nhap}>
        <label for='giaBanSP'>Giá bán sản phẩm</label>
        <input required type="text" name="" id="giaBanSP" placeholder="Giá bán" value=${sanpham.gia_ban}>
        <label for='MotaSP'>Mô tả sản phẩm</label>
        <input required type="text" name="" id="MotaSP" placeholder="Mô tả" value='${sanpham.mo_ta}'>
        <label for='khuyenMai1'>Khuyến mãi</label>
        <input list="khuyenMai" name="khuyenMai" id="khuyenMai1" value="0"}>
        <datalist id="khuyenMai">
            <option value="0">
            <option value="-10%">
            <option value="-20%">
            <option value="-30%">
            <option value="-40%">
            <option value="-50%">
        </datalist>
        <button class="btn"> XÁC NHẬN</button>
        </div>
    </div>
    </div>
    `;

    closeBtnModalAdmin= document.querySelector("#closeBtnModalAdmin");
    if (closeBtnModalAdmin)
        closeBtnModalAdmin.addEventListener('click', () => {
        modal.style.display = "none";
    });


    // Lấy ra button xác nhận 
    var btn = modal.querySelector("button.btn");
    var inputs = modal.querySelectorAll("input");
    // Upload hình ảnh
    uploadImg(modal.querySelector('#hinhAnhSP'), modal.querySelector("#sanphamInputs .hinhAnhSP img"));
    btn.onclick = function(){
        // Kiểm tra trường dữ liệu trống   
       for (var i = 1; i < inputs.length; i++){
           if (isRequired(inputs[i])){
                alert((isRequired(inputs[i])));
                return;
           }
        }

        // Kiểm tra giá bán và khuyến mãi phải lời
        var km = modal.querySelector("#khuyenMai1").value;
        var km1 = 100;
        if (km.includes("%")){
            km1 = parseInt(km.substring(1, km.length-1));
        }
        var gia_ban = parseInt(modal.querySelector("#giaBanSP").value);
        var gia_nhap = parseInt(modal.querySelector("#giaNhapSP").value);
        if (gia_ban*km1/100 <= gia_nhap){
            alert(  "Giá bán và khuyến mãi sẽ khiến bạn bị lỗ!")
            return;
        }

         // set lại thông tin của sản phẩm
        if (transformInputImgValue(document.getElementById("hinhAnhSP")))
        changedsanpham.hinh_anh = transformInputImgValue(document.getElementById("hinhAnhSP"));
        changedsanpham.name = modal.querySelector("#tenSP").value;
        changedsanpham.gia_ban = modal.querySelector("#giaBanSP").value;
        changedsanpham.mo_ta = modal.querySelector("#MotaSP").value;
        changedsanpham.khuyen_mai = modal.querySelector("#khuyenMai1").value;
         // Kiểm tra dữ liệu có trùng hay không
        var f = 1;
         for (x in sanpham){
            if (sanpham[x] != changedsanpham[x]){
                DSsanpham[index] = changedsanpham;
                localStorage.setItem("products",JSON.stringify(DSsanpham));
                alert("Thay đổi thành công!");
                modal.style.display = "none";
                showProductList();       
                f = 0;
                break;
            }
        }
        if (f == 1)
            alert("Thông tin không có sự thay đổi!")
        
    }
    

}


/**HÀM NHẬP HÀNG */
function showNhapHang()
{
    var form = document.getElementById("nhapHang");
    var inputs = form.querySelectorAll("input");
    var imgContainer = document.querySelector("#nhapHang .imgContainer img")
    uploadImg(inputs[5], imgContainer);
    
    inputs[6].addEventListener('click' , function(e){
        if (ktrInput(inputs))
        {
            alert(ktrInput  (inputs));
            return;
        }
        var dssp = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
        var currentId = dssp[dssp.length - 1].id;
        currentId = taoIdSp(currentId);
        /**id, name, gia_nhap, gia_ban, loi_nhuan, soluong, soluongban, 
    khuyen_mai,mo_ta, hinh_anh, loai, id_bill) */
        var new_sp = new Products (
            currentId, 
            inputs[0].value,
            inputs[1].value,
            inputs[2].value,
            0,
            inputs[3].value,
            0,
            0,
            'Mota',
            transformInputImgValue(inputs[5]),
            inputs[4].value,
            [0]
        )
        dssp.push(new_sp)
        localStorage.setItem("products", JSON.stringify(dssp));
        alert("Nhập hàng thành công!")
        location.reload()
    })
}

function ktrInput(inputs)
{
    // Tất cả không được trống
    for (var input of inputs)
        if (!input.value)
            return "Vui lòng điền đầy đủ thông tin!";
    return undefined;
}

function taoIdSp(x)
{
    var y = parseInt(x.substr(2))+1
    var s = "SP";
    if (y<10) 
        s += "00" + y.toString();
    else if (y < 100)
        s += "00" + y.toString();
    return s;
}

