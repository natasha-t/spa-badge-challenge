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
      liElement.appendChild(a);

      var element = miniQuery.SweetSelector.select('ul')
      element[0].appendChild(liElement);

    }
      setStudentListeners();

  });

  // $(document).on(event, selector, eventFunction)
  // $('a').on('click', eventFunction)

});

function setStudentListeners() {
    var selector = 'a';
    var event = 'click';
    var eventFunction = function(e) {
      e.preventDefault();
      miniQuery.AjaxWrapper.request({
        url: $(this).attr('href'),
        type: 'GET'
        }).then(function(response){
          console.log(response)
        })
      };

    miniQuery.EventDispatcher.on(selector, event, eventFunction);
}

