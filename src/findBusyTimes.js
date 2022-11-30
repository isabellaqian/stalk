// for merging the start and end arrays into one 2D array
export function mergeArrays(startArrays, endArrays) {
  let startTimes = [];
  let endTimes = [];
  const mergedArray = [];
  for (let i = 0; i < startArrays.length; i++) {
    startTimes = startTimes.concat(startArrays[i]);
    endTimes = endTimes.concat(endArrays[i]);
  }
  for (let j = 0; j < startTimes.length; j++) {
    mergedArray[j][0] = startTimes[j];
    mergedArray[j][1] = endTimes[j];
  }
  return mergedArray;
}


export function findBusyTimes(startArrays, endArrays, startTimestamp, endTimestamp) {
   /*
  let eventsArray = mergeArrays(startArrays, endArrays);

  // change to sort using timestamp object compare function
  eventsArray = eventsArray.sort((a, b) => {
    //temporary, code works without
   
    return(a._comparedTo(b))
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

  if (eventsArray.length > 0) {
    // check if the end time passes the given end timestamp for the period
    if (eventsArray[0][0] < startTimestamp) {
      // assumes that can just compare with comparison operators
      eventsArray[0][0] = startTimestamp;
    }
    // check if the end time passes the given end timestamp for the period
    if (eventsArray[eventsArray.length - 1][1] > endTimestamp) {
      // assumes that can just compare with comparison operators
      eventsArray[eventsArray.length - 1][1] = endTimestamp;
    }
    for (let i = 0; i < eventsArray.length; i++) {
      eventsArray[i][0] = eventsArray[i][0].toDate();
      eventsArray[i][1] = eventsArray[i][1].toDate();
    }
  return(eventsArray);
  */
 return ["Hi, this is temporary, sorry Amy."];
}
