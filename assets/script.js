$(document).ready(function () {
  // Display current date and time
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Function to update time blocks
  function updateBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    var hourId = $(this).closest(".time-block").attr("id");
    var description = $(this).siblings(".description").val();
    localStorage.setItem(hourId, description);
  });

  // Load saved data from localStorage
  function loadSavedData() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id").split("-")[1];
      var savedData = localStorage.getItem(hour);

      if (savedData) {
        $(this).find(".description").val(savedData);
      }
    });
  }

  // Call the function to load saved data
  loadSavedData();

  // Call the function to update time blocks
  updateBlocks();

  // Update time blocks every minute
  setInterval(updateBlocks, 60000);
});


