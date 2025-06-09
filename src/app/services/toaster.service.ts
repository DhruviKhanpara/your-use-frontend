import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastrService: ToastrService) { }
  
  showSuccess(message: any, title: any) {
    this.toastrService.success(message, title, {
      positionClass: 'toast-bottom-right',
      closeButton: true,
      tapToDismiss: false,
    });
  }

  showError(message: any, title: any) {
    this.toastrService.error(message, title, {
      positionClass: 'toast-bottom-right',
      closeButton: true,
      tapToDismiss: false,
    });
  }

  showInfo(message: any, title: any) {
    this.toastrService.info(message, title, {
      positionClass: 'toast-bottom-right',
      closeButton: true,
      tapToDismiss: false,
    });
  }

  showWarning(message: any, title: any) {
    this.toastrService.warning(message, title, {
      positionClass: 'toast-bottom-right',
      closeButton: true,
      tapToDismiss: false,
    });
  }

}
