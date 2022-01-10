class Quiz {
  constructor(){
    this.encabezado = createElement("h2");
  
  }
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }



  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
    question.hide();
    background("green");
    
    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
    this.encabezado.html("Resultado del cuestionario " );
    this.encabezado.position(150, 100);
    

    //llama aquí a getContestantInfo( )
    Contestant.getPlayerInfo();

    //escribe aquí el código para agregar una nota
    if(allContestants !== undefined){
      debugger;
      var display_answers=230;
      fill("blue");
      textSize(20);
      text("NOTA: ¡El concursante que respondió correctamente está resaltado de color verde!",130,230);
    }
    //escribe el código para resaltar al concursante que respondió correctamente
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answers)
      fill("green")
      else
      fill("red");
      display_answers+=30;
      text(allContestants[plr].name +":"+allContestants[plr].answer,250,display_answers);
    }
    
  }

}
