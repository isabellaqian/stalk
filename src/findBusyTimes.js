// for merging the start and end arrays into one 2D array
function mergeArrays(startArrays, endArrays) {
    const startTimes = []
    const endTimes = []
    for(let i = 0; i < startArrays.length; i++){
      startTimes = startTimes.concat(startArrays[i])
      endTimes = endTimes.concat(endArrays[i])
      // pushing might be more efficient? idk
    }
    return(startTimes, endTimes)
  } 

// takes in array that has all the events where eventsArray[0] is the start time and eventsArray[1] is the end time
// returns an array of same format called busyEvents
function findBusyTimes(eventsArray) {
    // should call mergeArrays --> TODO
    eventsArray = eventsArray.sort((a, b) => a[0] - b[0]); // change to object compare function + add sorting so that it sorts the start times and end times when two start times are equalsorting so that it sorts the start times and end times when two start times are equal
    console.table(eventsArray)
    const eventsVisited = new Array(eventsArray.length); // all undefined
    busyEvents = [] 
    for(let i = 0; i < eventsArray.length; i++){
      // if at last event, check that didn't already visit --> add to busyEvents
      if(i === eventsArray.length - 1){ // at last event
        if(eventsVisited[i] === undefined){ // not visited
          busyEvents.push(eventsArray[i]);
        }
      } 
      // check that next item isn't last item:
      else if (eventsVisited[i] === undefined) { // not at last event and not an already visited index
        // if no overlap
        if (eventsArray[i+1][0] > eventsArray[i][1]){ 
          busyEvents.push([eventsArray[i][0], eventsArray[i][1]])
          eventsVisited[i] = 1;
        }
        // if one inside other
        else if (eventsArray[i+1][0] > eventsArray[i][0] && eventsArray[i][1] > eventsArray[i+1][1]){
          // loop until end times > i end time
          for(let j = i; j < eventsArray.length; j++){
            if(eventsArray[j][1] <= eventsArray[i][1]){ // if end time of j <= end time of i add
              // mark index as visited (to not check again because will not add)
              eventsVisited[j] = 1;
            }
          }
          busyEvents.push(eventsArray[i])
          eventsVisited[i] = 1;
        }
        // if partial overlap
        else if (eventsArray[i+1][0] >= eventsArray[i][0] && eventsArray[i+1][1] >= eventsArray[i][1]){
          // loop until end times > i end time
          let latestEnd = 0; // keep track of greatest end time
          for(let j = i; j < eventsArray.length; j++){
            if(eventsArray[j][0] <= eventsArray[i][1]){ // if end time of j <= end time of i add
              if(eventsArray[j][1] > latestEnd){
                latestEnd = eventsArray[j][1]; 
              }
              // mark index as visited (to not check again because will not add)
              eventsVisited[j] = 1;
            }
          }
          busyEvents.push([eventsArray[i][0], latestEnd])
        }
      }
    }
    return(busyEvents);
  }