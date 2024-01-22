import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { IssuesDataService } from '../../services/issues-data.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
export interface Issue {
  title: string;
  createdOn: string;
  updatedOn: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  issueDataService = inject(IssuesDataService);
  pageSize;
  issues: any;
  dataSource = new MatTableDataSource<Issue>();
  displayedColumns: string[] = ['createdOn', 'updatedOn', 'title'];
  errorMessage: string;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {

    this.populateTable(1);

  }

  sortIssues(sortState: Sort) {

    let sort = sortState.active === 'createdOn'? 'created': 'updated'

    this.populateTable(1, sortState.active, sortState.direction);

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    console.log(sortState);


  }

  handlePagination(event: any) {
    console.log(event);

    this.populateTable(event.pageIndex + 1);
  }

  populateTable(page: number, sort?: string, order?: string ) {
    this.issueDataService.getIssues(page, sort, order).subscribe((data: any) => {


      this.issues = data;
      let tempData = [];

      data.items.forEach((element: any) => {
        tempData.push({
          title: element.title,
          createdOn: element.created_at,
          updatedOn: element.updated_at,
        });
      });
      this.dataSource = new MatTableDataSource(tempData);
      this.dataSource.sort = this.sort;

      this.pageSize = data.total_count;

      console.log(this.dataSource.sort);
    }, (error: any) => {
      this.errorMessage = error.error.message;

      console.log(error)

      this._snackBar.open(this.errorMessage, 'Dismiss', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        politeness: 'assertive',
        })

    }
    );
  }
}