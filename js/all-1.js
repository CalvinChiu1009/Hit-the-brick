    // 1. Canvas 基礎

// 先將指定ID"#canvas"儲存為一個變數
var canvas = document.getElementById("myCanvas");
// 指定canvas在畫布上的繪製類型，目前唯一可設定的為"2D"，
var ctx = canvas.getContext("2d");

// 畫出一個正方形
// 對於矩形的設定會全部寫在beginPath與closePath之間
ctx.beginPath();
ctx.rect(20, 40, 50, 50); 
    // 使用rect定義一個矩形
        // 距離左邊: 20px 
        // 距離畫面上方40px 
        // 寬、高各50px
ctx.fillStyle = "red";
    // fillStyle用來設定填滿矩形的顏色
ctx.fill();
    // fill則是代表將fillStyle的顏色塗滿整個指定的物件中
ctx.closePath();

// 畫出一個綠色小球
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
    // *** arc的六個參數 ***
        // 圓弧中心的x, y座標 = (240px, 120px)
        // 圓弧的半徑 = 20px
        // 圓弧開始和結束的角度 = 0 (也就是圓形)
        // 繪製的方向： false代表順時鐘，true代表逆時針方向，最後一個參數非必要
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

// 畫出一個空心的長方形
ctx.beginPath();
ctx.rect(160, 10, 100, 20);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    // strokeStyle專門為外輪廓線上色
ctx.stroke();
    // 將外輪廓線填上strokeStyle的顏色
ctx.closePath();

    // 2. 讓球移動

        // 2.1 定義一個繪製用的迴圈

// draw()搭配setInterval(): 球將會在每個影格被重新繪製
// function draw() {
//     // drawing code
//     ctx.beginPath();
//     ctx.arc(50, 50, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
// setInterval(draw, 100);
// setInterval與setTimeout不同的是，setTimeout只會在指定的延遲時間內執行一次函式，而setInterval會以指定的延遲時間內不作為時間間隔，不停的執行
// setInterval('指定的函式', 延遲的時間);

        // 2.2 讓球動起來：

// 由於球並沒有移動，因此宣告變數 x 和 y 讓球從Canvas中央底部出發，然後利用x, y定義球應該被畫在哪裡
var x = canvas.width/2;
var y = canvas.height - 30;
// 接著修改draw()函數，在acr()的方法裡使用變數 x 和 y，
// function draw() {
//     ctx.beginPath();
//     ctx.arc(x, y, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
// setInterval(draw, 100);

// ！！最重要的部分！！
// 在每個影格繪製出來以後，我們想要對 x 和 y 增加一個數值，讓球看起來好像在移動一樣
// 因此我們定義這個移動的數值為 dx 和 dy，並分別設為 2 和 -2
var dx = 2;
var dy = -2;

// 最後，利用 dx 和 dy 來更新 x 和 y 的值，球會在每次迴圈執行時被畫到不同的位置
// 將 dx 和 dy 加入draw()函式中
// function draw() {
//     ctx.beginPath();
//     ctx.arc(x, y, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
//     x += dx;
//     y += dy;
// }
// setInterval(draw, 100);
// 完成這一步以後就可以看到藍色的球照著設定的軌跡移動

        // 2.3 在每個影格開始前清除canvas

// 由於我們沒有在繪製新的球之前將舊的球清除掉，所以看起來就像留下一條痕跡
// 因此我們要使用clearRect()來將舊的canvas清除
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//         // 前兩個參數代表x, y的起始座標
//         // canvas.width  代表canvas本身的寬
//         // canvas.height  代表canvas本身的高
//     ctx.beginPath();
//     ctx.arc(x, y, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
//     x += dx;
//     y += dy;
// }
// setInterval(draw, 100);
// 透過以上清除掉舊canvas後繪製新的canvas，就可以得到球在移動的畫面

        // 2.4 整理程式碼
// 為了維持程式的整潔度，我們將繪製球的程式碼獨立為一個函式
// 再將清除舊canvas及繪製新canvas的部分獨立為另一個程式碼
// function drawBall(): 畫出球
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
// function draw(): 清除舊球並繪製新球
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     x += dx;
//     y += dy;
// }
// setInterval(draw, 10)每固定時間執行一次函式
// setInterval(draw, 10); 

    // 3. 讓球碰到牆壁後反彈

        // 3.1 簡單的碰撞偵測

// 為了偵測碰撞的發生，我們要檢查球是否有接觸（相撞）牆壁，如果有碰到，我們就要改變球的行進方向
// 為了方便計算，我們定義一個變數ballRadius代表球的半徑
var ballRadius = 10;
// 接著更新繪製球的drawBall()函式，將ballRadius帶入其中
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
// setInterval(draw, 10);

        // 3.2 從頂部和底部反彈

// 首先處理頂部的牆，先檢查球是否有接觸到Canvas上方的壁面
// 如果接觸到了，我們就將球的運動方向扭轉，使他從反方向運動，並保持在可見邊界
// 記住，這邊的座標是由左上開始，左上才是(0,0)
// if(y + dy < 0) {
//     dy = -dy;
// }

// 再來，如果球碰到底部的邊緣，則再翻轉改為向上移動
// if(y + dy > canvas.heigth) {
//     dy = -dy;
// }

// 請記住，我們計算從左上角的Y值，所以頂部邊緣開始在0和底部邊緣是在480像素，畫布的高度
// 我們可以將上面兩個if函式寫在一起，避免程式碼看起來過於冗長
if(y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
}

        // 3.3 從左邊和右邊反彈
// 程式碼與上下牆面寫法相似，只是將height改為width
if( x + dx > canvas.width || x + dx < 0) {
    dx = -dx;
}

// 寫完上下左右反彈後，將這兩段程式碼寫入draw()中進行繪製
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     if(y + dy > canvas.height || y + dy < 0) {
//         dy = -dy;
//     }
//     if( x + dx > canvas.width || x + dx < 0) {
//         dx = -dx;
//     }
//     x += dx;
//     y += dy;
// }
// 現在這個階段執行draw()，就可以看到球在四邊牆面不停來回反彈
// 但這時會發現到球在碰撞到牆壁時，會稍微撞進四邊牆面，這是因為我們是使用球的中心點來判斷碰撞時機
// 因此我們應該要改成使用球的圓周碰撞到牆面的時機
// 因為潛進牆面的為圓的半徑程度，這邊只需要在canvas的寬高減去圓半徑即可
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     if(y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
//         dy = -dy;
//     }
//     if( x + dx > canvas.width - ballRadius|| x + dx < ballRadius) {
//         dx = -dx;
//     }
//     x += dx;
//     y += dy;
// }

    // 4. 球拍和鍵盤操控

        // 4.1 定義球拍

// 定義一個球拍，變數如下
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// 利用rect()，繪製一個球拍
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

        // 4.2 控制球拍

// 設定兩個變數，用來判斷是否按下左方向鍵或右方向鍵
// 先設定兩個變數，並使用布林值來判斷true or false
var rightPressed = false;
var leftPressed = false;
// 上面兩個變數預設值false，是因為在預設狀況下是沒有按下鍵盤的
// 接著設定監聽事件:
    // 1. 當按下鍵盤時("keydown")，觸發keyDownHandler
    // 2. 當放開鍵盤時("keyup")，觸發keyUpHandler
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// 接下來，寫入keyDownHandler()以及keyUpHandler()的函式，來觸發按下左右方向鍵的判斷
// keyDownHandler(e)：當方向鍵被按下時，rightPressed 及 leftPressed的布林值變為true
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    };
}
// keyUpHandler(e)：當方向鍵為沒有被按下的狀態時，rightPressed 及 leftPressed的布林值變為false
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    };
}

        // 4.3 球拍的運動邏輯

// 藉由上方4.2寫好的邏輯，我們可以使用if()判斷式來改變球拍在canvas的位移量
// if(rightPressed = true) {
//     paddleX += 7;
// }
// // 當 rightPressed 觸發時，球拍向右移動7px

// if(leftPressed = true) {
//     paddleX -= 7
// }
// 當 leftPressed 觸發時，球拍向左移動7px

// 但因為沒將球拍的移動範圍設線，若是不停的向左或向右移動，球拍就會超出邊界
// 因此要再將球拍的移動範圍設定為canvas寬度減去球拍寬度
// if(rightPressed) {
//     paddleX += 7;
//     if(paddleX + paddleWidth > canvas.width){
//         paddleX = canvas.width - paddleWidth;
//     }
// }
// else if(leftPressed) {
//     paddle -= 7;
//     if(paddleX < 0) {
//         paddleX = 0;
//     }
// }

// 設定好球拍的控制方式、移動邏輯和移動範圍後，將以上函式整合在draw()內，並執行setInteval
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     drawPaddle();
//     if( x + dx > canvas.width - ballRadius|| x + dx < ballRadius) {
//         dx = -dx;
//     };
//     if(y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
//         dy = -dy;
//     };
//     if(rightPressed) {
//         paddleX += 7;
//         if(paddleX + paddleWidth > canvas.width){
//             paddleX = canvas.width - paddleWidth;
//         }
//     }
//     else if(leftPressed) {
//         paddleX -= 7;
//         if(paddleX < 0) {
//             paddleX = 0;
//     };
// };
//     x += dx;
//     y += dy;
// }

drawBall();
// setInterval(draw, 10);


    // 5. 實現遊戲失敗
        // 5.1 實現遊戲失敗
// 以下是第三章的代碼：讓球在碰到上下左右牆面的時候進行反彈的動作
// if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//     dx = -dx;
// }

// if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//     dy = -dy;
// }
// 但我們要的並不是上下左右都可以反彈，而是只有上跟左右，若球碰到底部牆面的話就會造成遊戲結束
// 因此，我們需要對 y 軸，尤其是球碰到
if(y + dy < ballRadius) {
    dy = -dy;
} else if (y + dy > canvas.height - ballRadius) {
    //檢查球的中心是否在球拍的左邊和右邊之間
    if(x > paddleX && x < paddleX - ballRadius) {
        // 若 y 軸位置加上 y軸變量大於整體canvas高度（再減去球的半徑），則跳出alert，並重整畫面
        alert('GAME OVER!');
        document.location.reload();
    }
}

// 加入一個變數，使得遊戲在結束的時候可以先中止setInterval(draw, 10)所進行的循環，並使用clearInterval()來停止這個循環
var interval = setInterval(draw, 10);

// 因此上面的判斷式加入了終止Interval循環，變成以下這樣
if(y + dy < ballRadius) {
    dy = -dy;
} else if (y + dy > canvas.height - ballRadius) {
    //檢查球的中心是否在球拍的左邊和右邊之間
    if(x > paddleX && x < paddleX - ballRadius) {
        // 若 y 軸位置加上 y軸變量大於整體canvas高度（再減去球的半徑），則跳出alert，並重整畫面
        alert('GAME OVER!');
        document.location.reload();
        clearInterval(interval);
    }
}


// 將上方寫好的新規則加入draw()中
// function draw() {
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// drawBall();
// drawPaddle();
// if( x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//     dx = -dx;
// };
// if(y + dy < ballRadius) {
//     dy = -dy;
// } 
// else if(y + dy > canvas.height - ballRadius) {
//     if(x > paddleX && x < paddleX + paddleWidth) {
//         dy = -dy;
//     }
//     else {
//         alert("GAME OVER");
//         document.location.reload();
//         clearInterval(interval);
//     }
// }
//     if(rightPressed && paddleX < canvas.width - paddleWidth) {
//         paddleX += 7;
//     }
//     else if(leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     };
//     x += dx;
//     y += dy;
// };

    // 6. 畫出磚塊

        // 6.1 設置磚塊的變量

// 本課題的總體目標是使用一個二維數組嵌套的循環，給出磚的幾行代碼
// 首先我們需要設置一些變量定義的磚，如寬度和高度信息， 行和列，等。在之前的變量聲明處加入以下幾行代碼
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
// 以上，我們定義了磚塊的行數和列數，磚塊的寬高，磚塊之間保留的距離，如此他們就不會互相接觸
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// 以及磚塊離上邊和左邊的偏移量，使他們不會從canvas的邊緣開始繪製

// 我們將在一個二維數組容納我們所有的磚。它將包含磚列（c），磚行（R），每一個包含一個對象，其中包含x和y位置，讓每個磚顯示在屏幕上
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}
// 上面的代碼將通過行和列的循環和創造新磚

        // 6.2 畫磚的邏輯

// 現在，讓我們創建一個函式來跑陣列中所有磚塊的迴圈，並在canvas中繪製
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(0, 0, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

// 透過上面drawBricks()函式，我們已經將所有磚塊的位置設置成了 x 和 y，並且也給予了磚塊的寬(brickWidth)以及高(brickHeight)
// 但現在所有的磚塊都被繪製在(0,0)的座標，因此要增加一些計算，讓每個磚塊能透過迴圈取得自己的座標位置
var brickX = (c * (brickWidth + brickPadding) + brickOffsetLeft);
var brickY = (r * (brickHeight + brickPadding) + brickOffsetTop);
// 每個brickX的位置是 brickWidth(磚寬) + brickPadding(磚距)，再乘上列數 c 後，加上brickOffsetLeft(與左邊界的距離)
// brickY與brickX同理：brickHeight(磚高) + brickPadding(磚距)，再乘上行數 r 後，加上brickOffsetTop(與上邊界的距離)

// 寫好 brickX 和 brickY，也就是個磚塊的對應座標後，就形成了drawBricks()的最終版本
// 將brickX 和 brickY 加入drawBricks()的函式中
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c * (brickWidth + brickPadding) + brickOffsetLeft);
            var brickY = (r * (brickHeight + brickPadding) + brickOffsetTop);
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

        // 6.3 到了展現真正畫磚的時候了

// 並將drawBricks()整合進draw()中，放在drawPaddle()之下
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     drawPaddle();
//     drawBricks();
//     if( x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     };
//     if(y + dy < ballRadius) {
//         dy = -dy;
//     } 
//     else if(y + dy > canvas.height - ballRadius) {
//         if(x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         }
//         else {
//             alert("GAME OVER");
//             document.location.reload();
//             clearInterval(interval);
//         };
//     };
//     if(rightPressed && paddleX < canvas.width - paddleWidth) {
//         paddleX += 7;
//     }
//     else if(leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     };
//     x += dx;
//     y += dy;
// };
// 執行draw()後就可以看到球在進行移動，並且canvas中出現了三列五行的磚塊
// 但目前球跟磚塊還沒有互動，下一章節會繼續進行撞擊偵測函數


    // 7. 撞擊處理

        // 7.1 撞擊偵測函式

// 創建一個碰撞偵測功能，讓迴圈通過所有的磚塊，並比較每一幀的每個磚塊的位置與球的座標
// 為了更好的理解程式碼，我們先將定義用於撞擊偵測的每個循環中，儲存磚塊對象的 B變量
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = brick[c][r];
            // b 代表磚塊的位置
        }
    }
}

// 如果球的中心在一塊磚塊的坐標內，我們將改變球的方向。對於球的中心在磚塊內，以下四個陳述都必須是正確的：
    // 球的X位置大於磚的X位置
    // 球的X位置小於磚的X位置加上它的寬度
    // 球的Y位置大於磚的Y位置
    // 球的Y位置小於磚塊的Y位置加上它的高度
// 函式：
// function collisionDetection() {
//     for(c=0; c<brickColumnCount; c++) {
//         for(r=0; r<brickRowCount; r++) {
//             var b = brick[c][r];
//             if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
//                 dy = -dy;
//             }
//         }
//     }
// }

        // 7.2 讓磚塊在被撞擊之後消失

// 上面的程式碼會讓球按照我們想要的那樣，在碰到磚塊後改變 y 的運動方向，但目前磚塊依然會留在原地不動，並不會消失
// 因此，我們可以透過添加一個額外的參數，來表示我們是否想在螢幕上顯示所有磚塊
// 在初始化磚塊的程式碼中，我們為每個磚塊添加一個狀態屬性(status)，如下：
var brick = [];
for(c =0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x:0, y:0, status: 1 };
    }
}

// 接下來，我們在繪製drawBricks()時會檢查每一個磚塊的 status 屬性
  // 如果 status 為 1，則繪製出磚塊
  // 如果 status 為 0，則不顯示磚塊
// 將drawBricks()依此邏輯更新，如下：
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
        
        // 7.3 跟蹤並更新在撞擊偵測函式中的狀態

// 現在我們要將磚塊 status 屬性包含在collisionDetection()函式中，如果磚塊是存在的(status為1)，我們會檢查是否有撞擊發生
// 如果發生了撞擊，我們將給磚塊的狀態設為0(status: 0)，如此這個磚塊就不會出現在canvas內
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

        // 7.4 調用撞擊偵測函式

// 最後，將collisionDetection()加入draw()函式中，放在drawPaddle()下
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     drawPaddle();
//     drawBricks();
//     collisionDetection();
//     if( x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     };
//     if(y + dy < ballRadius) {
//         dy = -dy;
//     } 
//     else if(y + dy > canvas.height - ballRadius) {
//         if(x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         }
//         else {
//             alert("GAME OVER");
//             document.location.reload();
//             clearInterval(interval);
//         };
//     };
//     if(rightPressed && paddleX < canvas.width - paddleWidth) {
//         paddleX += 7;
//     }
//     else if(leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     };
//     x += dx;
//     y += dy;
// };


    // 8. 得分和獲勝

        // 8.1 計算分數

// 記錄分數：需要一個變數來記錄分數
var score = 0;

// 並且需要一個函式來創進和更新分數，並且顯示文字在canvas中
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = "#0095DD";
    // fillStyle設置字體顏色
    ctx.fillText("Score: " + score, 8, 20);
    // fillText的參數為(Text(文本), x(座標), y(座標)) 
    // Text: "Score: " + score(顯示分數的文字)
    // 8: x軸座標
    // 20: y軸座標
}

// 若要在每次擊中磚塊時加分，只要在collisionDetection()中的"擊中磚塊改變方向"的if()判斷式中加入score++，意指在擊中磚塊時給 score+1
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }
            }
        }
    }
}
// 並且，在draw()中調用drawScore()，使每一個新幀的分數都保持在最新的狀態
// 將drawScore()加到drawBricks()下面
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     drawPaddle();
//     drawBricks();
//     drawScore();
//     collisionDetection();
//     if( x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     };
//     if(y + dy < ballRadius) {
//         dy = -dy;
//     } 
//     else if(y + dy > canvas.height - ballRadius) {
//         if(x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         }
//         else {
//             alert("GAME OVER");
//             document.location.reload();
//             clearInterval(interval);
//         };
//     };
//     if(rightPressed && paddleX < canvas.width - paddleWidth) {
//         paddleX += 7;
//     }
//     else if(leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     };
//     x += dx;
//     y += dy;
// };

        // 8.2 當所有磚塊被破壞顯示獲勝訊息

// 當破壞所以的磚塊後，應該顯示一個勝利的訊息
// 我們一樣利用collisionDetection()裡的if()判斷式來判斷是否擊中所有的磚塊，若擊中所有磚塊則跳出勝利訊息
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickColumnCount * brickRowCount) {
                        alert('你成功了～！');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

    // 9. 用滑鼠控制球拍

        // 9.1 監聽滑鼠移動

// 監聽滑鼠移動比監聽按鍵更簡單，只需監聽mousemove事件即可
document.addEventListener('mousemove', mouseMoveHandler, false);

        // 9.2 將球拍與滑鼠移動綁定

// 使用滑鼠來移動球拍
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX; - paddleWidth / 2;
    }
}
// offsetLeft: 表示Element左邊距離與offsetParent左邊界距離
// 在這個函數中，我們首先計算relativeX的值，它等於鼠標在視窗中的水平位置( e.clientX)減去canvas元素左邊框到視窗左邊框的距離(canvas.offsetLeft)，這就得到了canvas元素左邊框到鼠標的距離。
// 若這個值大於零，且小於canvas的寬度，說明滑鼠的指標是落在canvas邊界內，這時就把paddleX（等於球拍左邊緣的座標）設為relativeX減速去球拍寬度的一半。這樣就確保位移是相對於球拍中心進行的。

    // 10. 最後，增加一些細節...

        // 10.1 加入生命值計算機制

// 就跟玩很多這種遊戲一樣，即使輸了，我們也可以利用剩餘下來的生命值試著破關
// 先寫入一個變數來計算生命值
var lives = 3;

// 跟score一樣，給生命值設計一個顯示於canvas的文本
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// 當玩家失誤時，遊戲不會立即結束，而是減少生命計數，直到計數歸零
// 在輸掉一條命後，我們也可以將小球和球拍的位置重置，因此將draw()裡面的這三行：
// alert("GAME OVER");
// document.location.reload(); 
clearInterval(interval);
// 替換成以下程式碼：
lives--;
if(!lives) {
    // 若生命值歸零時，才結束遊戲
    // alert("GAME OVER");
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
}
else {
    // 若生命值還沒歸零，則將球拍和小球的位置回歸到先前寫好的開始位置
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width-paddleWidth)/2;
}

// 寫好之後，套入draw()中
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    collisionDetection();
    if( x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    };
    if(y + dy < ballRadius) {
        dy = -dy;
    } 
    else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                // 若生命值歸零時，才結束遊戲
                alert("GAME OVER");
                document.location.reload();
                // clearInterval(interval); // Needed for Chrome to end game
            }
            else {
                // 若生命值還沒歸零，則將球拍和小球的位置回歸到先前寫好的開始位置
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        };
    };
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    };
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
};

draw();

        // 10.2 利用requestAnimationFrame()來優化渲染

// 將
// var interval = setInterval(draw, 10);
// 替換為：
// draw();

// 再把代碼中的每一處
// clearInterval(interval); // Needed for Chrome to end game
// 刪除

// 然後，在draw()函數的最下方（右花括號之前）加入下面這行代碼。它的作用是使draw()函數遞歸調用自身： 
// requestAnimationFrame(draw);

// 現在draw()函數在requestAnimationFrame()的循環中被反複調用，之先前做法最大的不同是，我們將幀率的控制權交給瀏覽器，而不是固定的10毫秒
// 瀏覽器會在適當的時機同步幀率，並且只在必要的時候才刷新渲染的圖形。這使得我們的動畫比之前的setInterval()方法更加流暢且高效.


// setInterval(draw, 10);
