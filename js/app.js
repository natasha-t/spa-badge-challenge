$(document).ready(function(){


  miniQuery.AjaxWrapper.request({
   url: "http://localhost:3000/students",
   type: 'GET'
  }).then(function(response) {
    var students = JSON.parse(response)
    for(i = 0; i < students.length; i++){
      var liElement = document.createElement('li');
      var a = document.createElement('a')
      a.href = '/students/' + students[i].id
      a.innerHTML = students[i].name
      a.setAttribute('class', 'student-name')
      a.setAttribute("id", students[i].id)
      liElement.appendChild(a);

      var element = miniQuery.SweetSelector.select('ul')
      element[0].appendChild(liElement);

    }
      setStudentListeners();

  });

});

function setStudentListeners() {

    var selector = 'a';
    var event = 'click';
    console.log($(this))
    var eventFunction = function(e) {
      e.preventDefault();
      var id = e.target.getAttribute('id')
      miniQuery.AjaxWrapper.request({
        url: "http://localhost:3000/students/" + id,
        type: 'GET'
        }).then(function(response){
          miniQuery.DOM.hide('.container')
          var student = JSON.parse(response)
          console.log(student.name)
          miniQuery.SweetSelector.select('h2')[0].innerHTML = student.name

          setNewBadgeListeners();

        })
      };

    miniQuery.EventDispatcher.on(selector, event, eventFunction);
}

function setNewBadgeListeners() {

  var selector = 'h3';
  var event = 'click';
  var data = $(this).serialize();
  var eventFunction = function(e){
    e.preventDefault();
    miniQuery.AjaxWrapper.postRequest({
      type: 'POST',
      url: 'http://localhost:3000/students',
      data: data
    }).then(function(response){
      console.log(response)
      console.log("hello?")
    })
  }

  miniQuery.EventDispatcher.on(selector, event, eventFunction)


}

