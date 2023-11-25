function convertDateFormat(inputDate) {
    // Parse the input date
    const dateObject = new Date(inputDate);

    // Check if the date is valid
    if (isNaN(dateObject.getTime())) {
        return "Invalid date format. Please enter a valid date.";
    }

    // Format the date as YYYY:MM:DD
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because months are zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}:${month}:${day}`;
}

module.exports = convertDateFormat
