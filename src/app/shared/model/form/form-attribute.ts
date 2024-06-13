export interface FormAttribute {
  value: string;
  labelForValue: string;
  inputId: string;
  inputType: string;
  formControlName: string;
  options?: Array<string>;
  dateTypeMaxValue?: string;
  defaultValue?: string;
}
