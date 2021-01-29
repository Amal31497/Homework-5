$(document).ready(function(){
    var now = dayjs().format('dddd, MMMM-D');
    $("#currentDay").text(now);
    var currentHrs = dayjs().format('HH');
    
  var selectedButton;
    // Conditionally format each input area based on current time.
    $.each($(".time-block"), function(){
        selectedButton = $(this).find(".saveBtn");
        var selectedField = $(this).find("textarea");
        var selection = selectedField.attr("data-hour")
        if( selection < currentHrs ){
            selectedField.addClass("past");
        } else if( selection > currentHrs ){
            selectedField.addClass("future");
        } else {
            selectedField.addClass("present");
        }
    });
    // ...
      /* Event handler for each "Save" button. Performes localstorage get and 
         set items to display input even after refreshing the page */
    $(".saveBtn").on('click', function(){
      var dataH = $(this).attr("data-hour");
      var scheduledActivity = $(this).parent().find(".textarea").val();
      localStorage.setItem(dataH, JSON.stringify(scheduledActivity))
    });
    // ...

    // Array with all included hours stored in "data-hour" attributes
    var data = [10,11,12,13,14,15,16,17,18]
    // ...

    /* Loop responsible for retrieving the event message from local storage 
    and attach it to the textarea accordingly */
    for( i = 0; i < data.length; i++ ){
      var saveEvent = JSON.parse(localStorage.getItem(data[i]));
      $(".textarea[data-hour="+data[i]+"]").text(saveEvent);
    }
    // ...
});