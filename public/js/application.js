$(document).ready(function() {
//reads coordinates on the canvas
$('#score_container').on('click', '.scorecard', showScore);
$('#score_container').on('click', '.deleteMe', deleteMe);
$('#clearAll').on('click', clearEverything);

  $('#myCanvas').mousemove(function(event){
    var posX = event.pageX - 250
    var posY = -(event.pageY - 250)
    var pageCoords = "( " + posX + ", " + posY + " )";
    $( "#coordReadout" ).text( "( X coordinates, Y coordinates ) : " + pageCoords );
  });
//reads clicks on the canvas, draws impact points on canvas
  $('#myCanvas').on('click',function(event){
    var posX = event.pageX - 250
    var posY = -(event.pageY - 250)
    var drawX = posX + 250
    var drawY = 250 - posY

    var canv = document.getElementById("myCanvas");
    var context = canv.getContext('2d');
    var color = 'green';

    context.beginPath();
    context.arc(drawX,drawY,4,0,2*Math.PI);
    context.strokeStyle = 'white';
    context.fillStyle = 'green';
    context.fill();
    context.stroke();

    afterClick(posX, posY);
  })

  function afterClick(posX, posY) {
    var dist = getDistance(posX, posY);
    var score = getScore(dist);
    $('#shot_points').text(score);

    old_score = parseInt($('#current_score').text());
    if (score === "M") {
      scoreInt = 0;
    } else if (score === "X") {
      scoreInt = 10;
    } else {
      scoreInt = parseInt(score);
    }
    cs = old_score + scoreInt;
    $('#current_score').text(cs);

    old_max = parseInt($('#max_score').text());
    ms = old_max + 10;
    $('#max_score').text(old_max + 10);

    setScoreHtml(cs,ms);
  };

  function getDistance(coordx,coordy) {
    var distance = Math.sqrt(Math.pow(coordx, 2) + Math.pow(coordy, 2));
    return distance;
  };

  function getScore(distance) {
    var score = "";
    if (distance > 250) {
      return score = "M";
    } else if (distance > 225) {
          return score = "1";
    } else if (distance > 200) {
          return score = "2";
    } else if (distance > 177) {
          return score = "3";
    } else if (distance > 153) {
          return score = "4";
    } else if (distance > 128) {
          return score = "5";
    } else if (distance > 103) {
          return score = "6";
    } else if (distance > 77) {
          return score = "7";
    } else if (distance > 53) {
          return score = "8";
    } else if (distance > 26) {
          return score = "9";
    } else if (distance > 15) {
          return score = "10";
    } else {
          return score = "X";
    }
  };

  function setScoreHtml(c_score, m_score) {
    $( "input[name='current_score']" ).attr('value',c_score);
    $( "input[name='max_score']" ).attr('value',m_score);
  };

  function clearEverything(e) {
  e.preventDefault();
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  $('#shot_points').text(0);
  $('#current_score').text(0);
  $('#max_score').text(0);
  }
//ajax
function showScore(e) {
  e.preventDefault();
  session_id = $(e.target).attr('id');
  self = $(e.target);
var showAjax = $.ajax({
    url: '/sessions',
    type: 'post',
    data: {id: session_id}
  })
  .done(function(response) {
    self.text('STATS:');
    self.css('height', '114px');
    self.css('width', '300px');
    self.append('<div class="card"><ul><li>Target: '+response.target_size+' cm</li><li>Distance: '+response.distance+' m</li><li>Score: '+response.total_score+' / '+response.max_score+'</li></ul></div>');
  })
  .fail(function(event) {
    console.log('You FAILED!!!');
  })
}

function deleteMe(e) {
  e.preventDefault();
  session_id = $(e.target).attr('id');
  self = $(e.target);
var delAjax = $.ajax({
    url: '/sessions/del',
    type: 'delete',
    data: {id: session_id}
  })
  .done(function(response) {
    $('#sc' + response).remove();
    $('#h3' + response).remove();
    self.remove();
  })
  .fail(function(event) {
    console.log('You FAILED!!!');
  })
}


});
