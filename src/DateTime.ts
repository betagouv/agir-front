export interface DateTime {
  now(): Date;
  from(date: string): Date;
}

export class DateTimeTypeScript implements DateTime {
  from(date: string): Date {
    return new Date(date);
  }

  now(): Date {
    return new Date();
  }
}
