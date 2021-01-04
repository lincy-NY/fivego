import React from 'react';
import "../css/Board.css"

/**
 * @file            : Board.js
 * @description     : 棋盘
 * @author          : lincy
 * @date            : 2020-12-30 16:33:52
 * @version         : 
*/
export default class Board extends React.Component{

    /**
     * @apiNote        : 渲染单个格子
     * @param          : val 值，标识该位子上是白还是黑
     * @param          : x 横坐标
     * @param          : y 纵坐标
     * @return         : 返回数据
     * @author         : lincy
     * @date           : 2020-12-30 16:47:48
     * @version        : 
     */
    renderSquare=(val, x, y)=>{
        return (
            <button key={x+":"+y} className="square" onClick={()=>{
                this.props.onClick(x, y)}}>{val}</button>
        )
    }

    render(){
        return(
            <div className="bord">
                {/* 遍历渲染棋盘 */}
                {this.props.squares.map((item_r, x)=>{
                    //这里渲染一行的数据
                    return (<div key={x} className="bord-row">
                        {/* 再次遍历，渲染具体每个框 */}
                        {item_r.map((item_c, y)=>{
                            return this.renderSquare(item_c, x, y);
                        })}
                    </div>)
                })}
            </div>
        )
    }
}