import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartNavbarComponent } from './cart-navbar.component';

describe('CartNavbarComponent', () => {
  let component: CartNavbarComponent;
  let fixture: ComponentFixture<CartNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
