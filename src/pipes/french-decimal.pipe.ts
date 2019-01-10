import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  name: 'decimalfr' })
export class FrenchDecimalPipe implements PipeTransform {
  transform(val: number): string {
    let ret: string;
    if (undefined != val && null != val) {
      ret = val.toLocaleString('fr-FR', { style: 'decimal' }).replace(',', '.');
    } else {
      ret = '';
    }

    return ret;
  }
}
