export interface UpdateFieldOperationHistory {
  id: number,
  version: number,
  operation: string,
  estimatedCost: number,
  farmingLandId: number,
  estimatedHarvest: number,
  estimatedHarvestMeasureType: string,
  estimatedCostCurrencyType: string,
  estimatedRevenue: number,
  estimatedRevenueCurrencyType: string,
  plantType: string,
  createdBy: string,
  appliedAt: string
}
