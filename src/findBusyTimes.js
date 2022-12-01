// for merging the start and end arrays into one 2D array
export function mergeArrays(startArrays, endArrays) {
  console.log("startArrays", startArrays);
  console.log("endArrays", endArrays);
  
  let startTimes = [];
  let endTimes = [];
  const mergedArray = [];
  for (let i = 0; i < startArrays.length; i++) {
    startTimes = startTimes.concat(startArrays[i]);
    endTimes = endTimes.concat(endArrays[i]);
  }
  console.log("startTimes merged into one array", startTimes);
  console.log("endTimes merged into one array", endTimes);
  for (let j = 0; j < startTimes.length; j++) {
    mergedArray[j] = [startTimes[j],endTimes[j]];
  }
  console.log("merged 2D array with start and end times at [0] and [1]", mergedArray);
  return mergedArray;
}


export function findBusyTimes(startArrays, endArrays, startTimestamp, endTimestamp) {
   
  let eventsArray = mergeArrays(startArrays, endArrays);
  
  // change to sort using timestamp object compare function
  eventsArray = eventsArray.sort((a, b) => {
    if(a[0] < b[0]){
      return(-1)
    }
    else if(a[0] > b[0]){
      return(1)
    }
    else {
      return(0)
    }
    });

  let index = 0;
  for (let i = 1; i < eventsArray.length; i++) {
    if (eventsArray[index][1] >= eventsArray[i][0]) {
      // eventsArray[index][1] = Math.max(eventsArray[index][1], eventsArray[i][1]);
      if (eventsArray[index][1] >= eventsArray[i][1]) {
        eventsArray[index][1] = eventsArray[index][1];
      } else {
        eventsArray[index][1] = eventsArray[i][1];
      }
    } else {
      index++;
      eventsArray[index] = eventsArray[i];
    }
  }

  
  let busyEvents = []
  if (index > 0) {
    // check if the end time passes the given end timestamp for the period
    if (eventsArray[0][0] < startTimestamp) {
      // assumes that can just compare with comparison operators
      eventsArray[0][0] = startTimestamp;
    }
    // check if the end time passes the given end timestamp for the period
    if (eventsArray[index][1] > endTimestamp) {
      // assumes that can just compare with comparison operators
      eventsArray[index][1] = endTimestamp;
    }
    
    for (let i = 0; i < index; i++) {
      busyEvents[i] = {
        start: eventsArray[i][0].toDate(),
        end: eventsArray[i][1].toDate(),
        title: "Busy",
      }
    }
  }
  console.log(busyEvents)
  return(busyEvents);
}
