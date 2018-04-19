import { Component, ViewChild } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Chart } from 'chart.js';

 
@Component({
  selector: 'page-line-graph',
  templateUrl: 'line-graph.html'
})
export class LineGraphPage {
  
 
  //code for line(user in put needed)
  data: Observable<any[]>;
  ref: AngularFireList<any>;
 
  months = [
    {value: 0, name: 'week1'},
    {value: 1, name: 'week2'},
    {value: 2, name: 'week3'},
    {value: 3, name: 'week4'},
    {value: 4, name: 'week5'},
    {value: 5, name: 'week6'},
    {value: 6, name: 'week7'},
    {value: 7, name: 'week8'},
    {value: 8, name: 'week9'},
  
  ];
 
  transaction = {
    value: 0,
    expense: false,
    month: 0
  }
 
  @ViewChild('valueLineCanvas') valueLineCanvas;
  valueLineChart: any;
 
  chartData = null;
 
  constructor(public navCtrl: NavController, private db: AngularFireDatabase, private toastCtrl: ToastController) {
  }
   ionViewDidLoad() {
     

    // Reference to our Firebase List
    this.ref = this.db.list('transactions', ref => ref.orderByChild('month'));
 
    // Catch any update to draw the Chart
    this.ref.valueChanges().subscribe(result => {
      if (this.chartData) {
        this.updateCharts(result)
      } else {
        this.createCharts(result)
      }
    })
  }
  addTransaction() {
    this.ref.push(this.transaction).then(() => {
      this.transaction = {
        value: 0,
        month: 0,
        expense: false
      };
      let toast = this.toastCtrl.create({
        message: 'New Mass added',
        duration: 3000
      });
      toast.present();
    })
}
getReportValues() {
  let reportByMonth = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null
  };
 
  for (let trans of this.chartData) {
    if (reportByMonth[trans.month]) {
      if (trans.expense) {
        reportByMonth[trans.month] -= +trans.value;
      } else {
        reportByMonth[trans.month] += +trans.value;
      }
    } else {
      if (trans.expense) {
        reportByMonth[trans.month] = 0 - +trans.value;
      } else {
        reportByMonth[trans.month] = +trans.value;
      }
    }
  }
  return Object.keys(reportByMonth).map(a => reportByMonth[a]);
}
createCharts(data) {
  this.chartData = data;
 
  // Calculate Values for the Chart
  let chartData = this.getReportValues();
 
  // Create the chart
  this.valueLineChart = new Chart(this.valueLineCanvas.nativeElement, {
    type: 'line',
    data: {
      labels: Object.keys(this.months).map(a => this.months[a].name),
      datasets: [{
        data: chartData,
        backgroundColor: '#32db64'
      }]
    },
    options: {

      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItems, data) {
            return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] +' kg';
          }
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        

   
        yAxes: [{
          ticks: {
            callback: function (value, index, values) {
              return value + 'g';
            },
            suggestedMin: 0
          }
        }]
      },
    }
  });
}
updateCharts(data) {
  this.chartData = data;
  let chartData = this.getReportValues();
 
  // Update our dataset
  this.valueLineChart.data.datasets.forEach((dataset) => {
    dataset.data = chartData
  });
  this.valueLineChart.update();//border forprevious code 
}

// static codes
  public lineChartData:Array<any> = [
  {data: [43, 422, 800, 1590, 2381, 2275, 4060,5040,1760], label: 'Breed1'},
  {data: [50, 500, 900, 1670, 2460, 2388, 3000,3900,1980], label: 'Breed2'},
  {data: [35, 450, 730, 1450, 2050, 2100, 2050,1904,1670], label: 'Breed3'}
];
public lineChartLabels:Array<any> = ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7','week8','week9'];
public lineChartOptions:any = {
  responsive: true
};

public lineChartLegend:boolean = false;
public lineChartType:string = 'line';

public lineChartColors:Array<any> = [

  {
    backgroundColor: 'rgba(0,159,1s,o)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(22,15,17,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  // Chart events
  public chartClicked(e:any):void {
    console.log(e);
  }

  // Chart events
  public chartHovered(e:any):void {
    console.log(e);
  }
}


 
   
 


 
