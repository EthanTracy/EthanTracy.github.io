var food

var head
var body
var last_body

var input
var score

var game_over = false
var game_over_counter

var cnv

function setup() {
    cnv = createCanvas(500, 600)
    center_canvas()
    frameRate(4)
    
    food = [5, 3]
    head = [4, 5]
    body = [[3, 5], [2, 5]]
    last_body = []
    input = 'r'
    game_over_counter = 0
    score = 0

    console.log("Score: " + score)
}

function draw() {

    update_position()

    clear()
    if (!game_over) {
        for (var i = 1; i < 10; i++) {
            line(i * 50, 0, i * 50, 500)
            line(0, i * 50, 500, i * 50)
        }
        line(0, 0, 500, 0)
        line(0, 0, 0, 500)
        line(0, 500, 500, 500)
        line(500, 0, 500, 500)

        fill(0)
        textSize(22)
        textAlign(CENTER, TOP)
        text("Score: " + score, 250, 535)
        
        draw_food()
        draw_head(input)
        draw_body()
    } else {
        textSize(32)
        fill(255, 0, 0)
        text("Game Over!", 250, 250)
        game_over_counter += 1
        if (game_over_counter > 12) {
            game_over = false;
            setup()
        }
    }
}

function keyPressed() {
    if (keyCode == 87) {
        input = 'u'
    } else if (keyCode == 68) {
        input = 'r'
    } else if (keyCode == 83) {
        input = 'd'
    } else if (keyCode == 65) {
        input = 'l'
    }
}

function windowResized() {
    center_canvas()
}

function center_canvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function update_position() {
    update_body()
    last_body[0] = body[body.length - 1][0]
    last_body[1] = body[body.length - 1][1]
    switch(input) {
        case 'r':
            if (head[0] + 1 < 11) {
                head[0] += 1
            } else {
                head[0] = 1
            }
            break;
        case 'l':
            if (head[0] - 1 > 0) {
                head[0] -= 1
            } else {
                head[0] = 10
            }
            break;
        case 'u':
            if (head[1] - 1 > 0) {
                head[1] -= 1
            } else {
                head[1] = 10
            }
            break;
        case 'd':
            if (head[1] + 1 < 11) {
                head[1] += 1
            } else {
                head[1] = 1
            }
            break;
        default:
            break;
    }
    check_collisions()
}

function update_body() {
    var new_body = [[head[0], head[1]]];
    for (var i = 0; i < body.length - 1; i++) {
        new_body.push([body[i][0], body[i][1]])
    }
    body = new_body
}

function check_collisions() {
    if (head[0] == food[0] && head[1] == food[1]) {
        score += 1
        console.log("Score: " + score)
        generate_food()
        generate_body()
    }
    for (var i = 0; i < body.length; i++) {
        if (body[i][0] == head[0] && body[i][1] == head[1]) {
            game_over = true
            score = 0
            return
        }
    }
}

function generate_body() {
    body.push([last_body[0], last_body[1]])
}

function generate_food() {
    var found = false
    while (!found) {
        var n_found = true
        food_x = floor(random(1, 11))
        food_y = floor(random(1, 11))
        if (food_x == head[0] && food_y == head[1]) {
            n_found = false
        }
        for (var i = 0; i < body.length; i++) {
            if (body[i][0] == food_x && body[i][1] == food_y) {
                n_found = false
            }
        }
        found = n_found
    }
    food[0] = food_x
    food[1] = food_y
}

function draw_food() {
    fill(0, 220, 0)
    ellipse(food[0] * 50 - 25, food[1] * 50 - 25, 25, 25)
}

function draw_head(direction) {
    head_c = [head[0] * 50 - 50, head[1] * 50 - 50]
    fill(255, 255, 0)
    rect(head_c[0], head_c[1], 50, 50)
    fill(0)
    switch(direction) {
        case 'r':
            rect(head_c[0] + 37, head_c[1] + 10, 5, 10)
            rect(head_c[0] + 37, head_c[1] + 30, 5, 10)
            break;
        case 'l':
            rect(head_c[0] + 8, head_c[1] + 10, 5, 10)
            rect(head_c[0] + 8, head_c[1] + 30, 5, 10)
            break;
        case 'u':
            rect(head_c[0] + 10, head_c[1] + 8, 10, 5)
            rect(head_c[0] + 30, head_c[1] + 8, 10, 5)
            break;
        case 'd':
            rect(head_c[0] + 10, head_c[1] + 37, 10, 5)
            rect(head_c[0] + 30, head_c[1] + 37, 10, 5)
            break;
        default:
            break;
    }
}

function draw_body() {
    fill(255, 255, 0)
    for (var i = 0; i < body.length; i++) {
        rect(body[i][0] * 50 - 50, body[i][1] * 50 - 50, 50, 50)
    }
}