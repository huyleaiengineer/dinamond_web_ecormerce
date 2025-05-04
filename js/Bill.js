function Bill(id_hd, id_sp, id_kh, ngay_mua, ngay_xac_nhan, so_luong, tong_tien, trang_thai)
{
    this.id_hd = id_hd;
    this.id_sp = id_sp;
    this.id_kh = id_kh;
    this.ngay_mua = ngay_mua;
    this.ngay_xac_nhan = ngay_xac_nhan;
    this.so_luong = so_luong;
    this.tong_tien = tong_tien;
    this.trang_thai = trang_thai;
}

/** TẠO 1 MẢNG GỒM 20 HÓA ĐƠN LÀM DL BAN ĐẦU - CHẠY HẾT CODE ĐỂ CÓ DL --> COMMENT LẠI ĐỂ TT CHƯƠNG TRÌNH */
/*
var c1 = [
   new Bill(1, "SP005", "KH001", new Date(2022, 10, 5), new Date(2022, 10, 6), 4, 200000, 1),
   new Bill(2, "SP018", "KH002", new Date(2022, 10, 10), new Date(2022, 10, 10), 4, 200000, 1),
   new Bill(3, "SP035", "KH003", new Date(2022, 10, 12), new Date(2022, 10, 13), 4, 200000, 1),
   new Bill(4, "SP006", "KH004", new Date(2022, 10, 13), new Date(2022, 10, 13), 4, 200000, 1),
   new Bill(5, "SP009", "KH005", new Date(2022, 10, 14), new Date(2022, 10, 20), 4, 200000, 1),
   new Bill(6, "SP005", "KH001", new Date(2022, 10, 15), new Date(2022, 10, 20), 4, 200000, 1),
   new Bill(7, "SP009", "KH001", new Date(2022, 10, 20), new Date(2022, 10, 20), 4, 200000, 1),
   new Bill(8, "SP009", "KH002", new Date(2022, 10, 21), new Date(2022, 10, 21), 4, 200000, 1),
   new Bill(9, "SP004", "KH002", new Date(2022, 10, 22), new Date(2022, 10, 22), 4, 200000, 1),
   new Bill(10, "SP024", "KH003", new Date(2022, 10, 23), new Date(2022, 10, 23), 4, 200000, 1),
   new Bill(11, "SP019", "KH003", new Date(2022, 10, 24), new Date(2022, 10, 24), 4, 200000, 1),
   new Bill(12, "SP006", "KH004", new Date(2022, 10, 25), new Date(2022, 10, 25), 4, 200000, 1),
   new Bill(13, "SP024", "KH004", new Date(2022, 10, 26), new Date(2022, 10, 26), 4, 200000, 1),
   new Bill(14, "SP005", "KH005", new Date(2022, 11, 1), new Date(2022, 11, 1), 4, 200000, 1),
   new Bill(15, "SP006", "KH005", new Date(2022, 11, 2), new Date(2022, 11, 2), 4, 200000, 1),
   new Bill(16, "SP009", "KH001", new Date(2022, 11, 3), new Date(2022, 11, 3), 4, 200000, 1),
   new Bill(17, "SP019", "KH002", new Date(2022, 11, 4), new Date(2022, 11, 4), 4, 200000, 1),
   new Bill(18, "SP005", "KH003", new Date(2022, 11, 4), new Date(2022, 11, 4), 4, 200000, 1),
   new Bill(19, "SP019", "KH004", new Date(2022, 11, 5), new Date(2022, 11, 5), 4, 200000, 1),
   new Bill(20, "SP005", "KH005", new Date(2022, 11, 5), new Date(2022, 11, 5), 4, 200000, 1),
]
localStorage.setItem("bills", JSON.stringify(c1));

// Lưu lịch sử

var dskh = localStorage.getItem("customers") ? JSON.parse(localStorage.getItem("customers")) : [];
var dssp = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

// Tìm kiếm 1 sản phẩm
function getSP(id, ds)
{
    for (var x of ds)
        if (x.id === id)
            return x;
    return undefined
}

// Tìm kiếm 1 khách hàng
function getKH(id, ds)
{
    for (var x of ds)
        if (x.id_customer=== id)
            return x;
    return undefined
}

getKH("KH001", dskh).id_bill = [1, 6, 7, 16];
getKH("KH002", dskh).id_bill = [2, 8, 9, 17];
getKH("KH003", dskh).id_bill = [3, 10, 11, 18];
getKH("KH004", dskh).id_bill = [4, 12, 13, 19];
getKH("KH005", dskh).id_bill = [5, 14, 15, 20];
localStorage.setItem("customers", JSON.stringify(dskh));

getSP("SP005", dssp).id_bill = [1, 6, 14, 18, 20];
getSP("SP018", dssp).id_bill = [2];
getSP("SP035", dssp).id_bill = [3];
getSP("SP006", dssp).id_bill = [4, 12, 15];
getSP("SP009", dssp).id_bill = [5, 7, 8, 16];
getSP("SP004", dssp).id_bill = [9];
getSP("SP024", dssp).id_bill = [10, 13];
getSP("SP019", dssp).id_bill = [11, 17, 19];

getSP("SP005", dssp).loi_nhuan = 10000; 
getSP("SP018", dssp).loi_nhuan = 10000;
getSP("SP035", dssp).loi_nhuan = 10000;
getSP("SP006", dssp).loi_nhuan = 10000; 
getSP("SP009", dssp).loi_nhuan = 10000; 
getSP("SP004", dssp).loi_nhuan = 10000;
getSP("SP024", dssp).loi_nhuan = 10000; 
getSP("SP019", dssp).loi_nhuan = 10000;   

localStorage.setItem("products", JSON.stringify(dssp));

*/








