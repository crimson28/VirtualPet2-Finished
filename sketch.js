//Create variables here
var dogIMG;

var happyDog,database,foodS,foodStock;
var dog;
var feed;
var lastFed;

function preload(){

  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");


}

function setup() {
	createCanvas(1000, 400);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(dogIMG);
  dog.scale = .3;

  feed = createButton("Feed The Dog!");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the food here");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();


 


  
  
}


function draw() {  

  background(46, 130, 87);

 foodObj.display();

 
 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed = data.val();




 });

 fill(255,255,254);
 textSize(15);

 if (lastFed >= 12){
   text("last feed : "+ lastFed%12 +"PM", 350,30);

 } else if(lastFed == 0){
   text("Last Fed : "+ lastFed + "AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + "AM", 350,30);
 }


  drawSprites();

 

}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var fs = foodObj.getFoodStock();

  if(fs <= 0){
    foodObj.updateFoodStock(fs * 0);
  }else{
    foodObj.updateFoodStock(fs - 1);
  }
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()


  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  });
}
