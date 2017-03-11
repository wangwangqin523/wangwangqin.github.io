//俄罗斯方块代码
var BackgroundAudioPlayer = document.getElementById("Background-Music");//背景音乐
var ScoreAudioPlayer = document.getElementById("Score-Music");//得分特效音
var GameOverAudioPlayer = document.getElementById("GameOver-Music");//游戏结束特效音
var c=document.getElementById("Game-Canvas");
var ctx=c.getContext("2d");
var hn=16;//横向格子数
var vn=24;//纵向格子数
var x,y;//运算变量
var comct=7;//所有组件的数量
var state=1;//描述游戏状态
var initx=4;//组件x坐标
var inity=-1;//组件y坐标
var Score=0;
var Level =null;//游戏难度
var vhalt=false;//
var t=0;
//每个格子
/*function gezi(){
this.x=0;
this.y=0;
this=0;
}

//生成网络
var grid=new Array(hn);
for (var i=0;i<hn;i++)
         {
grid[i]=new Array(vn);
for 
       (var j=0;j<vn;j++)
{
grid[i][j]=new gezi();
grid[i][j].x=i;
grid[i][j].y=j;
grid[i][j]=0;
}
}*/
var grid=new Array(hn);
for (var i=0;i<hn;i++)
         {
grid[i]=new Array(vn);
for (var j=0;j<vn;j++) 
   grid[i][j]=0; } 
//组件抽象
function com(){
this.x=initx;
this.y=inity;
this.dem=null;
this.blockA=null;
}
function ClearGrid()//网格状态清0
{
for (var i=0;i<hn;i++){
for (var j=0;j<vn;j++)

    grid[i][j]=0;}
    }

//创建组件数组
function RusB(){
this.ComA=new Array(comct);
for (var i=0;i<comct;i++)
this.ComA[i]=new com();
//初始化7个组件
/*1 1   0:   
  1 1*/   
this.ComA[0].dem=2;
this.ComA[0].blockA=new Array(4);
for (var  i=0;i<4;i++)
this.ComA[0].blockA[i]=1;
/*1 0 0 1:
  1 1 1
  0 0 0 */
this.ComA[1].dem=3;
this.ComA[1].blockA=new Array(9);
this.ComA[1].blockA[0]=1;
this.ComA[1].blockA[1]=0;
this.ComA[1].blockA[2]=0;
this.ComA[1].blockA[3]=1;
this.ComA[1].blockA[4]=1;
this.ComA[1].blockA[5]=1;
this.ComA[1].blockA[6]=0;
this.ComA[1].blockA[7]=0;
this.ComA[1].blockA[8]=0;
/*0 0 1   2:
  1 1 1
  0 0 0*/
this.ComA[2].dem=3;
this.ComA[2].blockA=new Array(9);
this.ComA[2].blockA[0]=0;
this.ComA[2].blockA[1]=0;
this.ComA[2].blockA[2]=1;
this.ComA[2].blockA[3]=1;
this.ComA[2].blockA[4]=1;
this.ComA[2].blockA[5]=1;
this.ComA[2].blockA[6]=0;
this.ComA[2].blockA[7]=0;
this.ComA[2].blockA[8]=0;
/*0 1 0   3:
  1 1 1
  0 0 0*/
this.ComA[3].dem=3;
this.ComA[3].blockA=new Array(9);
this.ComA[3].blockA[0]=0;
this.ComA[3].blockA[1]=1;
this.ComA[3].blockA[2]=0;
this.ComA[3].blockA[3]=1;
this.ComA[3].blockA[4]=1;
this.ComA[3].blockA[5]=1;
this.ComA[3].blockA[6]=0;
this.ComA[3].blockA[7]=0;
this.ComA[3].blockA[8]=0;
/*1 1 0   4:
  0 1 1
  0 0 0*/
this.ComA[4].dem=3;
this.ComA[4].blockA=new Array(9);
this.ComA[4].blockA[0]=1;
this.ComA[4].blockA[1]=1;
this.ComA[4].blockA[2]=0;
this.ComA[4].blockA[3]=0;
this.ComA[4].blockA[4]=1;
this.ComA[4].blockA[5]=1;
this.ComA[4].blockA[6]=0;
this.ComA[4].blockA[7]=0;
this.ComA[4].blockA[8]=0;
/*0 1 1   5:
  1 1 0
  0 0 0*/
this.ComA[5].dem=3;
this.ComA[5].blockA=new Array(9);
this.ComA[5].blockA[0]=0;
this.ComA[5].blockA[1]=1;
this.ComA[5].blockA[2]=1;
this.ComA[5].blockA[3]=1;
this.ComA[5].blockA[4]=1;
this.ComA[5].blockA[5]=0;
this.ComA[5].blockA[6]=0;
this.ComA[5].blockA[7]=0;
this.ComA[5].blockA[8]=0;
/*0 0 0 0   6:
  1 1 1 1
  0 0 0 0
  0 0 0 0*/
this.ComA[6].dem=4;
this.ComA[6].blockA=new Array(16);
for (var i=0;i<4;i++)
{this.ComA[6].blockA[i]=0;}
for (var i=8;i<16;i++)
{this.ComA[6].blockA[i]=0;}
this.ComA[6].blockA[4]=1;
this.ComA[6].blockA[5]=1;
this.ComA[6].blockA[6]=1;
this.ComA[6].blockA[7]=1;
this.NextCom=new com();
this.CurrentCom=new com();
//创建新组件函数
this.NewNextCom=function(){
NextID=Math.round(Math.random()*6);
var vdem=this.ComA[NextID].dem;
this.NextCom.dem=vdem;
this.NextCom.blockA=new Array(vdem*vdem);
for (var i=0;i<vdem*vdem;i++)
   this.NextCom.blockA[i]=this.ComA[NextID].blockA[i];
//document.write(this.NextCom.blockA[1]);
   }

//这里写的是从当前指向下一个组件
this.NextToCurrent=function(){
this.CurrentCom.dem=this.NextCom.dem;
var vdem=this.CurrentCom.dem;
this.CurrentCom.x=initx;
this.CurrentCom.y=inity;
this.CurrentCom.blockA=new Array(vdem*vdem);
for (var i=0;i<vdem*vdem;i++)
this.CurrentCom.blockA[i]=this.NextCom.blockA[i];
}


this.CanDown=function(n)//判断能否下落
{
var vdem=RusB.CurrentCom.dem;
for(var i=0;i<vdem*vdem;i++)//完成坐标转换
{
if(RusB.CurrentCom.blockA[i]==1)
{
x=i%vdem+RusB.CurrentCom.x;
y=Math.floor(i/vdem)+RusB.CurrentCom.y;
y=y+n;
if (x>=0)
{if (y>=vn||grid[x][y]==1)
{return false;}
}
}
}
return true;
}
this.right=function()//右移
{
var bRight=true;
var vdem=RusB.CurrentCom.dem;
for(var i=0;i<vdem*vdem;i++)//完成坐标转换
{
if(RusB.CurrentCom.blockA[i]==1)
{
x=i%vdem+RusB.CurrentCom.x;
y=Math.floor(i/vdem)+RusB.CurrentCom.y;
x++;
if (x>=hn||grid[x][y]==1)
{bRight=false;}
}
}
if (bRight)
this.CurrentCom.x++;
}
this.left=function()//左移
{
var bLeft=true;
var vdem=RusB.CurrentCom.dem;
for(var i=0;i<vdem*vdem;i++)//完成坐标转换
{
if(RusB.CurrentCom.blockA[i]==1)
{
x=i%vdem+RusB.CurrentCom.x;
y=Math.floor(i/vdem)+RusB.CurrentCom.y;
x--;
if (x<0||grid[x][y]==1)
{bLeft=false;}
}
}
if (bLeft)
this.CurrentCom.x--;
}


//加速下落
this.accelerate=function(){
if (RusB.CanDown(3))
this.CurrentCom.y=this.CurrentCom.y+3;
}

this.RotCom=new com();
//旋转
this.rotate=function(){
var vdem=this.CurrentCom.dem;
this.RotCom.dem=vdem;
var rot=true;
this.RotCom.blockA=new Array(vdem*vdem);
for (var i=0;i<vdem*vdem;i++)
{this.RotCom.blockA[i]=this.CurrentCom.blockA[i];}
for(var i=0;i<vdem*vdem;i++)//完成坐标转换
{
x=i%vdem;
y=Math.floor(i/vdem);
var xr=vdem-y-1+RusB.CurrentCom.x;
var yr=x+RusB.CurrentCom.y;
var j=x*vdem+vdem-y-1;
if (this.CurrentCom.blockA[i]==1)
{if(xr<0||xr>=hn||yr>=vn||yr<0||grid[xr][yr]==1)
{rot=false;}}
this.RotCom.blockA[j]=this.CurrentCom.blockA[i];}

if (rot)
{for (var i=0;i<vdem*vdem;i++)
this.CurrentCom.blockA[i]=this.RotCom.blockA[i];}
}

this.halt=function()//暂停
{
if (vhalt==false)
  {vhalt=true;}
  else{vhalt=false;}
  if(t) {clearTimeout(t);
t=0;}
else
{timer();
  }
  }
//消去行
this.disappear=function(){
var nLine = 0;
for (var i = vn-1;i>= 0;i--) {
var bLine = true;
 for (var j = 0; j<hn; j++) {
if (grid[j][i]==0)
 bLine = false;
            }
if (bLine) {//行可以消去
nLine++;
for (var j=i; j >0;j--) {
for (var k=0; k<hn; k++) {
grid[k][j]=grid[k][j-1];
}
}
for (var j=0; j<hn; j++) {
grid[j][0] = 0;}
i++;
ctx.clearRect(0,0,hn*50,vn*50);
}
}
       if (nLine) {
            
            Score += nLine * 21;
            document.getElementById("Game-Score").innerText=Score;
        }

       
    }

}

function draw(){
ctx.clearRect(0,0,1600,1200);
//画下落的部分
ctx.fillStyle="red";
var vdem=RusB.CurrentCom.dem;
for(var i=0;i<vdem*vdem;i++)//完成坐标转换
{
x=i%vdem+RusB.CurrentCom.x;
y=Math.floor(i/vdem)+RusB.CurrentCom.y;
if(RusB.CurrentCom.blockA[i]==1&&y>=0)
{ctx.fillRect(x*50,y*50,50,50);
}
}
//画分界线
ctx.lineWidth=5;
ctx.strokeStyle="red";
ctx.moveTo(hn*50+3,0);
ctx.lineTo(hn*50+3,vn*50);
ctx.stroke();                         
 //画出不变的部分
 ctx.fillStyle="blue";
for(var i=0;i<hn;i++)
    {for(var j=0;j<vn;j++)
{
if (grid[i][j]==1)
ctx.fillRect(i*50,j*50,50,50);
}
}
//画出下一个组件的图形
ctx.fillStyle="red";
var vdem=RusB.NextCom.dem;
for(var i=0;i<vdem*vdem;i++)
{
x=i%vdem+RusB.NextCom.x+hn+2;
y=Math.floor(i/vdem)+RusB.NextCom.y+5;
if(RusB.NextCom.blockA[i]==1)
{ctx.fillRect(x*50,y*50,50,50);
}
}
}

var RusB=new RusB();
//主函数启动计时器
function timer(){
if (!vhalt){
if(RusB.CanDown(1))
{
RusB.CurrentCom.y++;

}
else
{
//网格置1函数
var vdem=RusB.CurrentCom.dem;
for(var i=0;i<vdem*vdem;i++)//完成坐标转换
{

x=i%RusB.CurrentCom.dem+RusB.CurrentCom.x;
y=Math.floor(i/RusB.CurrentCom.dem)+RusB.CurrentCom.y;
RusB.disappear();
if(y<0)
{GameOver();}
else if (RusB.CurrentCom.blockA[i]==1)
{grid[x][y]=1;}
}
RusB.NextToCurrent();
RusB.NewNextCom();
}
//documentx. write('<br>'+b1.x);
draw();
if (state==1)
t=setTimeout("timer()",Level); 
}
}

//游戏开始
function GameStart(){
Level = document.getElementById("Complication").value;//获取游戏难度
if (Level<100)
{alert("请选择游戏模式！");}
else
{
state=1;
Score=0;
document.getElementById("Game-Score").innerText=Score;
ClearGrid();
RusB.NewNextCom();
RusB.NextToCurrent();
RusB.NewNextCom();
BackgroundAudioPlayer.load();
GameOverAudioPlayer.pause();
BackgroundAudioPlayer.play();
if(t) {clearTimeout(t);
t=0;}
else
{timer();}
}
}
function GameOver(){

BackgroundAudioPlayer.pause();
GameOverAudioPlayer.play();
state=0;

    }
function Action(event) {
    switch (event.keyCode) {
        case 83://left
           RusB.left();
            break;
        case 69://up->rotate 顺时针旋转
            RusB.rotate();
            break;
        case 70://right
            RusB.right();
                break;
        case 67:
            RusB.accelerate();
            break;
        case 68:
             RusB.halt();
             break;
    }
  
}