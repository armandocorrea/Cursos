import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribePocComponent } from './unsubscribe-poc.component';

describe('UnsubscribePocComponent', () => {
  let component: UnsubscribePocComponent;
  let fixture: ComponentFixture<UnsubscribePocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsubscribePocComponent]
    });
    fixture = TestBed.createComponent(UnsubscribePocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
