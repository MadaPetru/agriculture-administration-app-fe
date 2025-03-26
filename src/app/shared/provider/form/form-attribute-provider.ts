import {FormAttribute} from "../../model/form/form-attribute";
import {formatDate} from "@angular/common";
import {EntitySelector} from "../../entity-selector";
import {UserRole} from "../../../domains/user/dto/common/user-role.enum";

export class FormAttributeProvider {

  private static attributesForOperationForm: FormAttribute[];
  private static attributesForFieldAddForm: FormAttribute[];
  private static attributesForImageField: FormAttribute[];
  private static attributesForUser: FormAttribute[];


  static {
    this.attributesForOperationForm = this.initDataForOperationForm();
    this.attributesForFieldAddForm = this.initDataForFieldAddForm();
    this.attributesForImageField = this.initDataForImageFieldAddForm();
    this.attributesForUser = this.initDataForUserEditForm();
  }

  public static getAttributes(type: EntitySelector): FormAttribute[] {
    if (type === EntitySelector.FIELD_OPERATION) return FormAttributeProvider.attributesForOperationForm;
    if (type === EntitySelector.FIELD) return FormAttributeProvider.attributesForFieldAddForm;
    if (type === EntitySelector.IMAGE_FIELD_OPERATION) return FormAttributeProvider.attributesForImageField;
    return FormAttributeProvider.attributesForUser;
  }

  private static initDataForOperationForm(): FormAttribute[] {
    let data = new Array<FormAttribute>();
    data.push({
      inputId: 'operation',
      value: 'Operation',
      labelForValue: 'operation',
      formControlName: 'operation',
      inputType: 'select',
      options: ['ARAT', 'SEMANAT', 'RECOLTARE', 'DISCUIT', 'SCARIFICAT', 'IERBICIDAT', 'INGRASAMINTE', 'COMBINATOR']
    });
    data.push({
      inputId: 'estimatedCost',
      value: 'Estimated cost',
      labelForValue: 'estimatedCost',
      formControlName: 'estimatedCost', inputType: 'number'
    });
    data.push({
      inputId: 'estimatedCostCurrencyType',
      parentInputIdNeeded: 'estimatedCost',
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
      parentInputIdNeeded: 'estimatedHarvest',
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
      options: ['NONE', 'PORUMB', 'GRAU', 'ORZ', 'OVAZ', 'LUCERNA', 'TRIFOI', 'ORZOAICA']
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
      parentInputIdNeeded: 'estimatedRevenue',
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
      options: ['AR', 'HM']
    });
    return data;
  }

  private static initDataForImageFieldAddForm(): FormAttribute[] {
    let data = new Array<FormAttribute>();
    data.push({
      inputId: 'images',
      value: 'Images',
      labelForValue: 'images',
      formControlName: 'images',
      inputType: 'image'
    });
    data.push({
      inputId: 'at',
      value: 'At',
      labelForValue: 'at',
      formControlName: 'at',
      inputType: 'date',
      dateTypeMaxValue: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    });
    return data;
  }

  private static initDataForUserEditForm(): FormAttribute[] {
    let data = new Array<FormAttribute>();
    data.push({inputId: 'email', value: 'Email', labelForValue: 'email', formControlName: 'email', inputType: 'text'});
    data.push({
      inputId: 'roles',
      value: 'Roles',
      labelForValue: 'roles',
      formControlName: 'roles',
      inputType: 'select multiple',
      options: [UserRole.USER, UserRole.ADMIN]
    });
    return data;
  }
}
