import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  isshow = false;
  iconTrash = faTrashAlt;
  move: any = '';  //move this item from one list to other using Drag&Drop
  timeH = 0;
  timeM = 0;
  timeS = 0;
  changed = false;
  task: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getTodo();
  }
  getTodo() {
    this.api.todoListService().subscribe((res) => {
      this.task = res.body;
      if (this.changed == false) this.countTime();
    });
  }
  countTime() {
    for (let i = 0; i < this.task.length; i++) {
      let time = this.task[i].time.split(":");
      this.timeH += Number(time[0]);
      if (this.timeM + Number(time[1]) >= 60) {
        this.timeH++;
        this.timeM += time[1] - 60;
      } else {
        this.timeM += Number(time[1]);
      }
      if (this.timeS + Number(time[2]) >= 60) {
        this.timeM++;
        this.timeS += time[2] - 60;
      } else {
        this.timeS += Number(time[2]);
      }
    }
  }

  insertTask = new FormGroup({
    task: new FormControl('', [Validators.required]),
    hour: new FormControl('', [Validators.required, Validators.max(24)]),
    minute: new FormControl('', [Validators.required, Validators.max(59)]),
    second: new FormControl('', [Validators.required, Validators.max(59)]),
  })
  get f() {
    return this.insertTask.controls;
  }

  findtask(val: any) {
    return this.task.filter((p: { type: any; }) => p.type == val);
  }
  add() {
    let form = this.insertTask.value;
    let data: any = localStorage.getItem('login');

    this.api.todoAddService({
      "data": {
        "lid": -1,
        "uid": Number(JSON.parse(data).uid),
        "task": form.task,
        "type": "todo",
        "time": form.hour + ":" + form.minute + ":" + form.second
      },
      "authentication":JSON.parse(data).authentication
    });

    //Change Total Time
    this.timeH += Number(form.hour);
    if (this.timeM + Number(form.minute) >= 60) {
      this.timeM += Number(form.minute) - 60;
      this.timeH++;
    } else this.timeM += Number(form.minute);
    if (this.timeS + Number(form.second) >= 60) {
      this.timeS += Number(form.second) - 60;
      this.timeM++;
    } else this.timeS += Number(form.second);

    this.changed = true;
    this.insertTask.reset();
    this.getTodo();
  }
  delete(item: any) {
    this.changed = true;
    this.api.todoDeleteService(item.lid).subscribe((res) => {
      console.log(res.body);
      this.getTodo();
    });

    //Change Total Time
    let part = item.time.split(":");
    this.timeH = this.timeH - Number(part[0]);
    if (this.timeM - Number(part[1]) < 0) {
      this.timeH--;
      this.timeM = this.timeM - part[1] + 60;
    } else {
      this.timeM = this.timeM - Number(part[1]);
    }
    if (this.timeS - Number(part[2]) < 0) {
      this.timeM--;
      this.timeS = this.timeS - part[2] + 60;
    } else {
      this.timeS = this.timeS - Number(part[2]);
    }

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      this.move = event.previousContainer.data[event.previousIndex];
      if (event.container.id === 'cdk-drop-list-0') this.move.type = 'todo';
      else if (event.container.id === 'cdk-drop-list-1') this.move.type = 'run';
      else if (event.container.id === 'cdk-drop-list-2') this.move.type = 'done';

      this.api.todoTypeSwipService(this.move);
    }
  }

}