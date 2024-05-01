import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor(private location: Location, private snackBar: MatSnackBar) {}

  valideAllFormField(form: UntypedFormGroup | UntypedFormArray) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        control.markAsTouched({ onlySelf: true });
        this.valideAllFormField(control);
      }
    });
  }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string): string {
    return this.getErrorMessageFormField(
      formGroup.get(fieldName) as UntypedFormControl
    );
  }

  getErrorMessageFormField(field: UntypedFormControl): string {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho mínimo necessário é de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Tamanho máximo necessário é de ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ): string {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    if (!formArray || !formArray.at(index)) {
      return 'Índice de formulário inválido';
    }
    const field = formArray.at(index).get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFormField(field);
  }

  isFormArrayRequired(
    formGroup: UntypedFormGroup,
    formArrayName: string
  ): boolean {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return formArray
      ? !formArray.valid && formArray.hasError('required')
      : false;
  }

  onCancel(): void {
    this.location.back();
  }

  onSucess(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
    });

    this.onCancel();
  }

  onError(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }
}
