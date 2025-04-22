import { SearchParam } from "../clientgate";

export interface IValidateForm {
    IsValidate: boolean; // True: hợp lệ; False: Không hợp lệ
    ErrorMessage?: string; // Thông điệp của lỗi
    Data: any; // Đối tượng dùng để push sau khi Validate = true
}

export interface RO_Type {
    ROType: string;
    ROTypeName: string;
}

export interface Expense_Type {
    ExpenseType: string;
    ExpenseTypeName: string;
}