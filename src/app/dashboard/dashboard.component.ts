import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannersService } from 'app/banners/banners.service';
import { Webbanners } from 'app/banners/webhome.model';
import { ExamService } from 'app/exam/exam.service';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Subject } from 'app/manage/subject/subject.model';
import { Question } from 'app/question/question.model';
import { QuestionService } from 'app/question/question.service';
import { Register } from 'app/register/register.model';
import { RegisterService } from 'app/register/register.service';
import { Studentregister } from 'app/register/student.model';
import { ChartOptions, ChartType ,ChartDataSets} from 'chart.js';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';

// import Chart from 'chart.js';
declare const $: any;
declare var require: any;


@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public gradientStroke;
  public chartColor = "#FFFFFF";
  public canvas: any;
  public ctx;
  public gradientFill;
  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;
  public myChart: any;

  public activeUsersChartType;
  public activeUsersChartData: Array<any>;
  public activeUsersChartOptions: any;
  public activeUsersChartLabels: Array<any>;
  public activeUsersChartColors: Array<any>

  Teacher: any = 'Teacher';
  Student: any = 'Student';
  public subjects: Subject[] = [];
  public stdlist: Std[] = [];
  public reg: Register[];
  public Banners: Webbanners[] = [];
  topban: any = [];
  public studentsList: Studentregister[];
  public Test: Question[];
  public ActiveTest: any = [];
  submitedTest: any[];
  showSubmited: boolean = false;
  showList: boolean = false;
  selectedSub: any;
  dispTest: any = [];
  sub: any;
  pendingtestlist: any = [];
  notattemptedtestlist: any = [];
  completedtestlist: any = [];
  uname = localStorage.getItem('UserName');
  attendancecount:any=[];
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  data: MultiDataSet;
  public role = localStorage.getItem('role');
  doughnutChartData: SingleDataSet;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Visitors'], ['Students'], 'Teachers'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  pieceLabel: {
    render: 'label'
  }
  public doughnutChartOption: any = [];

  public doughnutChartLabels: Label[] = [['Student'], ['Teacher']];
  // public doughnutChartData: SingleDataSet = [
  //   [500, 150, 100],
  // ];


  // bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ display: true,
      ticks: {
          beginAtZero: true,
          stepValue: 10,
          max: 100
      },
      scaleLabel: {
        display: true,
        labelString: 'in Percentage (%)'
    }}] },
 
       
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Present' },
  
  ];
  

  // bar chart over

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: any = {
    cutoutPercentage: 50,
    responsive:true,
    elements: {
      center: {
        text: '90%',
        fontColor: '#66615c',
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        fontSize: 24,
        fontStyle: 'normal',
        sidePadding: 60,

      }
    }
  };
  public doughnutChartDatasets: any[] = [
    {
      data: [300, 50, 100],
      options: this.doughnutChartOptions,
      backgroundColor: [
        "#f4a314",
        "#c92c10",
        "#FFCE56"
      ],
      hoverBackgroundColor: [
        "#f4a314",
        "#c92c10",
        "#FFCE56"
      ]
    }];
  // public options: {
  //   elements: {
  //     center: {
  //       text: '60%',
  //       color: '#66615c', // Default is #000000
  //       fontStyle: 'Arial', // Default is Arial
  //       sidePadding: 60 // Defualt is 20 (as a percentage)
  //     }
  //   },
  // }
  viewDate = Date.now();
  dateList: Date[]=[];
  constructor(
    private manageService: ManageService,
    private registerService: RegisterService,
    private questionService: QuestionService,
    private bannersService: BannersService,
    private examService: ExamService,
    private router: Router,
  ) {
    this.getDashboardStdList();
    this.getStudent();
    this.getTeacher();
    this.getTotalTest();
    this.getBanners();
    this.getStudentTest();
    // this.getSubmittedTest();
    this.getSubjectList();
   
  }
  ngOnInit() {

      for (let i = 5; i >= 0; i--) {
        const newDate = new Date(this.viewDate);
        newDate.setDate(newDate.getDate() - i);
        this.dateList.push(newDate);
      }
       this.dateList;
       this.getAttendanceCount();
       this.barChartLabels= [""+this.dateList[0].toLocaleDateString()+"", ""+this.dateList[1].toLocaleDateString()+"",""+this.dateList[2].toLocaleDateString()+"" , ""+this.dateList[3].toLocaleDateString()+"", ""+this.dateList[4].toLocaleDateString()+"", ""+this.dateList[5].toLocaleDateString()+""];
      
    

  }
  getAttendanceCount(){
    this.manageService.getAttendaceCount(this.dateList).subscribe((data: any) => {
      this.attendancecount = data;
      this.attendancecount.forEach(element => {
        element.count = (this.studentsList.length * element.count)/100;
      });
      
      this.barChartData = [
        {label: 'Present in Percentage (%)', data: [this.attendancecount[0].count,this.attendancecount[1].count,this.attendancecount[2].count,this.attendancecount[3].count,this.attendancecount[4].count,this.attendancecount[5].count]},
      
      ];
     
      // this.stdlist = data;
  });
}


  // public ngOnInit() {
  //   this.chartColor = "#FFFFFF";

  //   var cardStatsMiniLineColor = "#fff",
  //     cardStatsMiniDotColor = "#fff";

  //   this.canvas = document.getElementById("chartActivity");
  //   this.ctx = this.canvas.getContext("2d");

  //   this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
  //   this.gradientStroke.addColorStop(0, '#80b6f4');
  //   this.gradientStroke.addColorStop(1, this.chartColor);

  //   this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
  //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  //   this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

  //   myChart = new Chart(this.ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  //       datasets: [

  //         {
  //           label: "Data",
  //           borderColor: '#fcc468',
  //           fill: true,
  //           backgroundColor: '#fcc468',
  //           hoverBorderColor: '#fcc468',
  //           borderWidth: 8,
  //           data: [100, 120, 80, 100, 90, 130, 110, 100, 80, 110, 130, 140, 130, 120, 130, 80, 100, 90, 120, 130],
  //         },
  //         {
  //           label: "Data",
  //           borderColor: '#4cbdd7',
  //           fill: true,
  //           backgroundColor: '#4cbdd7',
  //           hoverBorderColor: '#4cbdd7',
  //           borderWidth: 8,
  //           data: [80, 140, 50, 120, 50, 150, 60, 130, 50, 130, 150, 100, 110, 80, 140, 50, 140, 50, 110, 150],
  //         }
  //       ]
  //     },
  //     options: {

  //       tooltips: {
  //         tooltipFillColor: "rgba(0,0,0,0.5)",
  //         tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  //         tooltipFontSize: 14,
  //         tooltipFontStyle: "normal",
  //         tooltipFontColor: "#fff",
  //         tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  //         tooltipTitleFontSize: 14,
  //         tooltipTitleFontStyle: "bold",
  //         tooltipTitleFontColor: "#fff",
  //         tooltipYPadding: 6,
  //         tooltipXPadding: 6,
  //         tooltipCaretSize: 8,
  //         tooltipCornerRadius: 6,
  //         tooltipXOffset: 10,
  //       },


  //       legend: {

  //         display: false
  //       },
  //       scales: {

  //         yAxes: [{
  //           ticks: {
  //             fontColor: "#9f9f9f",
  //             fontStyle: "bold",
  //             beginAtZero: true,
  //             maxTicksLimit: 5,
  //             padding: 20
  //           },
  //           gridLines: {
  //             zeroLineColor: "transparent",
  //             display: true,
  //             drawBorder: false,
  //             color: '#9f9f9f',
  //           }

  //         }],
  //         xAxes: [{
  //           barPercentage: 0.4,
  //           gridLines: {
  //             zeroLineColor: "white",
  //             display: false,

  //             drawBorder: false,
  //             color: 'transparent',
  //           },
  //           ticks: {
  //             padding: 20,
  //             fontColor: "#9f9f9f",
  //             fontStyle: "bold"
  //           }
  //         }]
  //       }
  //     }
  //   });

  //   Chart.pluginService.register({
  //     beforeDraw: function (chart) {
  //       if (chart.config.options.elements.center) {
  //         //Get ctx from string
  //         var ctx = chart.chart.ctx;

  //         //Get options from the center object in options
  //         var centerConfig = chart.config.options.elements.center;
  //         var fontStyle = centerConfig.fontStyle || 'Arial';
  //         var txt = centerConfig.text;
  //         var color = centerConfig.color || '#000';
  //         var sidePadding = centerConfig.sidePadding || 20;
  //         var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
  //         //Start with a base font of 30px
  //         ctx.font = "30px " + fontStyle;

  //         //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
  //         var stringWidth = ctx.measureText(txt).width;
  //         var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

  //         // Find out how much the font can grow in width.
  //         var widthRatio = elementWidth / stringWidth;
  //         var newFontSize = Math.floor(30 * widthRatio);
  //         var elementHeight = (chart.innerRadius * 2);

  //         // Pick a new font size so it will not be larger than the height of label.
  //         var fontSizeToUse = Math.min(newFontSize, elementHeight);

  //         //Set font settings to draw it correctly.
  //         ctx.textAlign = 'center';
  //         ctx.textBaseline = 'middle';
  //         var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
  //         var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
  //         ctx.font = fontSizeToUse + "px " + fontStyle;
  //         ctx.fillStyle = color;

  //         //Draw text in center
  //         ctx.fillText(txt, centerX, centerY);
  //       }
  //     }
  //   });

  //   this.canvas = document.getElementById("chartDonut1");
  //   this.ctx = this.canvas.getContext("2d");

  //   myChart = new Chart(this.ctx, {
  //     type: 'pie',
  //     data: {
  //       labels: [1, 2],
  //       datasets: [{
  //         label: "Emails",
  //         pointRadius: 0,
  //         pointHoverRadius: 0,
  //         backgroundColor: ['#4acccd', '#f4f3ef'],
  //         borderWidth: 0,
  //         data: [60, 40]
  //       }]
  //     },
  //     options: {
  //       elements: {
  //         center: {
  //           text: '60%',
  //           color: '#66615c', // Default is #000000
  //           fontStyle: 'Arial', // Default is Arial
  //           sidePadding: 60 // Defualt is 20 (as a percentage)
  //         }
  //       },
  //       cutoutPercentage: 90,
  //       legend: {

  //         display: false
  //       },

  //       tooltips: {
  //         enabled: false
  //       },

  //       scales: {
  //         yAxes: [{

  //           ticks: {
  //             display: false
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             zeroLineColor: "transparent",
  //             color: 'rgba(255,255,255,0.05)'
  //           }

  //         }],

  //         xAxes: [{
  //           barPercentage: 1.6,
  //           gridLines: {
  //             drawBorder: false,
  //             color: 'rgba(255,255,255,0.1)',
  //             zeroLineColor: "transparent"
  //           },
  //           ticks: {
  //             display: false,
  //           }
  //         }]
  //       },
  //     }
  //   });

  //   this.canvas = document.getElementById("chartDonut2");
  //   this.ctx = this.canvas.getContext("2d");

  //   myChart = new Chart(this.ctx, {
  //     type: 'pie',
  //     data: {
  //       labels: [1, 2],
  //       datasets: [{
  //         label: "Emails",
  //         pointRadius: 0,
  //         pointHoverRadius: 0,
  //         backgroundColor: ['#fcc468', '#f4f3ef'],
  //         borderWidth: 0,
  //         data: [34, 66]
  //       }]
  //     },
  //     options: {
  //       elements: {
  //         center: {
  //           text: '34%',
  //           color: '#66615c', // Default is #000000
  //           fontStyle: 'Arial', // Default is Arial
  //           sidePadding: 60 // Defualt is 20 (as a percentage)
  //         }
  //       },
  //       cutoutPercentage: 90,
  //       legend: {

  //         display: false
  //       },

  //       tooltips: {
  //         enabled: false
  //       },

  //       scales: {
  //         yAxes: [{

  //           ticks: {
  //             display: false
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             zeroLineColor: "transparent",
  //             color: 'rgba(255,255,255,0.05)'
  //           }

  //         }],

  //         xAxes: [{
  //           barPercentage: 1.6,
  //           gridLines: {
  //             drawBorder: false,
  //             color: 'rgba(255,255,255,0.1)',
  //             zeroLineColor: "transparent"
  //           },
  //           ticks: {
  //             display: false,
  //           }
  //         }]
  //       },
  //     }
  //   });

  //   this.canvas = document.getElementById("chartDonut3");
  //   this.ctx = this.canvas.getContext("2d");

  //   myChart = new Chart(this.ctx, {
  //     type: 'pie',
  //     data: {
  //       labels: [1, 2],
  //       datasets: [{
  //         label: "Emails",
  //         pointRadius: 0,
  //         pointHoverRadius: 0,
  //         backgroundColor: ['#f17e5d', '#f4f3ef'],
  //         borderWidth: 0,
  //         data: [80, 20]
  //       }]
  //     },
  //     options: {
  //       elements: {
  //         center: {
  //           text: '80%',
  //           color: '#66615c', // Default is #000000
  //           fontStyle: 'Arial', // Default is Arial
  //           sidePadding: 60 // Defualt is 20 (as a percentage)
  //         }
  //       },
  //       cutoutPercentage: 90,
  //       legend: {

  //         display: false
  //       },

  //       tooltips: {
  //         enabled: false
  //       },

  //       scales: {
  //         yAxes: [{

  //           ticks: {
  //             display: false
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             zeroLineColor: "transparent",
  //             color: 'rgba(255,255,255,0.05)'
  //           }

  //         }],

  //         xAxes: [{
  //           barPercentage: 1.6,
  //           gridLines: {
  //             drawBorder: false,
  //             color: 'rgba(255,255,255,0.1)',
  //             zeroLineColor: "transparent"
  //           },
  //           ticks: {
  //             display: false,
  //           }
  //         }]
  //       },
  //     }
  //   });


  //   this.canvas = document.getElementById("chartDonut4");
  //   this.ctx = this.canvas.getContext("2d");

  //   myChart = new Chart(this.ctx, {
  //     type: 'pie',
  //     data: {
  //       labels: [1, 2],
  //       datasets: [{
  //         label: "Emails",
  //         pointRadius: 0,
  //         pointHoverRadius: 0,
  //         backgroundColor: ['#66615b', '#f4f3ef'],
  //         borderWidth: 0,
  //         data: [11, 89]
  //       }]
  //     },
  //     options: {
  //       elements: {
  //         center: {
  //           text: '11%',
  //           color: '#66615c', // Default is #000000
  //           fontStyle: 'Arial', // Default is Arial
  //           sidePadding: 60 // Defualt is 20 (as a percentage)
  //         }
  //       },
  //       cutoutPercentage: 90,
  //       legend: {

  //         display: false
  //       },

  //       tooltips: {
  //         enabled: false
  //       },

  //       scales: {
  //         yAxes: [{

  //           ticks: {
  //             display: false
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             zeroLineColor: "transparent",
  //             color: 'rgba(255,255,255,0.05)'
  //           }

  //         }],

  //         xAxes: [{
  //           barPercentage: 1.6,
  //           gridLines: {
  //             drawBorder: false,
  //             color: 'rgba(255,255,255,0.1)',
  //             zeroLineColor: "transparent"
  //           },
  //           ticks: {
  //             display: false,
  //           }
  //         }]
  //       },
  //     }
  //   });




  //   this.canvas = document.getElementById("activeUsers");
  //   this.ctx = this.canvas.getContext("2d");

  //   this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
  //   this.gradientStroke.addColorStop(0, '#80b6f4');
  //   this.gradientStroke.addColorStop(1, this.chartColor);

  //   this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
  //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  //   this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

  //   myChart = new Chart(this.ctx, {
  //     type: 'line',
  //     data: {
  //       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  //       datasets: [{
  //         label: "Active Users",
  //         borderColor: "#6bd098",
  //         pointRadius: 0,
  //         pointHoverRadius: 0,
  //         fill: false,
  //         borderWidth: 3,
  //         data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610]
  //       }]
  //     },
  //     options: {

  //       legend: {

  //         display: false
  //       },

  //       tooltips: {
  //         enabled: false
  //       },

  //       scales: {
  //         yAxes: [{

  //           ticks: {
  //             fontColor: "#9f9f9f",
  //             beginAtZero: false,
  //             maxTicksLimit: 5,
  //             //padding: 20
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             zeroLineColor: "transparent",
  //             color: 'rgba(255,255,255,0.05)'
  //           }

  //         }],

  //         xAxes: [{
  //           barPercentage: 1.6,
  //           gridLines: {
  //             drawBorder: false,
  //             color: 'rgba(255,255,255,0.1)',
  //             zeroLineColor: "transparent",
  //             display: false,
  //           },
  //           ticks: {
  //             padding: 20,
  //             fontColor: "#9f9f9f"
  //           }
  //         }]
  //       },
  //     }
  //   });


  //   this.canvas = document.getElementById("emailsCampaignChart");
  //   this.ctx = this.canvas.getContext("2d");

  //   this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
  //   this.gradientStroke.addColorStop(0, '#18ce0f');
  //   this.gradientStroke.addColorStop(1, this.chartColor);

  //   this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
  //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  //   this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

  //   var myChart = new Chart(this.ctx, {
  //     type: 'line',
  //     data: {
  //       labels: ["12pm", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
  //       datasets: [{
  //         label: "Email Stats",
  //         borderColor: "#ef8156",
  //         pointHoverRadius: 0,
  //         pointRadius: 0,
  //         fill: false,
  //         backgroundColor: this.gradientFill,
  //         borderWidth: 3,
  //         data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
  //       }]
  //     },
  //     options: {

  //       legend: {

  //         display: false
  //       },

  //       tooltips: {
  //         enabled: false
  //       },

  //       scales: {
  //         yAxes: [{

  //           ticks: {
  //             fontColor: "#9f9f9f",
  //             beginAtZero: false,
  //             maxTicksLimit: 5,
  //             //padding: 20
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             zeroLineColor: "transparent",
  //             color: 'rgba(255,255,255,0.05)'
  //           }

  //         }],

  //         xAxes: [{
  //           barPercentage: 1.6,
  //           gridLines: {
  //             drawBorder: false,
  //             color: 'rgba(255,255,255,0.1)',
  //             zeroLineColor: "transparent",
  //             display: false,
  //           },
  //           ticks: {
  //             padding: 20,
  //             fontColor: "#9f9f9f"
  //           }
  //         }]
  //       },
  //     }
  //   });

  //   this.canvas = document.getElementById("activeCountries");
  //   this.ctx = this.canvas.getContext("2d");

  //   this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
  //   this.gradientStroke.addColorStop(0, '#2CA8FF');
  //   this.gradientStroke.addColorStop(1, this.chartColor);

  //   this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
  //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  //   this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.4));

  //   var a = {
  //     type: "line",
  //     data: {
  //       labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
  //       datasets: [{
  //         label: "Active Countries",
  //         backgroundColor: this.gradientFill,
  //         borderColor: "#fbc658",
  //         pointHoverRadius: 0,
  //         pointRadius: 0,
  //         fill: false,
  //         borderWidth: 3,
  //         data: [80, 78, 86, 96, 83, 85, 76, 75, 88, 90]
  //       }]
  //     },
  //     options: {

  //       legend: {

  //         display: false
  //       },

  //       tooltips: {
  //         enabled: false
  //       },

  //       scales: {
  //         yAxes: [{

  //           ticks: {
  //             fontColor: "#9f9f9f",
  //             beginAtZero: false,
  //             maxTicksLimit: 5,
  //             //padding: 20
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             zeroLineColor: "transparent",
  //             color: 'rgba(255,255,255,0.05)'
  //           }

  //         }],

  //         xAxes: [{
  //           barPercentage: 1.6,
  //           gridLines: {
  //             drawBorder: false,
  //             color: 'rgba(255,255,255,0.1)',
  //             zeroLineColor: "transparent",
  //             display: false,
  //           },
  //           ticks: {
  //             padding: 20,
  //             fontColor: "#9f9f9f"
  //           }
  //         }]
  //       },
  //     }
  //   };

  //   var viewsChart = new Chart(this.ctx, a);



  //   var mapData = {
  //     "AU": 760,
  //     "BR": 550,
  //     "CA": 120,
  //     "DE": 1300,
  //     "FR": 540,
  //     "GB": 690,
  //     "GE": 200,
  //     "IN": 200,
  //     "RO": 600,
  //     "RU": 300,
  //     "US": 2920,
  //   };

  //   $('#worldMap').vectorMap({
  //     map: 'world_mill_en',
  //     backgroundColor: "transparent",
  //     zoomOnScroll: false,
  //     regionStyle: {
  //       initial: {
  //         fill: '#e4e4e4',
  //         "fill-opacity": 0.9,
  //         stroke: 'none',
  //         "stroke-width": 0,
  //         "stroke-opacity": 0
  //       }
  //     },

  //     series: {
  //       regions: [{
  //         values: mapData,
  //         scale: ["#AAAAAA", "#444444"],
  //         normalizeFunction: 'polynomial'
  //       }]
  //     },
  //   });
  // }
  ngDoCheck() {
    // debugger
    if (this.role != 'Student') {
      this.doughnutChartData = [
        [this.studentsList.length, this.reg.length],
        
      ];
    }


  }
  getDashboardStdList() {
    if (this.role != 'Student') {
      this.manageService.getStdList().subscribe((data: any) => {
        this.stdlist = data;
        this.stdlist.forEach(element => {
          this.manageService.getSubjectList(element.id).subscribe((res: any) => {
            element.subjectList = res;

          })
        })
        // this.stdlist.forEach(element => {
        //    
        //   this.registerService.getStudentByStd(element.id).subscribe((res: any) => {
        //     this.studentsList = data;
        //      
        //   })
        // })
      });
    }


  }
  openStd(id) {
    this.router.navigate(['/question/question'], {
      queryParams: {
        val: id
      }
    })
  }
  getStudent() {
    if (this.role == 'Admin') {
      this.registerService.getAllStudentList().subscribe((data: any) => {
        this.studentsList = data;
      });
    }
    else if (this.role == 'Teacher') {
      this.registerService.getAllStudentListForTeacher(localStorage.getItem('UserId')).subscribe((data: any) => {
        this.studentsList = data;
      });
    }
  }
  getTeacher() {
    if (this.role == 'Admin') {
      this.registerService.getTeacherList().subscribe((data: any) => {
        this.reg = data;
      });
    }
    else {
      this.reg = [];
    }

  }
  getSubmittedTest() {
    // this.registerService.getTestByStd(localStorage.getItem("UserId")).subscribe((data: any) => {
    //   this.submitedTest = data;
    //    

    // })
  }
  getSubjectList() {
    this.registerService.getSubjectByID(localStorage.getItem("standardid")).subscribe((data: any) => {
      this.subjects = data;
    });
  }
  closeTest() {
    this.showSubmited = false;
  }
  selectSUBList(id) {
    this.sub = id;
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSub = element.subject;
      }
    });
    this.dispTest = [];
    this.completedtestlist.forEach(element => {
      if (element.subjectId == this.sub) {
        this.dispTest.push(element);

      }
    });
  }

  openSubmittedTest() {
    this.showSubmited = true;
    this.getSubjectList();
  }
  openShowTestList() {
    this.showList = true;
  }


  getTotalTest() {
    this.questionService.getTestList().subscribe((data: any) => {
      this.Test = data;
    });
  }
  openTeacher() {
    this.router.navigate(['/register'], {
      queryParams: {
        val: this.Teacher
      }
    })
  }
  openStudent() {
    this.router.navigate(['/register'], {
      queryParams: {
        val: this.Student
      }
    })
  }

  getBanners() {
    this.bannersService.getWebSlider().subscribe((data: any) => {
      this.Banners = data;
      this.Banners.forEach(element => {
        if (element.name == 'Top') {
          this.topban.push(element);
        }
      })

    });
  }
  getStudentTest() {

    let id = localStorage.getItem('UserId');
    this.examService.getActiveStudentTest(id).subscribe((data: any) => {
      this.ActiveTest = data;
      this.ActiveTest.forEach(element => {
        element.stuid = localStorage.getItem('UserId');
        this.registerService.getTotalObtainMarks(element).subscribe((res: any) => {
          if (res.length > 0) {
            element.totalobtainmarks = res[0].totalmarks;
          }
          else {
            element.totalobtainmarks = 'Not Checked';
          }



        });
        if (element.teststatus == 'assigned') {
          this.pendingtestlist.push(element);
        }
        else if (element.teststatus == 'started') {
          this.notattemptedtestlist.push(element);
        }
        else {
          this.completedtestlist.push(element);

        }
      })

    });
  }
  openPendingTest() {
    this.router.navigate(['testportal'], {
      queryParams: {
        val: 'pending'
      }
    });
  }
  openntattemptTest() {
    this.router.navigate(['testportal'], {
      queryParams: {
        val: 'notattempt'
      }
    });
  }
  // getBanners() {
  //   this.bannersService.getWebSlider().subscribe((data: any) => {
  //     this.Banners = data;
  //     this.Banners.forEach(element => {
  //       if (element.name == 'Top') {
  //         this.topban.push(element);
  //       }
  //     })

  //   });
  // }
}
