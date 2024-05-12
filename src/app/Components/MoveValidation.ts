const number_of_columns = 8;




export const FindTargetSquares = ( 
    targetSquare:Number[],
    setTargetSquare:React.Dispatch<React.SetStateAction<Number[]>>,
    pieceType:string,isBlack:Boolean,
    index:number,
    blackPosition:any,
    whitePosition:any) =>{
        setTargetSquare([]);
        if(!pieceType) return null;

        let temp:Number[] = targetSquare;
        temp = [];
        let Qtemp1:Number[] = [];
        let Qtemp2:Number[] = [];
        const  X1= Math.floor(index / number_of_columns);
        const Y1 = index % number_of_columns;
        
        let Blockwhite:number[]= [];
        let Blockblack:number[]= [];

    for(let i=0;i<64;i++){
           
         const  X2:number= Math.floor(i/ number_of_columns);
        const Y2:number = i % number_of_columns;
            
            switch(pieceType){
                case 'r' :
                    if(X1 === X2 || Y1 === Y2)
                        {
                        whitePosition[i]  &&  Blockwhite.push(i);
                        blackPosition[i] &&  Blockblack.push(i);

                        // temp = TargetSetter(X2,Y2,temp);
                        Qtemp1 = TargetSetter(X2,Y2,Qtemp1);
                        }
                        break;
                case 'b':
                    if(Math.abs(X1 - X2) === Math.abs(Y1 - Y2) && X1 !==X2){
                        whitePosition[i]  &&  Blockwhite.push(i);
                        blackPosition[i] &&  Blockblack.push(i);

                        Qtemp2 = TargetSetter(X2,Y2,Qtemp2);
                        // temp = TargetSetter(X2,Y2,temp); console.log(X2,Y2);
                        }
                    break;
                case 'q':
                    if(X1 === X2 || Y1 === Y2)
                        {
                        whitePosition[i]  &&  Blockwhite.push(i);
                        blackPosition[i] &&  Blockblack.push(i);

                        // temp = TargetSetter(X2,Y2,temp);
                        Qtemp1 = TargetSetter(X2,Y2,Qtemp1);
                    }
                    else if(Math.abs(X1 - X2) === Math.abs(Y1 - Y2) && X1 !==X2){
                        whitePosition[i]  &&  Blockwhite.push(i);
                        blackPosition[i] &&  Blockblack.push(i);

                        Qtemp2 = TargetSetter(X2,Y2,Qtemp2);
                        // temp = TargetSetter(X2,Y2,temp); console.log(X2,Y2);
                    }
                        break;
                case 'k':
                    if(Math.abs(X1 - X2) <= 1 && Math.abs(Y1 - Y2) <= 1){
                        if(whitePosition[i] && !isBlack){
                            break;
                        }   
                        else if(blackPosition[i] && isBlack){
                            break;
                        } 
                           temp = TargetSetter(X2,Y2,temp); 
                        }
                    break;
                case 'n':
                    if(Math.abs(X1 - X2) === 2 && Math.abs(Y1 - Y2) === 1 || Math.abs(X1 - X2) === 1 && Math.abs(Y1 - Y2) === 2){
                        if(whitePosition[i] && !isBlack){
                            break;
                        }   
                        else if(blackPosition[i] && isBlack){
                            break;
                        }   
                        temp = TargetSetter(X2,Y2,temp);
                    }
                break;
             }
           

            if(isBlack && pieceType === 'p'){
                    
                    if(X1 === 1 && X2 - X1 <=2 && Y2 === Y1 && X2>X1){
                        temp = TargetSetter(X2,Y2,temp);
                    }
                    else if(X2 - X1 ===1 && Y2 === Y1){
                        temp = TargetSetter(X2,Y2,temp);
                    }
                }
                else if(pieceType === 'p'){
                    if(X1 === 6 && X2 - X1 >=-2 && Y2 === Y1 && X2<X1){
                        temp = TargetSetter(X2,Y2,temp);
                    }
                    else if(X2 - X1 ===-1 && Y2 === Y1){
                        temp = TargetSetter(X2,Y2,temp);
                    }
                }
        // console.log('Block',Block);
        }

        pieceType === 'r' && (temp = RookEval(X1,Y1,Blockwhite,Blockblack,Qtemp1,isBlack))
        pieceType === 'b' && (temp = BishopEval(X1,Y1,Blockwhite,Blockblack,Qtemp2,isBlack));
         // for queen piece to separate rook and bishop moves then cancatenate them
        if(pieceType === 'q'){
            Qtemp1 = RookEval(X1,Y1,Blockwhite,Blockblack,Qtemp1,isBlack);
            Qtemp2 = BishopEval(X1,Y1,Blockwhite,Blockblack,Qtemp2,isBlack);
            temp = [...Qtemp1,...Qtemp2];
        }
        if(pieceType === 'p'){
           temp = PawnEval(X1,Y1,whitePosition,blackPosition,temp,isBlack)
        }

        // temp.push(index);
        setTargetSquare(temp);

    
}

const TargetSetter = (x:number,y:number,temp:Number[]):Number[]=>{
    const index = x* 8 + y;
    temp.push(index);
    return temp
}

const RookEval = (X1:number,Y1:number,Blockwhite:number[],Blockblack:number[],temp:any,isBlack:Boolean)=>{
    
    const set = new Set(temp);
    let subArr:any = [];
    let newArr:any = [];
    set.forEach( a =>{
        subArr.push(a);
    })
    
    let Eval = EvalFunction(X1,Y1,subArr);
    // console.log('Eval',Eval);
    let top:number[][] =[];
    let bottom:number[][] =[];
    let left:number[][]=[];
    let right:number[][] =[];

    Eval.forEach( (a,idx) =>{
        if(a[1]=== -8){
            top = Eval.splice(0,idx+1).reverse();
        }
    });
    Eval.forEach( (a,idx) =>{
        if(a[1]=== -1){
            right = Eval.splice(0,idx+1).reverse();
        }
    });
    Eval.reverse();
    Eval.forEach( (a,idx) =>{
        if(a[1]=== 8){
            bottom = Eval.splice(0,idx+1).reverse();
        }
    });
    Eval.forEach( (a,idx) =>{
        if(a[1]=== 1){
            left = Eval.splice(0,idx+1).reverse();
        }
    });
    

    newArr = IncludesPiece(top,Blockwhite,Blockblack,isBlack,newArr);
    newArr = IncludesPiece(right,Blockwhite,Blockblack,isBlack,newArr);
    newArr = IncludesPiece(left,Blockwhite,Blockblack,isBlack,newArr);
    newArr = IncludesPiece(bottom,Blockwhite,Blockblack,isBlack,newArr);

    // console.log('newArr',newArr);

    return newArr;
}

const BishopEval = (X1:number,Y1:number,Blockwhite:number[],Blockblack:number[],temp:any,isBlack:Boolean)=>{
    
    const set = new Set(temp);
    let subArr:any = [];
    let newArr:any = [];
    set.forEach( a =>{
        subArr.push(a);
    })
    let RightSide = true;
    let BottomSide = true;
    let TopSide = true;
    let count = 0;
    let Eval = EvalFunction(X1,Y1,subArr); // Creates an array containing values, higher values means blocks closer to piece and vice versa

    Eval.forEach(a =>{
        if(a[1] === -7){
            count++;
        }
        if(a[1] === 7){
            count++;
        }
        if(a[1]>0){
            BottomSide = false;
        }
        if(a[1]<0){
            TopSide = false;
        }
        // console.log(a);
    });
    if(count === 2) RightSide = false;
    // console.log('RightSide',RightSide);
    // console.log('Eval',Eval);
    let topLeft:number[][] =[];
    let topRight:number[][] =[];
    let bottomLeft:number[][] =[];
    let bottomRight:number[][] =[];
    // cut the array in half
if(!RightSide){
    Eval.forEach( (a,idx) =>{
        if( a[1]=== -7){
           subArr = Eval.splice(0,idx+1).reverse();
        }
    });
    // start from the top left
    const [x,y] = RankToMatrix(subArr[0][0]);
    if(subArr.length > 0){
        subArr.forEach( (a:any,idx:any) =>{   
        const [x2,y2] = RankToMatrix(a[0]);    
        if( (Math.abs(x - x2) === Math.abs(y - y2))){
            topLeft.push(a);       
        }
        // console.log(a);
    });
    // Sorting the rest into top right 
    subArr.forEach( (a:any,idx:any) =>{
        if(!topLeft[topLeft.indexOf(a)]){
            topRight.push(a);
        }
    })
    }
    if(Eval.length > 1){
            const [x1,y1] = RankToMatrix(Eval[0][0]);
            Eval.forEach( (a,idx) =>{   
                const [x2,y2] = RankToMatrix(a[0]);    
                if( idx!==0 && (Math.abs(x1 - x2) === Math.abs(y1 - y2))){
                    bottomLeft.push(a);       
                }
            });
            // Sorting the rest into buttomRight 
            Eval.forEach( (a,idx) =>{
                if(!bottomLeft[bottomLeft.indexOf(a)] && a[1]!==0){
                    bottomRight.push(a);
                }
            })
    }
}
else {
    // if(Eval[0][1] ===0){
    //     Eval.shift();
    // }
    const [x,y] = RankToMatrix(Eval[0][0]);
    Eval.forEach( (a:any,idx:any) =>{   
        const [x2,y2] = RankToMatrix(a[0]);    
        if( (Math.abs(x - x2) === Math.abs(y - y2))){
            topLeft.push(a);       
        }    
    })
    topLeft.reverse();
    Eval.forEach( (a:any,idx:any) =>{
        if(!topLeft[topLeft.indexOf(a)]){
            topRight.push(a);
        }
    })
    if(BottomSide) topRight.reverse();
}
let includes = false;
bottomLeft.map( a=>{
    if(a[1]===9) includes = true;
});
if(TopSide) topLeft.reverse();
let num = bottomRight.shift();
if (num !== undefined && !includes) {
  bottomLeft.unshift(num);
}

    // console.log('topleft',topLeft);
    // console.log('topRight',topRight);
    // console.log('bottomLeft',bottomLeft);
    // console.log('bottomRight',bottomRight);
    // console.log('Eval',topLeft);
    // console.log('Eval',Eval);
    // console.log('b Blockwhite blockblack',Blockwhite,Blockblack)
    newArr = IncludesPiece(topRight,Blockwhite,Blockblack,isBlack,newArr);
    newArr = IncludesPiece(topLeft,Blockwhite,Blockblack,isBlack,newArr);
    newArr = IncludesPiece(bottomLeft,Blockwhite,Blockblack,isBlack,newArr);
    newArr = IncludesPiece(bottomRight,Blockwhite,Blockblack,isBlack,newArr);

    console.log('newArr',newArr);

    return newArr;
}

const PawnEval = (X1:number,Y1:number,Blockwhite:number[],Blockblack:number[],temp:any,isBlack:Boolean)=>{
    

    let subArr:any = [];
    let newArr:any = [];
    subArr = temp;
    
    let Eval = EvalFunction(X1,Y1,subArr); // Creates an array containing values, higher values means blocks closer to piece and vice versa
    if(Eval[0][1]<0) Eval.reverse();
    // console.log('Eval',Eval,Blockblack,Blockwhite);
    for (const a of Eval) {
        if (Blockwhite[a[0]]) {
            break;
        }
        else if(Blockblack[a[0]]){
            break;
        }
        newArr.push(a[0]);
    }
    // check for first diagonal positions to take enemy piece
    let rank = MatrixToRank(X1,Y1);
    if(!isBlack){
        if(Blockblack[rank-9]) newArr.push(rank-9);
        if(Blockblack[rank-7]) newArr.push(rank-7);
    }
    if(isBlack){
        if(Blockwhite[rank+9]) newArr.push(rank+9);
        if(Blockwhite[rank+7]) newArr.push(rank+7);  
    }

    console.log('newArr',newArr);

    return newArr;
}

const IncludesPiece = (positionArr: number[][],Blockwhite: number[],Blockblack: number[],isBlack:Boolean,resArr:any) =>{
    for (const a of positionArr) {
        if (Blockwhite.includes(a[0])) {
            if(isBlack){
                resArr.push(a[0]);
                break;
            }
            else {
                break;
            }
        }
        else if(Blockblack.includes(a[0])){
            if(!isBlack){
                resArr.push(a[0]);
                break;
            }
            else {
                break;
            }
        }
        resArr.push(a[0]);
    }
    return resArr;
}

const EvalFunction = (X1:number,Y1:number,newArr:any)=>{

    let Eval:number[][] =[];
    // let Eval:{[id:number]:number} ={};
    newArr.map( (a:any,index:any) => {
        const [x,y] = RankToMatrix(a);
        const z = MatrixToRank((x-X1),(y-Y1));
        Eval.push([a,z]);
    });
    return Eval;
}


const RankToMatrix = (rank:number):number[] =>{
    const  X1= Math.floor(rank / number_of_columns);
    const Y1 = rank % number_of_columns;
    return [X1, Y1];
}

const MatrixToRank = (X1:number,Y1:number):number =>{
    return X1 * number_of_columns + Y1;
}