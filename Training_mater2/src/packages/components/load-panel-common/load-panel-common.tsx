import { LoadPanel } from "devextreme-react";
export default function LoadPanelCommon() {
  return (
    <>
      <LoadPanel
        wrapperAttr={{
          class: "load-panel-custom",
        }}
        visible={true}
        shading={true}
        shadingColor="5px 5px 10px 2px rgba(229, 229, 229, 0.8)"
      />
    </>
  );
}
