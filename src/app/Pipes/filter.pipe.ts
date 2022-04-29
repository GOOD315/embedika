import { Pipe, PipeTransform } from '@angular/core';
import { AnimeType, MediaFormat } from '../elements-table.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: any, propName: string, filterType: string): unknown {
    switch (filterType) {
      case 'name': {
        return this.FilterByName(value, filterString, propName);
      }
      case 'type': {
        return this.FilterByType(value, filterString, propName);
      }
      case 'format': {
        return this.FilterByFormat(value, filterString, propName);
      }
    }
    return value;
  }

  FilterByName(data: any[], filterString: string, propName: string): any[] {
    const resultArr = [];
    if (data.length == 0 || filterString == '' || propName == '') return data;

    // если есть вложенность элементов
    let propArr = propName.split('.');

    for (const item of data) {
      if (propArr.length != 0) {
        let elem = item;
        for (let i = 0; i < propArr.length; i++) {
          elem = this.getElement(elem, propArr[i]);
        }

        if (elem.toLowerCase().lastIndexOf(filterString) != -1) { resultArr.push(item) };
      } else {
        if (item[propName].toLowerCase().lastIndexOf(filterString) != -1) { resultArr.push(item) };
      }
    }

    return resultArr;
  }

  FilterByType(value: any[], type: AnimeType, propName: string) {
    const resultArr = [];
    if (value.length == 0 || type==AnimeType.unknown || propName == '') return value;

    for (const item of value) {
      {
        if (item[propName]==type) { resultArr.push(item) };
      }
    }

    return resultArr;
  }

  FilterByFormat(value: any[], formats: MediaFormat[], propName: string) {
    const resultArr = [];
    if (value.length == 0 || formats.length == 0 || propName == '') return value;

    for (const item of value) {
      {
        for (const format of formats) {
          if (item[propName] == format) { resultArr.push(item) };
        }
      }
    }

    return resultArr;
  }

  // самописная штука которая позволяет добраться до элемента в массиве в независимости от его вложенности(item.title.english...)
  // но я не уверен насколько это быстро и оптимизированно
  getElement(object: any, propName: string) {
    return object[propName];
  }

}
