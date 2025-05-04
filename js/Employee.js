function Employee(id_nv, hoten, ten_dang_nhap, matkhau, chucvu)
{
    this.id_nv = id_nv;
    this.hoten = hoten;
    this.ten_dang_nhap = ten_dang_nhap;
    this.matkhau = matkhau;
    this.chucvu = chucvu;
}

// Tạo 4 nhân viên
// var c1 = [new Employee('NV001', 'Nguyễn Thanh Tùng', 'NguyenThanhTung57', 'NguyenThanhTung57*', 'admin'),
// new Employee('NV002', 'Trần Thanh Tùng', 'TranThanhTung57', 'NguyenThanhTung57*', 'admin'),
// new Employee('NV003', 'Lê Thanh ', 'LeThanh57', 'NguyenThanhTung57*', 'admin'),
// new Employee('NV004', 'Nguyễn Hoàng Quyên', 'NguyemHoangQuyen57', 'NguyenThanhTung57*', 'admin'),  
// ]
// localStorage.setItem('employees',JSON.stringify(c1));