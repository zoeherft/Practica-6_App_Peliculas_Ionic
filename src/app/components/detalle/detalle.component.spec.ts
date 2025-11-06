import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { Cast, Credits, PeliculaDetalle } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies';
import { DetalleComponent } from './detalle.component';

class ModalControllerStub {
  dismiss = jasmine.createSpy('dismiss').and.resolveTo();
}

class NavControllerStub {
  navigateRoot = jasmine.createSpy('navigateRoot');
}

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;

  const detalleMock = { id: 1, title: 'Test', overview: 'overview' } as PeliculaDetalle;
  const actoresLista: Cast[] = [
    {
      cast_id: 1,
      character: 'Hero',
      credit_id: 'abc',
      gender: 1,
      id: 100,
      name: 'Actriz Test',
      order: 0,
      profile_path: '/test.jpg',
    },
  ];
  const actoresMock = { cast: actoresLista } as Credits;

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
        { provide: NavController, useClass: NavControllerStub },
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

  it('should assign actores when credits are returned', () => {
    expect(component.actores).toEqual(actoresLista);
  });

  it('should show full overview after verMas', () => {
    expect((component as any).mostrarOverviewCompleto).toBeFalse();
    component.verMas();
    expect((component as any).mostrarOverviewCompleto).toBeTrue();
  });
});


