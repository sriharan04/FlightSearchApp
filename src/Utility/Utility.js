export const availableflight = (state, origin, destination, date) => {
  let non_stop = state.filter((el) => {
    return el.origin === origin && el.destination === destination;
  });
  let ouput = [];
  for (let i = 0; i < non_stop.length; i++) {
    let arrdate1 = non_stop[i].date.split("/");
    let date1 = new Date(
      parseInt(arrdate1[0]),
      parseInt(arrdate1[1]) - 1,
      parseInt(arrdate1[2])
    );
    if (date - date1 === 0) {
      ouput.push(non_stop[i]);
    }
  }
  return ouput;
};

export const connectflight = (state, origin, destination, date) => {
  let output1 = state.filter((el) => {
    return el.origin === origin;
  });
  let first_stop = [];
  for (let i = 0; i < output1.length; i++) {
    let arrdate11 = output1[i].date.split("/");
    let date1 = new Date(arrdate11[0], arrdate11[1] - 1, arrdate11[2]);
    if (date - date1 === 0) {
      first_stop.push(output1[i]);
    }
  }
  let output2 = state.filter((el) => {
    return el.destination === destination;
  });
  let second_stop = [];
  for (let i = 0; i < output2.length; i++) {
    let arrdate12 = output2[i].date.split("/");
    let date1 = new Date(arrdate12[0], arrdate12[1] - 1, arrdate12[2]);
    if (date - date1 === 0) {
      second_stop.push(output2[i]);
    }
  }
  let finaloutarriv = [];
  for (let i = 0; i < first_stop.length; i++) {
    for (let j = 0; j < second_stop.length; j++) {
      if (first_stop[i].destination === second_stop[j].origin) {
        let arrtime = parseInt(first_stop[i].arrivalTime);
        let departime = parseInt(second_stop[j].departureTime);

        if (arrtime < departime) {
          if (departime - arrtime > 0) {
            const altObj = Object.fromEntries(
              Object.entries(first_stop[i]).map(([key, value]) => [
                `x_${key}`,
                value,
              ])
            );
            let arrdate1 = first_stop[i].date.split("/");
            let arrdate2 = second_stop[j].date.split("/");
            let date2 = new Date(arrdate1[0], arrdate1[1] - 1, arrdate1[2]);
            let date1 = new Date(arrdate2[0], arrdate2[1] - 1, arrdate2[2]);
            if (date2 - date1 === 0)
              finaloutarriv.push(Object.assign({}, altObj, second_stop[j]));
          }
        }
      }
    }
  }

  return finaloutarriv;
};

export const time = (dep, arr) => {
  let depar = dep.split(":");
  let arriv = arr.split(":");
  let depart = depar[0] + depar[1];
  let arrival = arriv[0] + arriv[1];
  let final = (arrival - depart).toString();
  let splitted = final.split("");
  if (parseInt(splitted[1] + splitted[2]) > 60) {
    splitted[0] = parseInt(splitted[0]) + 1;
    splitted[1] = parseInt(splitted[1]) - 6;
  }
  return splitted;
};
