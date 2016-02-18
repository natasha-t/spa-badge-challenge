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

          //add form here with student id
          // createForm(); can't grab student id????

            var title = document.createElement("h3");
            title.innerHTML = "Add a Badge";

            var form = document.createElement('FORM');
            form.id = 'badge-form';
            form.method = 'POST';
            var studentId = student.id;
            form.action = 'http:/localhost:3000/students/' + studentId + '/badges';

            tb = document.createElement('INPUT');
            tb.type='TEXT';
            tb.name='title';
            form.appendChild(tb);

            tb = document.createElement('INPUT');
            tb.type='HIDDEN';
            tb.name='student_id';
            tb.value = student.id
            form.appendChild(tb);


            tb = document.createElement('INPUT');
            tb.type = 'SUBMIT';
            tb.value = 'Submit';
            form.appendChild(tb);

            miniQuery.SweetSelector.select(".add-badge")[0].appendChild(title);

            miniQuery.SweetSelector.select(".add-badge")[0].appendChild(form);



          setNewBadgeListeners();

        })
      };

    miniQuery.EventDispatcher.on(selector, event, eventFunction);
}

function setNewBadgeListeners() {

  var selector = '.add-badge';
  var event = 'submit';

  //get form data given student id
  var form = miniQuery.SweetSelector.select('#badge-form');
  var value;
  var params = '';

  for(var i = 0; i < form.elements.length; i++){
    value = form.elements[i].value;
    params += form.elements[i].name + "=" + encodeURIComponent(value) + "&";
  }

  var action = form.elements.student_id.value;
  console.log(action)
  console.log(params)

  var eventFunction = function(e){
    e.preventDefault();
    console.log('blah')
    miniQuery.AjaxWrapper.request({
      type: 'POST',
      url: 'http://localhost:3000/students/' + action + '/badges',
      data: params
    }).then(function(response){
      console.log(response)
      console.log("hello?")
    })
  }

  miniQuery.EventDispatcher.on(selector, event, eventFunction)


}
