import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockedlistPage } from './blockedlist.page';

describe('BlockedlistPage', () => {
  let component: BlockedlistPage;
  let fixture: ComponentFixture<BlockedlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockedlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
