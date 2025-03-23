import {Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {TableOperationHistory} from "../../model/table/operations-history/table-operation-history";
import {EntitySelector} from "../../entity-selector";

export class FormValidatorProvider {

  public static getUserFormValidatorFields(type: EntitySelector) {
    if (type === EntitySelector.FIELD) return this.getUserFormValidatorFieldsFieldForm();
    if (type === EntitySelector.FIELD_OPERATION) return this.getUserFormValidatorFieldsOperationForm();
    return this.getUserFormValidatorFieldImageForm();
  }

  public static getUserEditFormValidatorFields(type: EntitySelector, data: any) {
    if (type === EntitySelector.FIELD_OPERATION) return this.getUserFormValidatorFieldsOperationEditForm(data);
    if (type === EntitySelector.FIELD) return this.getUserFormValidatorFieldForm(data);
    return this.getUserFormValidatorUserEditForm(data);
  }

  public static getFormValue(value: any, type: EntitySelector) {
    if (type === EntitySelector.FIELD) return {
      id: value.id,
      version: value.version,
      title: value.title,
      area: value.area,
      roughlyDistanceFromFarm: value.distanceFromFarm,
      areaUnitType: value.areaUnitType,
      roughlyDistanceFromFarmUnitType: value.roughlyDistanceFromFarmUnitType
    };
    if (type === EntitySelector.FIELD_OPERATION) return {
      id: value.id,
      version: value.version,
      farmingLandId: value.farmingLandId,
      operation: value.operation,
      estimatedCost: value.estimatedCost,
      estimatedHarvest: value.estimatedHarvest,
      plantType: value.typeOfPlant,
      estimatedRevenueCurrencyType: value.estimatedRevenueCurrencyType,
      estimatedRevenue: value.estimatedRevenue,
      appliedAt: value.appliedAt,
      estimatedHarvestMeasureType: value.estimatedHarvestMeasureType,
      estimatedCostCurrencyType: value.estimatedCostCurrencyType
    };
    if (type === EntitySelector.IMAGE_FIELD_OPERATION) return {
      at: value.at,
      images: value.images
    };
    if (type === EntitySelector.USER) return {
      id: value.id,
      version: value.version,
      email: value.email,
      roles: value.roles
    };
    return {}
  }

  private static getUserFormValidatorFieldsOperationForm() {
    let todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    return {
      operation: ['ARAT', Validators.required],
      estimatedCost: [0, [Validators.required, Validators.min(0)]],
      estimatedHarvest: [0, [Validators.required, Validators.min(0)]],
      estimatedRevenue: [0, [Validators.required, Validators.min(0)]],
      estimatedRevenueCurrencyType: ['RON'],
      typeOfPlant: ['NONE'],
      appliedAt: [todayDate, Validators.required],
      estimatedHarvestMeasureType: ['T', Validators.required],
      estimatedCostCurrencyType: ['RON', Validators.required]
    }
  }

  private static getUserFormValidatorFieldForm(value: any) {
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

  private static getUserFormValidatorFieldImageForm() {
    let todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    return {
      at: [todayDate,Validators.required],
      images: [null,Validators.required],
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
      estimatedHarvestMeasureType: [value.estimatedHarvestMeasureType],
      estimatedCostCurrencyType: [value.estimatedCostCurrencyType]
    }
  }

  private static getUserFormValidatorFieldsFieldForm() {
    return {
      title: ['', Validators.required],
      area: ['', Validators.required],
      distanceFromFarm: ['', Validators.required],
      roughlyDistanceFromFarmUnitType: ['KM'],
      areaUnitType: ['AR']
    }
  }

  private static getUserFormValidatorUserEditForm(value: any) {
    return {
      email: [value.email, Validators.required],
      roles: [value.roles, Validators.required],
      id: [value.id],
      version: [value.version]
    }
  }
}
