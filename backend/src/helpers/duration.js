function compute_duration_between_dates(start_date, stop_date) {
  const HOUR_IN_MILLISECONDS = 3600000;
  const MINUTE_IN_MILLISECONDS = 60000;
  const SECOND_IN_MILLISECONDS = 1000;

  let duration = new Date(stop_date).getTime() - new Date(start_date).getTime();

  const hours = Math.floor(duration / HOUR_IN_MILLISECONDS);
  duration -= HOUR_IN_MILLISECONDS * hours;

  const minutes = Math.floor(duration / MINUTE_IN_MILLISECONDS);
  duration -= MINUTE_IN_MILLISECONDS * minutes;

  const seconds = Math.floor(duration / SECOND_IN_MILLISECONDS);
  duration -= SECOND_IN_MILLISECONDS * seconds;

  const duration_string = `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

  return { hours, minutes, seconds, duration_string };
}

module.exports = compute_duration_between_dates;
