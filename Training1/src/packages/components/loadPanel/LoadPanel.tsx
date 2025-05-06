import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { LoadPanel } from "devextreme-react";
import { useAtomValue } from "jotai";

export default function LoadPanelConfig() {
  const loadPanel = useAtomValue(loadPanelAtom);

  return (
    <>
      <LoadPanel
        wrapperAttr={{
          class: "load-panel-custom",
        }}
        visible={loadPanel}
        shading={true}
        shadingColor="5px 5px 10px 2px rgba(229, 229, 229, 0.8)"
      />
    </>
  );
}
