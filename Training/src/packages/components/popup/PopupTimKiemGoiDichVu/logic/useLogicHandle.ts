import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSetAtom } from "jotai";

interface ISearchParam {
    CusName: string;
    FrameNo: string;
    PlateNo: string;
}

export const useLogicHandle = () => {
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const setLoading = useSetAtom(loadPanelAtom);

    const jsonResultEntry = async (
        { CusName, FrameNo, PlateNo }: ISearchParam,
        gridRef: any
    ) => {
        setLoading(true);

        const resp = await api.Ser_CustomerCar_SearchDL({
            CusName: CusName,
            FrameNo: FrameNo,
            PlateNo: PlateNo,
            Ft_PageIndex: gridRef?.getGridRef()?.getDxInstance().pageIndex() ?? 0,
            Ft_PageSize: gridRef?.getGridRef()?.getDxInstance().pageSize() ?? 100,
        });

        if (resp.isSuccess) {
            setLoading(false);
            return {
                Success: true,
                Data: resp,
            };
        } else {
            showError({
                message: resp._strErrCode,
                _strErrCode: resp._strErrCode,
                _strTId: resp._strTId,
                _strAppTId: resp._strAppTId,
                _objTTime: resp._objTTime,
                _strType: resp._strType,
                _dicDebug: resp._dicDebug,
                _dicExcs: resp._dicExcs,
            });

            setLoading(false);
            return {
                Success: false,
                Data: null,
            };
        }
    };

    return {
        jsonResultEntry,
    };
};
