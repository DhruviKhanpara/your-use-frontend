import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as ApexCharts from 'apexcharts';
import { ApiService } from 'src/app/services/api.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budgeting',
  templateUrl: './budgeting.component.html',
  styleUrls: ['./budgeting.component.css']
})
export class BudgetingComponent implements OnInit {

  iconTrash = faTrashAlt;
  earning = 0;
  saveing = 0;
  expenses = 0;
  invesment = 0;
  changedata = false;
  show = false;
  data: any = localStorage.getItem('login');
  chart1: ApexCharts | undefined;
  chart2: ApexCharts | undefined;

  constructor(private api: ApiService) { }

  listData: any = [];

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.api.earningService().subscribe((res) => {
      this.earning = Number(res.body);
    })
    this.api.expensesListService().subscribe((res) => {
      this.listData = res.body;
      if(this.changedata == false) this.calculate();
      else if(this.changedata == true) this.changedata=false;
    });
  }

  insertSpend = new FormGroup({
    title: new FormControl('', [Validators.required]),
    money: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required])
  });
  get f() {
    return this.insertSpend.controls;
  }

  calculate() {
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i].area == 'invesment') this.invesment += this.listData[i].money;
      else if (this.listData[i].area == 'expenses') this.expenses += this.listData[i].money;
      else if (this.listData[i].area == 'save') this.saveing += this.listData[i].money;
    }
    this.graph1();
  }
  graph1() {
    let options1 = {
      series: [this.saveing, this.expenses, this.invesment],
      chart: {
        type: 'donut',
      },
      labels: ['Saving', 'Expenses', 'Invesment'],
      colors: ['#328bff', '#6d6d6d', '#00346e'],
      legend: {
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%',
          }
        }
      }
    }
    let options2 = {
      series: [(this.expenses + this.saveing + this.invesment) * 100 / this.earning],
      chart: {
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val.toString(), 10).toString() + '%';
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["You Used"]
    };

    this.chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    this.chart1.render();
    this.chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    this.chart2.render();
  }
  add() {
    this.changedata = true;
    let form = this.insertSpend.value;

    if (this.expenses + this.saveing + this.invesment + Number(form.money) <= this.earning) {
      this.api.expenseAddService({
        "data": {
          "lid": -1,
          "uid": Number(JSON.parse(this.data).uid),
          "title": form.title,
          "area": form.area,
          "money": Number(form.money)
        },
        "authentication":JSON.parse(this.data).authentication
      });

      if (form.area == 'invesment') this.invesment += Number(form.money);
      else if (form.area == 'save') this.saveing += Number(form.money);
      else if (form.area == 'expenses') this.expenses += Number(form.money);

      this.getData();
      this.chart1?.updateSeries([this.saveing, this.expenses, this.invesment]);
      this.chart2?.updateSeries([(this.expenses + this.saveing + this.invesment) * 100 / this.earning]);

    } else {
      alert("You have no sufficient monye for use..");
    }
    this.insertSpend.reset();
  }
  showTog() {
    this.show = !this.show;
  }
  delete(item: any) {
    this.changedata = true;
    this.api.expensesDeleteService(item.lid).subscribe((res) => {
      console.log(res.body);
      this.getData();
    });
    
    if (item.area == 'invesment') this.invesment -= Number(item.money);
    else if (item.area == 'save') this.saveing -= Number(item.money);
    else if (item.area == 'expenses') this.expenses -= Number(item.money);

    this.chart1?.updateSeries([this.saveing, this.expenses, this.invesment]);
    this.chart2?.updateSeries([(this.expenses + this.saveing + this.invesment) * 100 / this.earning]);
    
  }
  changeEarn(val: any) {
    if (Number(val.value) != this.earning)
      this.api.changeEarnService({ "uid": JSON.parse(this.data).uid, "earn": Number(val.value), "authentication": JSON.parse(this.data).authentication });
  }
  ngOnDestroy():void{
    this.chart1?.destroy();
    this.chart2?.destroy();
  }

}