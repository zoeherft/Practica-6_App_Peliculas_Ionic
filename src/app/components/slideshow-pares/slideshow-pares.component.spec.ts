import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideshowParesComponent } from './slideshow-pares.component';

describe('SlideshowParesComponent', () => {
  let component: SlideshowParesComponent;
  let fixture: ComponentFixture<SlideshowParesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideshowParesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideshowParesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
