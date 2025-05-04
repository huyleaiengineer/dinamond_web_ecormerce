function Products(id, name, gia_nhap, gia_ban, loi_nhuan, soluong, soluongban, 
    khuyen_mai,mo_ta, hinh_anh, loai, id_bill)
{
    this.id = id;
    this.name = name;
    this.gia_nhap = gia_nhap;
    this.gia_ban = gia_ban;
    this.loi_nhuan = loi_nhuan;
    this.soluong = soluong;
    this.soluongban = soluongban;
    this.khuyen_mai = khuyen_mai;
    this.mo_ta = mo_ta;
    this.hinh_anh = hinh_anh;
    this.loai = loai;
    this.id_bill = id_bill;
}

/** Loại 1: trang sức, 2 là trang sức cưới, 3 đồng hồ, 4 đá quý */

// localStorage.clear()
/*
c1 = [new Products('SP001', 'Kiềng vàng nữ PNJ 24k 1 lượng ', 10000, 20000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(1).png", 2, [0]),
new Products('SP002', 'Nhẫn unisex vàng trắng PNJ 14K DDDDW000636', 10000, 23000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(2).png", 2, [0]),
new Products('SP003', 'Nhẫn nam vàng trắng PNJ 14K trắng 14K PNJ DDDDW000636', 13000, 50000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(3).png", 2, [0]),
new Products('SP004', 'Nhẫn nữ vàng  PNJ 14K 3 chỉ PNJ DDDDW000636', 10000, 57000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(4).png", 2, [0]),
new Products('SP005', 'Nhẫn nữ vàng  PNJ 14K 14K PNJ DDDDW000636', 10000, 29000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(5).png", 2, [0]),
new Products('SP006', 'Dây chuyền nữ Style Kim cương Vàng trắng 14K PNJ DDDDW000636', 10000, 16000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(6).png", 2, [0]),
new Products('SP007', 'Dây chuyền nữ Dissey Kim cương trắng 14K PNJ DDDDW000636', 10000, 39000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(7).png", 2, [0]),
new Products('SP008', 'Nhẫn nữ vàng PNJ 14K 8 chỉ PNJ  PNJ DDDDW000636', 30000, 50000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(8).png", 2, [0]),
new Products('SP009', 'Nhẫn ngọc trai Dissey 14K 3 chỉ PNJ 14K PNJ DDDDW000636', 10000, 50000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(9).png", 2, [0]),
new Products('SP010', 'Dây chuyền Kim cương Vàng trắng 14K PNJ DDDDW000636', 10000, 50000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/mj(10).png", 2, [0]),

new Products('SP011', 'Mặt dây chuyền Kim cương Dissey Vàng trắng 14K  DDDDW000636', 10000, 18000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j1.png", 1, [0]),
new Products('SP012', 'Mặt dây chuyền Kim cương  Style Vàng trắng 14K  DDDDW000636', 10000, 26000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j2.png", 1, [0]),
new Products('SP013', 'Nhẫn Kim cương Vàng trắng Dissey 14K  DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j3.png", 1, [0]),
new Products('SP014', 'Mặt dây chuyền Kim cương Vàng trắng 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j4.png", 1, [0]),
new Products('SP015', 'Lắc tay Kim cương Style  DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j5.png", 1, [0]),
new Products('SP016', 'Lắc tay Kim cương Dissey 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j6.png", 1, [0]),
new Products('SP017', 'Nhẫn Vàng Style trắng 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j7.png", 1, [0]),
new Products('SP018', 'Nhẫn Kim cương Dissey  14K PNJ DDDDW000636', 10000, 99000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j8.png", 1, [0]),
new Products('SP019', 'Bông tai kim cương Dissey PNJ DDDDW000636', 10000, 150000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j9.png", 1, [0]),
new Products('SP020', 'Vòng tay Style  14K PNJ DDDDW000636', 10000, 105000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/j10.png", 1, [0]),

new Products('SP021', 'Đồng hồ Emily Carter Kim cương 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(1).png", 3, [0]),
new Products('SP022', 'Đồng hồ Rochet Kim cương 14K PNJ DDDDW000636', 500, 1000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(2).png", 3, [0]),
new Products('SP023', 'Đồng hồ Tissot Kim cương 14K PNJ DDDDW000636', 300, 900, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(3).png", 3, [0]),
new Products('SP024', 'Đồng hồ Citizen Kim cương 14K PNJ DDDDW000636', 400, 900, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(4).png", 3, [0]),
new Products('SP025', 'Đồng hồ EmilyCarter Kim cương 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(5).png", 3, [0]),
new Products('SP026', 'Đồng hồ Rochet Kim cương 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(6).png", 3, [0]),
new Products('SP027', 'Đồng hồ Tissot Kim cương 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(7).png", 3, [0]),
new Products('SP028', 'Đồng hồ Tissot Citizen Kim cương 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(8).png", 3, [0]),
new Products('SP029', 'Đồng hồ Citizen Kim cương  14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(9).png", 3, [0]),
new Products('SP030', 'Đồng hồ Emily CarterKim cương Vàng trắng 14K PNJ DDDDW000636', 10000, 50000, 0, 100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/w(10).png", 3, [0]),

new Products('SP031', 'Kim cương viên Tissot', 123000, 150000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d1.jfif", 4, [0]),
new Products('SP032', 'Kim cương viên Citizen', 18900, 150000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d2.jfif", 4, [0]),
new Products('SP033', 'Kim cương viên Tissot', 27000, 150000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d3.jfif", 4, [0]),
new Products('SP034', 'Kim cương viên Dissey', 100000, 150000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d4.jfif", 4, [0]),
new Products('SP035', 'Kim cương viên Citizen', 100700, 150000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d5.jfif", 4, [0]),
new Products('SP036', 'Kim cương viên Tissot', 10900, 150000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d6.jfif", 4, [0]),
new Products('SP037', 'Kim cương viên Tissot', 60000, 90000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d7.jfif", 4, [0]),
new Products('SP038', 'Kim cương viên Tissot', 24000, 50000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d8.jfif", 4, [0]),
new Products('SP039', 'Kim cương viên Citizen', 15000, 50000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d9.jfif", 4, [0]),
new Products('SP040', 'Kim cương viên Dissey', 92000, 50000, 0,  100, 0, '0', "Nhẫn kim cương số 1", "./asset/img/d10.jfif", 4, [0])
]

localStorage.setItem("products", JSON.stringify(c1));

*/




