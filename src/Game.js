import React from 'react';
import Board from "./component/Board"
import "./Game.css"

/**
 * @file            : Game.js
 * @description     : 游戏主体
 * @author          : lincy
 * @date            : 2020-12-30 16:29:48
 * @version         : 
*/
export default class Game extends React.Component{
    
    constructor(props){
        super(props);
        let arr = new Array();
        for(var k=0;k<10;k++){
            arr[k] = Array(10).fill(null);
        }
        this.state={
            history:[{squares:arr}],
            stepNumber:0,
            xIsNext:true,
            winner:null
        }
    }

    /**
     * @apiNote        : 检查是否胜利
     * @param          : x 横坐标
     * @param          : y 纵坐标
     * @return         : 返回数据
     * @author         : lincy
     * @date           : 2020-12-30 20:26:55
     * @version        : 
     */
    check = (x, y) =>{
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        let tempx = x;
        let tempy = y;

        let temp = this.state.xIsNext ? 'X' : 'O';
        let count = 1;
        //判断
        while(true){
            if(tempy>0 && current.squares[tempx][--tempy] === temp){
                count++;
            }
            else{
                break;
            }
        }
        tempy = y;  //复原位置
        while(true){
            if(tempy>10 && current.squares[tempx][++tempy] === temp){
                count++;
            }
            else{
                break;
            }
        }
        if(count >= 5){
            return true;
        }
        
        //纵向判断
        tempx = x;  //复原位置
        tempy = y;  
        count = 1;
        while(true){
            if(tempy>0 && current.squares[++tempx][tempy] === temp){
                count++;
            }
            else{
                break;
            }
        }
        tempx = x;  //复原位置
        while(true){
            if(tempy>10 && current.squares[--tempx][tempy] === temp){
                count++;
            }
            else{
                break;
            }
        }
        if(count >= 5){
            return true;
        }

        //左上右下
        tempx = x;  //复原位置
        tempy = y;  
        count = 1;
        while(true){
            if(tempy>0 && current.squares[--tempx][--tempy] === temp){
                count++;
            }
            else{
                break;
            }
        }
        tempx = x;  //复原位置
        tempy = y;  
        while(true){
            if(tempy>10 && current.squares[++tempx][++tempy] === temp){
                count++;
            }
            else{
                break;
            }
        }
        if(count >= 5){
            return true;
        }

        //左下右上
        tempx = x;  //复原位置
        tempy = y;  
        count = 1;
        while(true){
            if(tempy>0 && current.squares[++tempx][--tempy] === temp){
                count++;
            }
            else{
                break;
            }
        }
        tempx = x;  //复原位置
        tempy = y;  
        while(true){
            if(tempy>10 && current.squares[--tempx][++tempy] === temp){
                count++;
            }
            else{
                break;
            }
        }
        if(count >= 5){
            return true;
        }

        return false;
    }

    /**
     * @apiNote        : 点击事件
     * @param          : x 横坐标
     * @param          : y 纵坐标
     * @author         : lincy
     * @date           : 2020-12-30 18:19:03
     * @version        : 
     */
    handleClick = (x, y) =>{
        if(this.state.winner){
            return ;
        }
        let flag = this.check(x,y);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        squares[x][y] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            winner : flag,
        });
    }

    render(){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

        return(
            <div className='game'>
                <Board squares={current.squares} onClick={(x,y)=>this.handleClick(x,y)}></Board>
            </div>
        )
    }
}