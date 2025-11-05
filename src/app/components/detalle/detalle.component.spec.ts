import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { Credits, PeliculaDetalle } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies';
import { DetalleComponent } from './detalle.component';

class ModalControllerStub {
  dismiss = jasmine.createSpy('dismiss');
}

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;

  const detalleMock = { id: 1, title: 'Test' } as PeliculaDetalle;
  const actoresMock = { cast: [] } as Credits;

  const moviesServiceStub = jasmine.createSpyObj<MoviesService>('MoviesService', [
    'getPeliculaDetalle',
    'getActoresPelicula',
  ]);
  moviesServiceStub.getPeliculaDetalle.and.returnValue(of(detalleMock));
  moviesServiceStub.getActoresPelicula.and.returnValue(of(actoresMock));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DetalleComponent],
      providers: [
        { provide: ModalController, useClass: ModalControllerStub },
        { provide: MoviesService, useValue: moviesServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    component.id = detalleMock.id;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign pelicula when detail is returned', () => {
    expect(component.pelicula).toEqual(detalleMock);
  });
});
