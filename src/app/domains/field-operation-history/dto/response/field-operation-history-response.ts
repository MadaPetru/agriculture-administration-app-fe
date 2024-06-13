export interface FieldOperationHistoryResponse {
  id: number,
  farmingLandId: number,
  operation: string,
  plantType: string,
  estimatedCost: number,
  estimatedRevenue: number,
  estimatedHarvest: number,
  createdAt: string,
  appliedAt: string,
  updatedAt: string,
  version: number,
  estimatedHarvestMeasureType: string,
  estimatedCostCurrencyType: string,
  estimatedRevenueCurrencyType: string
}
