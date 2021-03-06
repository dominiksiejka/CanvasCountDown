const countDown = () => {
  const liCounts = [...document.querySelectorAll(".count")];
  const newDate = new Date(2021, 11, 10).getTime();
  let changeMinutes;

  const handleCheckCalculations = (calculations) => {
    for (let itm in calculations) {
      calculations[itm] < 10
        ? (calculations[itm] = `0${calculations[itm]}`)
        : itm;
    }

    return calculations;
  };

  const calculateDate = () => {
    const currentDate = new Date().getTime();
    const timeDifference = newDate - currentDate;

    const seconds = Math.floor(timeDifference / 1000);
    let daysLeft = Math.floor(seconds / (3600 * 24));
    let hoursLeft = Math.floor((seconds - daysLeft * (3600 * 24)) / 3600);
    let minutesLeft = Math.floor(
      (seconds - daysLeft * (3600 * 24) - hoursLeft * 3600) / 60
    );

    let secondsLeft = Math.floor(
      seconds - daysLeft * (3600 * 24) - hoursLeft * 3600 - minutesLeft * 60
    );

    const calculations = {
      daysLeft,
      hoursLeft,
      minutesLeft,
      secondsLeft,
    };
    const checkFunction = handleCheckCalculations(calculations);

    return checkFunction;
  };

  const setCounter = () => {
    const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = calculateDate();
    liCounts.forEach((item) => {
      switch (item.id) {
        case "days":
          return (item.textContent = daysLeft);
        case "hours":
          return (item.textContent = hoursLeft);
        case "minutes":
          if (changeMinutes !== minutesLeft) {
            changeMinutes = minutesLeft;
            item.classList.add("change");
          } else {
            item.classList.remove("change");
          }
          return (item.textContent = minutesLeft);
        case "seconds":
          return (item.textContent = secondsLeft);
        default:
          return;
      }
    });
  };

  setInterval(setCounter, 1000);

  const helperFunction = (e, firstclass, secondclass) => {
    if (e.target.classList.contains(firstclass)) {
      e.target.classList.toggle(secondclass);
    }
  };
  const handleMouseOver = (e) => {
    helperFunction(e, "noactive", "active");
  };
};
countDown();
