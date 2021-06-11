var dog, sadDog, happyDog;
var feed, addFood;
var foodObj, foodStock;
var database;
var feedTime, lastFed;


function preload() {
  sadDog = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();
  foodObj = new Food();
  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  if (keyDown(LEFT_ARROW)) {
    writePosition(-1, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    writePosition(1, 0);
  }
  else if (keyDown(UP_ARROW)) {
    writePosition(0, -1);
  }
  else if (keyDown(DOWN_ARROW)) {
    writePosition(0, +1);
  }
  drawSprites();


  function writePosition(x, y) {
    database.ref("ball/position").set({
      'x': position.x + x,
      'y': position.y + y
    });
  }

  fill(255, 255, 254)
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed :" + lastFed % 12 + "PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }

  foodObj.display();
  drawSprites();
}

//function to read food Stock
function addFood() {
  dog.addImage(happyDog);
  if (foodObj.getFoodStock() <= 0) {
    foodObj.updateFoodStock(foodObj.getFoodStock() * 0);
  }
  else {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  }
}

//function to update food stock and last fed time
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}

