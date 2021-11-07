import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupinfoPage } from './groupinfo.page';

describe('GroupinfoPage', () => {
  let component: GroupinfoPage;
  let fixture: ComponentFixture<GroupinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
