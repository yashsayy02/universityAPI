function getDayOfWeek(inputDate) {
    // Parse the input date
    const parts = inputDate.split(":");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are zero-based in JavaScript Date objects
    const day = parseInt(parts[2]);

    // Create a Date object
    const dateObject = new Date(year, month, day);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = dateObject.getDay();

    // Define an array of days of the week
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // Output the result
    if (!isNaN(dateObject.getTime())) {
        return `${daysOfWeek[dayOfWeek]}`;
    } else {
        return "";
    }
}

module.exports = getDayOfWeek;
