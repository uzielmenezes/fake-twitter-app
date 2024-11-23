import {TestBed} from '@angular/core/testing';
import {MessageService} from 'primeng/api';
import {ToastService} from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add', 'clear']);

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        {provide: MessageService, useValue: spy}
      ]
    });
    service = TestBed.inject(ToastService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call add method of MessageService when showMessage is called', () => {
    const message = {severity: 'info', summary: 'Test', detail: 'This is a test'};
    service.showMessage(message);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(message);
  });

  it('should call clear method of MessageService when clearMessage is called', () => {
    service.clearMessage();
    expect(messageServiceSpy.clear).toHaveBeenCalled();
  });
});
