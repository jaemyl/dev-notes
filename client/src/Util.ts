class Util {
  public static dateString(date:Date) {
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()
    console.log('dateString() hour:' + date.getHours())
    const datestr = `${y}-${m < 9 ? '0' : ''}${m+1}-${d <= 9 ? '0' : ''}${d}`
    return datestr
  }

  public static getDate():string {
    const today:Date = new Date()
    return Util.dateString(today)
  }

  // @datestr: in local time
  // return next date in local time
  public static getNextDate(datestr: string):string {
    const date = new Date(datestr)

    // add 25 hours instead of 24 to deal with Nov 4 -> Nov 5 problem,
    // on the date summer time ends
    const nextDate = new Date(
      date.getTime() + 25 * 60 * 60 * 1000 + date.getTimezoneOffset() * 60 * 1000)
    return Util.dateString(nextDate)
  }

  public static getPrevDate(datestr: string):string {
    const date = new Date(datestr)

    const nextDate = new Date(
      date.getTime() - 24 * 60 * 60 * 1000 + date.getTimezoneOffset() * 60 * 1000)
    return Util.dateString(nextDate)
  }

  // return a prompt which is unique in the given month
  public static getPrompt(journals:{}, ps:string[], datestr:string) {
    const yearmonth = datestr.substr(0, 7)
    const journalsInTheMonth = Object.keys(journals).filter(date => {
      return date.startsWith(yearmonth)
    }).map(date => journals[date])

    const promptsCopy  = Array.from(ps)
    journalsInTheMonth.forEach(journal => {
      const index = promptsCopy.indexOf(journal.prompt)
      if(index !== -1) {
        promptsCopy.splice(index, 1)
      }
    })

    return promptsCopy.length > 0 ? promptsCopy[Math.floor(Math.random() * promptsCopy.length)] : 'ERROR!!!'
  }
}

export default  Util;
