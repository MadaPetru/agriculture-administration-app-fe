import {Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {TableOperationHistory} from "../../model/table/operations-history/table-operation-history";

export class FormValidatorProvider {

  public static getUserFormValidatorFields(type: string) {
    if (type === 'field') return this.getUserFormValidatorFieldsFieldForm();
    if (type === 'operation') return this.getUserFormValidatorFieldsOperationForm();
    return this.getUserFormValidatorFieldsOperationForm();
  }

  public static getUserEditFormValidatorFields(type: string, data: any) {
    if (type === 'operation') return this.getUserFormValidatorFieldsOperationEditForm(data);
    return this.getUserFormValidatorFieldForm(data);
  }

  public static getFormValue(value: any, type: string) {
    if (type === 'field') return {
      id: value.id,
      version: value.version,
      title: value.title,
      area: value.area,
      roughlyDistanceFromFarm: value.distanceFromFarm,
      createdBy: 'adi',
      areaUnitType: value.areaUnitType,
      roughlyDistanceFromFarmUnitType: value.roughlyDistanceFromFarmUnitType
    };
    if (type === 'operation') return {
      id: value.id,
      version: value.version,
      farmingLandId: value.farmingLandId,
      operation: value.operation,
      estimatedCost: value.estimatedCost,
      estimatedHarvest: value.estimatedHarvest,
      createdBy: 'adi',
      plantType: value.typeOfPlant === 'NONE' ? null : value.typeOfPlant,
      estimatedRevenueCurrencyType: value.estimatedRevenueCurrencyType,
      estimatedRevenue: value.estimatedRevenue,
      appliedAt: value.appliedAt,
      estimatedHarvestMeasureType: value.estimatedHarvestMeasureType,
      estimatedCostCurrencyType: value.estimatedCostCurrencyType
    };
    return {}
  }

  private static getUserFormValidatorFieldsOperationForm() {
    let todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    return {
      operation: ['', Validators.required],
      estimatedCost: ['', Validators.required],
      estimatedHarvest: [''],
      estimatedRevenue: [''],
      estimatedRevenueCurrencyType: ['RON'],
      typeOfPlant: ['NONE'],
      appliedAt: [todayDate, Validators.required],
      estimatedHarvestMeasureType: ['T', Validators.required],
      estimatedCostCurrencyType: ['RON', Validators.required]
    }
  }

  private static getUserFormValidatorFieldForm(value:any) {
    return {
      id: value.id,
      version: value.version,
      title: [value.title, Validators.required],
      area: [value.area, Validators.required],
      distanceFromFarm: [value.roughlyDistanceFromFarm, Validators.required],
      roughlyDistanceFromFarmUnitType: [value.roughlyDistanceFromFarmUnitType],
      areaUnitType: [value.areaUnitType]
    }
  }

  private static getUserFormValidatorFieldsOperationEditForm(value: TableOperationHistory) {
    return {
      id: value.id,
      version: value.version,
      farmingLandId: value.farmingLandId,
      operation: [value.operationDescription, Validators.required],
      estimatedCost: [value.estimatedCost, Validators.required],
      estimatedHarvest: [value.estimatedHarvest],
      estimatedRevenue: [value.estimatedRevenue],
      estimatedRevenueCurrencyType: [value.estimatedRevenueCurrencyType],
      typeOfPlant: [value.typeOfPlant],
      appliedAt: [value.date, Validators.required],
      estimatedHarvestMeasureType: [value.estimatedHarvestMeasureType, Validators.required],
      estimatedCostCurrencyType: [value.estimatedCostCurrencyType, Validators.required]
    }
  }

  private static getUserFormValidatorFieldsFieldForm() {
    return {
      title: ['', Validators.required],
      area: ['', Validators.required],
      distanceFromFarm: ['', Validators.required],
      roughlyDistanceFromFarmUnitType: ['KM'],
      areaUnitType: ['HM']
    }
  }
}
