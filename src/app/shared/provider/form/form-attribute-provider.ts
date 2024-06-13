import {FormAttribute} from "../../model/form/form-attribute";
import {formatDate} from "@angular/common";

export class FormAttributeProvider {

  private static attributesForOperationForm: FormAttribute[];
  private static attributesForFieldAddForm: FormAttribute[];


  static {
    this.attributesForOperationForm = this.initDataForOperationForm();
    this.attributesForFieldAddForm = this.initDataForFieldAddForm();
  }

  public static getAttributes(type:string): FormAttribute[] {
    if(type === 'operation') return FormAttributeProvider.attributesForOperationForm;
    return FormAttributeProvider.attributesForFieldAddForm;
  }

  public static getAttributesForOperationForm(): FormAttribute[] {
    return FormAttributeProvider.attributesForOperationForm;
  }

  public static getAttributesForFieldAddForm(): FormAttribute[] {
    return FormAttributeProvider.attributesForFieldAddForm;
  }

  private static initDataForOperationForm(): FormAttribute[] {
    let data = new Array<FormAttribute>();
    data.push({
      inputId: 'operation',
      value: 'Operation',
      labelForValue: 'operation',
      formControlName: 'operation',
      inputType: 'text'
    });
    data.push({
      inputId: 'estimatedCost',
      value: 'Estimated cost',
      labelForValue: 'estimatedCost',
      formControlName: 'estimatedCost', inputType: 'number'
    });
    data.push({
      inputId: 'estimatedCostCurrencyType',
      value: 'Estimated cost currency Type',
      labelForValue: 'estimatedCostCurrencyType',
      formControlName: 'estimatedCostCurrencyType', inputType: 'select',
      options: ['RON', 'EURO']
    });
    data.push({
      inputId: 'estimatedHarvest',
      value: 'Estimated harvest',
      labelForValue: 'estimatedHarvest',
      formControlName: 'estimatedHarvest',
      inputType: 'number'
    });
    data.push({
      inputId: 'estimatedHarvestMeasureType',
      value: 'Estimated harvest measure type',
      labelForValue: 'estimatedHarvestMeasureType',
      formControlName: 'estimatedHarvestMeasureType', inputType: 'select',
      options: ['KG', 'T']
    });
    data.push({
      inputId: 'appliedAt',
      value: 'Applied at',
      labelForValue: 'appliedAt',
      formControlName: 'appliedAt',
      inputType: 'date',
      dateTypeMaxValue: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    });
    data.push({
      inputId: 'typeOfPlant',
      value: 'Type of Plant',
      labelForValue: 'typeOfPlant',
      formControlName: 'typeOfPlant',
      inputType: 'select',
      options: ['NONE', 'CORN', 'WHEAT']
    });
    data.push({
      inputId: 'estimatedRevenue',
      value: 'Estimated revenue',
      labelForValue: 'estimatedRevenue',
      formControlName: 'estimatedRevenue',
      inputType: 'number'
    });
    data.push({
      inputId: 'estimatedRevenueCurrencyType',
      value: 'Estimated revenue currency type',
      labelForValue: 'estimatedRevenueCurrencyType',
      formControlName: 'estimatedRevenueCurrencyType',
      inputType: 'select',
      options: ['RON', 'EURO']
    });
    return data;
  }

  private static initDataForFieldAddForm(): FormAttribute[] {
    let data = new Array<FormAttribute>();
    data.push({inputId: 'title', value: 'Title', labelForValue: 'title', formControlName: 'title', inputType: 'text'});
    data.push({
      inputId: 'distanceFromFarm',
      value: 'Distance from farm',
      labelForValue: 'distanceFromFarm',
      formControlName: 'distanceFromFarm', inputType: 'number'
    });
    data.push({
      inputId: 'roughlyDistanceFromFarmUnitType',
      value: 'Distance from farm unit type',
      labelForValue: 'roughlyDistanceFromFarmUnitType',
      formControlName: 'roughlyDistanceFromFarmUnitType', inputType: 'select',
      options: ['KM', 'M']
    });
    data.push({inputId: 'area', value: 'Area', labelForValue: 'area', formControlName: 'area', inputType: 'number'});
    data.push({
      inputId: 'areaUnitType',
      value: 'Area unit type',
      labelForValue: 'areaUnitType',
      formControlName: 'areaUnitType',
      inputType: 'select',
      options: ['HM', 'AR']
    });
    return data;
  }
}
