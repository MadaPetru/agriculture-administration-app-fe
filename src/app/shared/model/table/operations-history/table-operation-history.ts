export interface TableOperationHistory {
  date: string;
  estimatedCost: number;
  estimatedHarvest: number;
  estimatedRevenue: number;
  estimatedHarvestMeasureType: string;
  estimatedCostCurrencyType: string;
  estimatedRevenueCurrencyType: string;
  operationDescription: string;
  typeOfPlant: string;
  id: number;
  farmingLandId: number;
  version: number;
}
