$(function () {
  var operation = "C";
  var selected_index = -1; 
  var tblPersons = localStorage.getItem("tblPersons"); 
  tblPersons = JSON.parse(tblPersons); 
  if (tblPersons === null) 
      tblPersons = [];

  function Create() {
    var person = JSON.stringify({
      Number: $("#numb").val(),
      Date: $("#invDate").val(),
      Dates: $("#splDate").val(),
      Comment: $("#signature").val()
    }); 
    tblPersons.push(person);
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    return true;
  }

  function Edit() {
    tblPersons[selected_index] = JSON.stringify({
        Number: $("#numb").val(),
        Date: $("#invDate").val(),
        Dates: $("#splDate").val(),
        Comment: $("#signature").val()
    });
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    return true;
  }

  function Delete() {
    tblPersons.splice(selected_index, 1); 
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));  
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Create</th>" +
            "<th>No</th>" +
            "<th>Supply</th>" +
            "<th>Comment</th>" +
            "<th>Action</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); 
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Number + "</td>" +
                "<td>" + per.Date + "</td>" +
                "<td>" + per.Dates + "</td>" +
                "<td>" + per.Comment + "</td>" +                    
                "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } 
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  }); 
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; 
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#numb").val(per.Number);
    $("#invDate").val(per.Date);
    $("#splDate").val(per.Dates);
    $("#signature").val(per.Comment);
    $("#numb").attr("readonly", "readonly");
    $("#invDate").focus();
  });

  $(".btnDelete").bind("click", function () {
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); 
    List(); 
  });
});

