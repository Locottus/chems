import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPedidoComponent } from './mostrar-pedido.component';

describe('MostrarPedidoComponent', () => {
  let component: MostrarPedidoComponent;
  let fixture: ComponentFixture<MostrarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
