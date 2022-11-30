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

// takes in array that has all the events where eventsArray[0] is the start time and eventsArray[1] is the end time
// returns an array of same format called busyEvents
export function findBusyTimes(startArrays, endArrays) {
  let eventsArray = mergeArrays(startArrays, endArrays);

  // change to sort using timestamp object compare function
  eventsArray = eventsArray.sort((a, b) => {
    return a._comparedTo(b);
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
  for (let i = 0; i < eventsArray.length; i++) {
    eventsArray[i][0] = eventsArray[i][0].toDate();
    eventsArray[i][1] = eventsArray[i][1].toDate();
  }
  return eventsArray;
}
