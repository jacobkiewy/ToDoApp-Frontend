export class DateHelper {
  dateHelper(apiDate: Date) {
    let nDate;
    let year = new Date(apiDate).getFullYear();
    let month = new Date(apiDate).getMonth() + 1;
    let day = new Date(apiDate).getDate();
    for (let i = 0; i < [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].length; i++) {
      if (month === i) {
        return (nDate = year + '-0' + month + '-' + day);
      }
      if (month >= 10) {
        return (nDate = year + '-' + month + '-' + day);
      }
    }
    return;
  }
}
