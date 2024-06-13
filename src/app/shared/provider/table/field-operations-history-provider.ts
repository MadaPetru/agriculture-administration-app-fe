import {TableOperationHistory} from "../../model/table/operations-history/table-operation-history";

export class TableOperationsHistoryProvider {
  private static _columns: string[] = ['Date', 'Estimated cost', 'Estimated harvest', 'Estimated revenue', 'Type of plant', 'Operation description', 'Operation column'];

  static get columns(): string[] {
    return this._columns;
  }

  public static getAttributeBasedOnColumn(column: string, element: TableOperationHistory): any {
    if (column === 'Date') return element.date;
    if (column === 'Estimated cost') return element.estimatedCost + ' ' + element.estimatedCostCurrencyType;
    if (column === 'Estimated harvest') return element.estimatedHarvest == null ? 'Nothing to harvest' : element.estimatedHarvest + ' ' + element.estimatedHarvestMeasureType;
    if (column === 'Operation description') return element.operationDescription;
    if (column === 'Estimated profit') return element.operationDescription;
    if (column === 'Type of plant') return element.typeOfPlant == null ? 'None' : element.typeOfPlant;
    if (column === 'Estimated revenue') return element.estimatedRevenue == null ? 0 : element.estimatedRevenue + ' ' + element.estimatedRevenueCurrencyType;
  }
}
