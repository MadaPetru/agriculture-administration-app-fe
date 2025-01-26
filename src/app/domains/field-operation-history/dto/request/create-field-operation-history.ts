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
  appliedAt: string
}

export function isCreateFieldOperationHistory(obj: any): obj is CreateFieldOperationHistory {
  return (
    obj &&
    typeof obj.operation === 'string' &&
    typeof obj.estimatedCost === 'number' &&
    typeof obj.farmingLandId === 'number' &&
    typeof obj.estimatedHarvest === 'number' &&
    typeof obj.estimatedHarvestMeasureType === 'string' &&
    typeof obj.estimatedCostCurrencyType === 'string' &&
    typeof obj.estimatedRevenue === 'number' &&
    typeof obj.estimatedRevenueCurrencyType === 'string' &&
    typeof obj.plantType === 'string' &&
    typeof obj.appliedAt === 'string'
  );
}

