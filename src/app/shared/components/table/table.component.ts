import {Component, Input} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from "@angular/material/icon";
import {NgFor, NgIf} from "@angular/common";
import {TableOperationsHistoryProvider} from "../../provider/table/field-operations-history-provider";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationModalComponent} from "../delete-confirmation-modal/delete-confirmation-modal.component";
import {TableOperationHistory} from "../../model/table/operations-history/table-operation-history";
import {FormComponent} from "../form/form.component";
import {EntitySelector} from "../../entity-selector";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CdkDropList,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    CdkDrag,
    MatHeaderRow,
    MatRow,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    NgFor,
    MatButton,
    NgIf,
    MatMiniFabButton
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input({alias: 'inputDeleteButtonVisible'}) deleteButtonVisible: boolean = false;
  @Input({alias: 'inputEditButtonVisible'}) editButtonVisible: boolean = false;
  @Input({alias: 'inputTableUsedAt'}) usedAt: EntitySelector = EntitySelector.FIELD;
  @Input({alias: 'inputColumns'}) columns: string[] = TableOperationsHistoryProvider.columns;
  @Input({alias: 'inputData'}) dataSource: TableOperationHistory[] = [];
  @Input({
    alias: 'inpuGetAttributeBasedOnColumn'
  }) getAttributeBasedOnColumn: ((column: string, element: any) => void) = (column: string, element: any) => {
    console.log('Here the method is not passed!')
  }

  constructor(private dialog: MatDialog) {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex + 1 === this.columns.length) return;
    if (event.previousIndex + 1 === this.columns.length) return;
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  onDelete(id: any) {
    this.dialog.open(DeleteConfirmationModalComponent, {data: {identifier: id, valueToDisplayForModal: 'this'}});
  }

  onEdit(element: any) {
    this.dialog.open(FormComponent, {
      data: {
        value: element,
        type: this.usedAt,
        edit: true
      }
    });
  }
}
