import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpuSelectComponent } from './inpu-select.component';

describe('InpuSelectComponent', () => {
  let component: InpuSelectComponent;
  let fixture: ComponentFixture<InpuSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpuSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InpuSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
