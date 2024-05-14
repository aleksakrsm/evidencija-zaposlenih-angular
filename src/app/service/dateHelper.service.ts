import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHeplerService {
  public getDateFromQueue(birthdayQueue: unknown): Date | null {
    if(!birthdayQueue)
    return null;
    if(birthdayQueue instanceof Date && (birthdayQueue as Date).toUTCString() != "Invalid Date"){
      return (birthdayQueue as Date);
    }
    let queue = birthdayQueue as [
      year: number,
      month: number,
      dayOfMonth: number
    ];
    let dateOfBirth: Date = new Date(
      Date.UTC(queue[0], queue[1] - 1, queue[2])
    );
    return dateOfBirth;
  }
  
  public formatDateToString(date: Date): string {
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  public formatedStringToDate(formattedDate: string): Date | null {
    if(!formattedDate)
    return null;
    // return new Date();
    const parts = formattedDate.split('.');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[0]);
    const convertedDate = new Date(Date.UTC(year, month - 1, day));
    return convertedDate;
  }
  public getFormatedDateStringFromQueue(birthdayQueue: unknown): string {
    if(birthdayQueue instanceof Date){//vrati za invalid date
      return ((birthdayQueue as Date).toUTCString()!=="Invalid Date")? (birthdayQueue as Date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }):"DD.MM.YYY";
    }
    if(!birthdayQueue)
    return "";
    let queue = birthdayQueue as [
      year: number,
      month: number,
      dayOfMonth: number
    ];
    let dateOfBirth: Date = new Date(
      Date.UTC(queue[0], queue[1] - 1, queue[2])
    );
    return dateOfBirth.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
}
