export interface CreateFieldOperationHistory {
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
