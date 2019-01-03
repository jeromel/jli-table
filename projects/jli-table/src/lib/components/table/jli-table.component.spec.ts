import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JliTableComponent } from './jli-table.component';

describe('JliTableComponent', () => {
  let component: JliTableComponent;
  let fixture: ComponentFixture<JliTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JliTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JliTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
