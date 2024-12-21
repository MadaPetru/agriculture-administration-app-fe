import {TableOperationHistory} from "../../model/table/operations-history/table-operation-history";

export class TableOperationsHistoryProvider {
  private static _columns: string[] = ['Date', 'Cost', 'Harvest', 'Revenue', 'Plant', 'Operation', 'X'];

  static get columns(): string[] {
    return this._columns;
  }

  public static getAttributeBasedOnColumn(column: string, element: TableOperationHistory): any {
    if (column === 'Date') return element.date;
    if (column === 'Cost') return element.estimatedCost + ' ' + element.estimatedCostCurrencyType;
    if (column === 'Harvest') return element.estimatedHarvest + ' ' + element.estimatedHarvestMeasureType;
    if (column === 'Operation') return element.operationDescription;
    if (column === 'Plant') return element.typeOfPlant;
    if (column === 'Revenue') return element.estimatedRevenue + ' ' + element.estimatedRevenueCurrencyType;
  }
}
