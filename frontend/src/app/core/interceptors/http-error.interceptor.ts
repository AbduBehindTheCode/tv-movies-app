import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { configGlobal } from '../../../config/config.global';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private _snackBar = inject(MatSnackBar);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.getCustomizedErrorMsg(error);
        this._snackBar.open(errorMsg, 'Close', {
          duration: configGlobal.errorMessageDuration * 1000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        return throwError(() => error);
      })
    );
  }

  private getCustomizedErrorMsg(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return 'Bad Request';
      }
      case 401: {
        return 'Unauthorized';
      }
      case 404: {
        return 'Not Found';
      }
      case 500: {
        return 'Internal Server Error';
      }
      default: {
        return 'Unknown Server Error';
      }
    }
  }
}
