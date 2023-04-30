/* Your Code Here */


function createEmployeeRecord(employeeData){
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(function (data1) {
    return createEmployeeRecord(data1)
  })
  }
  
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date, 
    })
    return this;
  }
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date, 
    })
    return this;
  }

  function hoursWorkedOnDate(dateOnForm) {
    let inEvent = this.timeInEvents.find(function(e) {
      return e.date === dateOnForm
    })

    let outEvent = this.timeOutEvents.find(function(e) {
      return e.date === dateOnForm
    })
    return (outEvent.hour - inEvent.hour) / 100
  }


  function wagesEarnedOnDate(dateOnForm) {
    let earnedWage = hoursWorkedOnDate.call(this,dateOnForm) * this.payPerHour
    return parseFloat(earnedWage.toString()) //check later
  }

//check this again
/*
  function allWagesFor() {
    let recordedDates = this.timeInEvents.map(function(e) {
      wagesEarnedOnDate.call(this, e.date);//return e.date
    
    })
    let paytoReceive = recordedDates.reduce(function(total, wage) {
      return total + wage;
    }, 0)
    return paytoReceive;
  }
*/
  function findEmployeeByFirstName(employeeData, firstName) {
    return employeeData.find(function(rec) {
      return rec.firstName === firstName
    })
  }

  function calculatePayroll(employeeRecords) {
    const totalForEachEmployee = employeeRecords.map(record => allWagesFor.call(record))
    return totalForEachEmployee.reduce((total, empTotal) => total + empTotal)
    // return employeeRecords.reduce(function(memo, rec) {
    //   return memo + allWagesFor(rec)
    // }, 0)
  }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}



