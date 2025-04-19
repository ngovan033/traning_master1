import React from "react";
import { useForm, Controller } from "react-hook-form";
import "devextreme/dist/css/dx.light.css";
import TextBox from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import CheckBox from "devextreme-react/check-box";
import TagBox from "devextreme-react/tag-box";
import RadioGroup from "devextreme-react/radio-group";
import DataGrid, { Editing, Column } from "devextreme-react/data-grid";
import { Button } from "antd";
import "./App.css";

const App = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      products: [], // phải là array
    },
  });

  const [data, setData] = React.useState([
    { id: 1, name: "John", age: 25, like: "bóng đá", gender: true },
    { id: 2, name: "Jane", age: 15, like: "bóng rổ", gender: false },
    { id: 3, name: "tonuy", age: 23, like: "cầu lông", gender: true },
    { id: 4, name: "mather", age: 20, like: "bóng đá", gender: false },
  ]);

  const dataSelect =[
    { id: 1, like: "bóng đá" },
    { id: 2, like: "bóng rổ" },
    { id: 3, like: "cầu lông" },
  ];
  const simpleProducts = [
    "HD Video Player",
    "SuperHD Video Player",
    "SuperPlasma 50",
    "SuperLED 50",
    "SuperLED 42",
    "SuperLCD 55",
    "SuperLCD 42",
    "SuperPlasma 65",
    "SuperLCD 70",
    "Projector Plus",
    "Projector PlusHT",
    "ExcelRemote IR",
    "ExcelRemote Bluetooth",
    "ExcelRemote IP",
  ];
  const onAddData = (formData) => {
    const newData = { id: Date.now(), ...formData };
    setData((prevData) => [...prevData, newData]);
    reset();
  };

  const onUpdateData = (updatedData) => {
    const newData = data.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );
    setData(newData);
  };

  const onDeleteData = (deletedId) => {
    const newData = data.filter((item) => item.id !== deletedId);
    setData(newData);
  };

  const onSubmit = (formData) => {
    onAddData(formData);
  };

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Tên không được để trống" }}
            render={({ field }) => (
              <TextBox
                value={field.value || ""}
                onValueChanged={(e) => field.onChange(e.value)}
                placeholder="Nhập tên"
              />
            )}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <label>Age</label>
          <Controller
            name="age"
            control={control}
            rules={{
              required: "Tuổi không được để trống",
              min: { value: 1, message: "Tuổi phải lớn hơn 0" },
              max: { value: 100, message: "Tuổi phải nhỏ hơn hoặc bằng 100" },
            }}
            render={({ field }) => (
              <TextBox
                value={field.value || ""}
                onValueChanged={(e) => field.onChange(e.value)}
                placeholder="Nhập tuổi"
                inputAttr={{
                  type: "number",
                }}
              />
            )}
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>

        <div style={{ display: "flex", width: "100%", gap: "20px" }}>
          <label>Sở thích</label>
          <Controller
            name="like"
            control={control}
            rules={{
              required: "Vui lòng chọn sở thích",
            }}
            render={({ field }) => (
              <SelectBox
                value={field.value || ""}
                dataSource={dataSelect}
                displayExpr="like"
                valueExpr="like"
                onValueChanged={(e) => field.onChange(e.value)}
                placeholder="Chọn sở thích"
              />
            )}
          />
          {errors.like && <p style={{ color: "red" }}>{errors.like.message}</p>}
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <label>Giới tính</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <CheckBox
                value={field.value}
                defaultValue={false}
                onValueChanged={(e) => field.onChange(e.value)}
                text="Nam"
              />
            )}
          />
          {errors.gender && (
            <p style={{ color: "red" }}>{errors.gender.message}</p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Controller
            name="products"
            control={control}
            rules={{ required: "Vui lòng chọn ít nhất một sản phẩm" }}
            render={({ field }) => (
              <TagBox
                items={simpleProducts}
                value={field.value ?? []}
                onValueChange={(value) => field.onChange(value)}
                placeholder="Chọn sản phẩm"
                showClearButton={true}
                searchEnabled={true}
                applyValueMode="instantly"
                stylingMode="outlined"
              />
            )}
          />

          {errors.products && (
            <p style={{ color: "red" }}>{errors.products.message}</p>
          )}
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <label>Thể trạng</label>
          <Controller
            name="bodyType"
            control={control}
            rules={{ required: "Vui lòng chọn thể trạng" }}
            render={({ field }) => (
              <RadioGroup
                dataSource={[
                  { value: "tall", text: "Cao" },
                  { value: "skinny", text: "Gầy" },
                ]}
                value={field.value}
                onValueChanged={(e) => field.onChange(e.value)}
                displayExpr="text"
                valueExpr="value"
                placeholder="Chọn thể trạng"
              />
            )}
          />
          {errors.bodyType && (
            <p style={{ color: "red" }}>{errors.bodyType.message}</p>
          )}
        </div>
        <button type="submit" style={{ width: 60 }}>
          Add
        </button>
      </form>

      <DataGrid
        dataSource={data}
        keyField="id"
        showBorders={true}
        className="data-grid"
      >
        <Editing
          allowUpdating={true}
          allowAdding={false}
          allowDeleting={true}
          mode="row"
          onRowUpdated={(e) => onUpdateData(e.data)}
          onRowRemoved={(e) => onDeleteData(e.data.id)}
        />
        <Column dataField="id" allowEditing={false} />
        <Column dataField="name" />
        <Column dataField="age" />
        <Column dataField="like" />
        <Column
          dataField="gender"
          caption="Giới tính"
          cellRender={({ data }) => <span>{data.gender ? "Nam" : "Nữ"}</span>}
        />
        <Column
          dataField="products"
          caption="Sản phẩm"
          cellRender={({ data }) => (
            <span>{(data.products || []).join(", ")}</span>
          )}
        />
        <Column
          dataField="bodyType"
          caption="Thể trạng"
          cellRender={({ data }) => (
            <span>{data.bodyType === "tall" ? "Cao" : "Gầy"}</span>
          )}
        />
        <Column type="buttons">
          <Button name="edit" icon="edit" />
          <Button name="delete" icon="trash" />
        </Column>
      </DataGrid>
    </div>
  );
};

export default App;
