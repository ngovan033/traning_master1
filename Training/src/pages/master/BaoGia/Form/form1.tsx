import { CheckBox } from "devextreme-react";
import "../Css/BaoGia.css";

export const Form1 = () => {
  return (
    <div className="container_form">
      <div className="form-section">
        <div className="top-row flex gap-[16px] items-center">
          {/* Khối 1: Báo giá và RO */}
          <div className="flex gap-[8px] flex-col justify-around">
            <button className="btn-outline"># Báo giá ▼</button>
            <label className="label">
              Số RO <span className="required">*</span>
            </label>
          </div>

          {/* Khối 2: Tìm kiếm */}
          <div className="flex gap-[8px] flex-col">
            <div className="flex gap-[8px] items-center">
              <input type="text" placeholder="Nhập" className="input" />
              <button className="btn-search">🔍</button>
            </div>
            <input
              type="text"
              value="BG-VS058.1-241003-002"
              className="inputRo"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="flex flex-col gap-[8px] justify-around">
          <label className="label">
            CvDV <span className="required"></span>
          </label>
          <label className="label">
            Số YC PDI <span className="required"></span>
          </label>
        </div>
        <div className="flex flex-col gap-[8px] justify-around">
          <input
            type="text"
            value="Nguyễn Thị Phương Linh"
            className="inputRo"
          />
          <div className="flex gap-[8px] items-center">
            <input type="text" value="YC00000000000" className="inputYC" />
            <CheckBox />
            <label className="label">
              Báo giá PDI <span className="required"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="kiemtra-container">
        <label className="kiemtra-label">
          Phân cấp kiểm tra
          <select className="kiemtra-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <div className="kiemtra-buttons">
          <button className="kiemtra-btn">Gói dịch vụ</button>
          <button className="kiemtra-btn">Tạo cuộc hẹn</button>
        </div>
      </div>
      <div className="image-container">
        <img src="/images/Christmas.png" className="rounded-image" />
        <img src="/images/image.png" className="rounded-image" />
      </div>
    </div>
  );
};
