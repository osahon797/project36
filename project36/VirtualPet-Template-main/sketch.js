var dog,sadDog,happyDog;
var feed,addFood
var foodobj
var fedTime,lastFed

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

foodobj= new Food(200,200,100,100)

feed=createButton("Feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood=createButton("add Food")
addFood.position(800,95)
addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);
 
 fedTime=database.ref("FeedTime");
 fedTime.on("value",function(data){
   lastFed=data.val()
 })
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("Last Feed :"+ lastFed%12+"PM",350,30)
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30)
}else{
  text("Last Feed :"+ lastFed +"AM",350,30)
}


foodobj.display()
  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){
dog.addImage(happyDog)

if(foodobj.getFoodStock()<=0){
  foodobj.updateFoodStock(foodobj.getFoodStock()*0)
}else{
  foodobj.updateFoodStock(foodobj.getFoodStock()-1)
  database.ref("/").update({
    Food:foodobj.getFoodStock(),
    fedTime:hour()
  })
}
}

//function to add food in stock
function addFoods(){
foodS++
database.ref("/").update({
  Food:foodS
})
}


