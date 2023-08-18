import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMessagePage } from './list-message.page';

describe('ListMessagePage', () => {
  let component: ListMessagePage;
  let fixture: ComponentFixture<ListMessagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
