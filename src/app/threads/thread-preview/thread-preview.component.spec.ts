import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ThreadPreviewComponent } from "./thread-preview.component";

describe("ThreadPreviewComponent", () => {
  let component: ThreadPreviewComponent;
  let fixture: ComponentFixture<ThreadPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
