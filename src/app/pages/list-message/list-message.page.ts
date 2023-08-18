import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.page.html',
  styleUrls: ['./list-message.page.scss'],
})
export class ListMessagePage implements OnInit {
  constructor() {}

  ngOnInit() {}

  handleEdit() {
    console.log('first');
  }

  handleDelete() {}
}
